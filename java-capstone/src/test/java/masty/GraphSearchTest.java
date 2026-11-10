package masty;

import java.util.*;

/** Dependency-free regression tests; run with java -cp out masty.GraphSearchTest. */
public final class GraphSearchTest {
    private static int checks;
    private static void eq(Object actual, Object expected) {
        checks++;
        if (!Objects.equals(actual, expected))
            throw new AssertionError("Expected " + expected + " but got " + actual);
    }
    private static void rejects(Runnable action) {
        checks++;
        try { action.run(); }
        catch (IllegalArgumentException expected) { return; }
        throw new AssertionError("Expected IllegalArgumentException");
    }
    public static void main(String[] args) {
        GraphSearch g = new GraphSearch();
        g.addEdge("A", "B", 4); g.addEdge("A", "C", 2);
        g.addEdge("C", "B", 1); g.addEdge("B", "D", 5);
        g.addEdge("C", "D", 8); g.addEdge("D", "E", 2);
        g.addEdge("B", "E", 10);
        eq(g.bfs("A", "E"), List.of("A", "B", "E"));
        eq(g.dfs("A", "E"), List.of("A", "B", "E"));
        eq(g.dijkstra("A", "E"), new GraphSearch.Result(10L, List.of("A", "C", "B", "D", "E")));
        Map<String, Long> h = Map.of("A", 7L, "B", 5L, "C", 6L, "D", 2L, "E", 0L);
        eq(g.aStar("A", "E", n -> h.get(n)), g.dijkstra("A", "E"));
        eq(g.aStar("A", "E", n -> 0), g.dijkstra("A", "E"));
        g.addNode("Z");
        eq(g.bfs("A", "Z"), List.of());
        eq(g.dfs("A", "Z"), List.of());
        eq(g.dijkstra("A", "Z"), new GraphSearch.Result(Long.MAX_VALUE, List.of()));
        eq(g.aStar("A", "Z", n -> 0), new GraphSearch.Result(Long.MAX_VALUE, List.of()));
        eq(g.dijkstra("A", "A"), new GraphSearch.Result(0L, List.of("A")));
        eq(g.bfs("A", "A"), List.of("A"));
        eq(g.dfs("A", "A"), List.of("A"));
        rejects(() -> g.addEdge("A", "X", -1));
        rejects(() -> g.bfs("missing", "A"));
        rejects(() -> g.dijkstra("A", "missing"));
        rejects(() -> g.aStar("A", "E", n -> -1));
        // Directed edges are not automatically bidirectional.
        GraphSearch directed = new GraphSearch();
        directed.addEdge("S", "T", 0);
        eq(directed.dijkstra("S", "T"), new GraphSearch.Result(0L, List.of("S", "T")));
        eq(directed.dijkstra("T", "S").reachable(), false);
        // Updating an existing edge must change the optimal route.
        directed.addEdge("S", "T", 7);
        eq(directed.dijkstra("S", "T").cost(), 7L);
        // An alternative path with fewer edges can have greater weight.
        GraphSearch routes = new GraphSearch();
        routes.addEdge("S", "G", 100);
        routes.addEdge("S", "X", 2);
        routes.addEdge("X", "G", 3);
        eq(routes.bfs("S", "G"), List.of("S", "G"));
        eq(routes.dijkstra("S", "G"), new GraphSearch.Result(5L, List.of("S", "X", "G")));
        // Zero-weight cycle should not cause endless exploration.
        GraphSearch cyclic = new GraphSearch();
        cyclic.addEdge("P", "Q", 0);
        cyclic.addEdge("Q", "P", 0);
        cyclic.addEdge("Q", "R", 1);
        eq(cyclic.dijkstra("P", "R"), new GraphSearch.Result(1L, List.of("P", "Q", "R")));
        eq(cyclic.bfs("P", "R"), List.of("P", "Q", "R"));
        System.out.println("PASS: " + checks + " graph-search regression checks");
    }
}
