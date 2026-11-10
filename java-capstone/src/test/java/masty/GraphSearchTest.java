package masty;

import java.util.*;

/** Dependency-free test runner: java -ea -cp out masty.GraphSearchTest */
public final class GraphSearchTest {
    private static void eq(Object actual, Object expected) {
        if (!Objects.equals(actual, expected))
            throw new AssertionError("Expected " + expected + " but got " + actual);
    }
    private static void rejects(Runnable action) {
        try { action.run(); throw new AssertionError("Expected IllegalArgumentException"); }
        catch (IllegalArgumentException expected) { /* pass */ }
    }
    public static void main(String[] args) {
        GraphSearch g = new GraphSearch();
        g.addEdge("A", "B", 4); g.addEdge("A", "C", 2);
        g.addEdge("C", "B", 1); g.addEdge("B", "D", 5);
        g.addEdge("C", "D", 8); g.addEdge("D", "E", 2);
        g.addEdge("B", "E", 10);
        eq(g.bfs("A", "E"), List.of("A", "B", "E")); // fewest edges, not weight
        eq(g.dfs("A", "E"), List.of("A", "B", "E"));
        eq(g.dijkstra("A", "E"), new GraphSearch.Result(10L, List.of("A", "C", "B", "D", "E")));
        Map<String, Long> h = Map.of("A", 7L, "B", 5L, "C", 6L, "D", 2L, "E", 0L);
        eq(g.aStar("A", "E", n -> h.get(n)), g.dijkstra("A", "E"));
        g.addNode("Z");
        eq(g.bfs("A", "Z"), List.of());
        eq(g.dfs("A", "Z"), List.of());
        eq(g.dijkstra("A", "Z"), new GraphSearch.Result(Long.MAX_VALUE, List.of()));
        eq(g.dijkstra("A", "A"), new GraphSearch.Result(0L, List.of("A")));
        rejects(() -> g.addEdge("A", "X", -1));
        rejects(() -> g.bfs("missing", "A"));
        rejects(() -> g.aStar("A", "E", n -> -1));
        System.out.println("PASS: graph traversal, shortest paths, A*, unreachable nodes, validation");
    }
}
