package masty;

import java.util.*;

/** Directed, nonnegative weighted graph with deterministic insertion-order traversal. */
public final class GraphSearch {
    private final Map<String, LinkedHashMap<String, Integer>> edges = new LinkedHashMap<>();

    public void addNode(String node) {
        Objects.requireNonNull(node, "node");
        edges.computeIfAbsent(node, ignored -> new LinkedHashMap<>());
    }

    public void addEdge(String from, String to, int weight) {
        if (weight < 0) throw new IllegalArgumentException("Negative weight");
        addNode(from); addNode(to);
        edges.get(from).put(to, weight);
    }

    private void validate(String start, String goal) {
        if (!edges.containsKey(start) || !edges.containsKey(goal))
            throw new IllegalArgumentException("Unknown start or goal node");
    }

    public List<String> bfs(String start, String goal) {
        validate(start, goal);
        Deque<String> queue = new ArrayDeque<>();
        Map<String, String> previous = new HashMap<>();
        Set<String> visited = new HashSet<>();
        queue.addLast(start); visited.add(start);
        while (!queue.isEmpty()) {
            String node = queue.removeFirst();
            if (node.equals(goal)) return reconstruct(previous, goal);
            for (String next : edges.get(node).keySet()) {
                if (visited.add(next)) { previous.put(next, node); queue.addLast(next); }
            }
        }
        return List.of();
    }

    public List<String> dfs(String start, String goal) {
        validate(start, goal);
        Deque<String> stack = new ArrayDeque<>();
        Map<String, String> previous = new HashMap<>();
        Set<String> visited = new HashSet<>();
        stack.push(start); visited.add(start);
        while (!stack.isEmpty()) {
            String node = stack.pop();
            if (node.equals(goal)) return reconstruct(previous, goal);
            List<String> neighbors = new ArrayList<>(edges.get(node).keySet());
            Collections.reverse(neighbors); // preserve insertion order when popping
            for (String next : neighbors) {
                if (visited.add(next)) { previous.put(next, node); stack.push(next); }
            }
        }
        return List.of();
    }

    public record Result(long cost, List<String> path) {
        public Result { path = List.copyOf(path); }
        public boolean reachable() { return cost != Long.MAX_VALUE; }
    }
    private record Entry(String node, long priority) {}

    public Result dijkstra(String start, String goal) {
        return aStar(start, goal, node -> 0L);
    }

    /** For optimality, supply an admissible and consistent nonnegative heuristic. */
    public Result aStar(String start, String goal, java.util.function.ToLongFunction<String> heuristic) {
        validate(start, goal);
        Objects.requireNonNull(heuristic, "heuristic");
        Map<String, Long> distance = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<Entry> open = new PriorityQueue<>(Comparator.comparingLong(Entry::priority));
        distance.put(start, 0L);
        long h0 = heuristic.applyAsLong(start);
        if (h0 < 0) throw new IllegalArgumentException("Negative heuristic");
        open.add(new Entry(start, h0));
        while (!open.isEmpty()) {
            Entry entry = open.poll();
            String node = entry.node();
            long current = distance.get(node);
            long h = heuristic.applyAsLong(node);
            if (h < 0) throw new IllegalArgumentException("Negative heuristic");
            if (entry.priority() != current + h) continue; // stale entry
            if (node.equals(goal)) return new Result(current, reconstruct(previous, goal));
            for (var edge : edges.get(node).entrySet()) {
                String next = edge.getKey();
                long candidate = current + edge.getValue();
                if (candidate < distance.getOrDefault(next, Long.MAX_VALUE)) {
                    distance.put(next, candidate);
                    previous.put(next, node);
                    long estimate = heuristic.applyAsLong(next);
                    if (estimate < 0) throw new IllegalArgumentException("Negative heuristic");
                    open.add(new Entry(next, candidate + estimate));
                }
            }
        }
        return new Result(Long.MAX_VALUE, List.of());
    }

    private static List<String> reconstruct(Map<String, String> previous, String goal) {
        LinkedList<String> path = new LinkedList<>();
        for (String at = goal; at != null; at = previous.get(at)) path.addFirst(at);
        return List.copyOf(path);
    }
}
