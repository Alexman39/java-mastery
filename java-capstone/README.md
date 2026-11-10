# Java Mastery capstone — graph search engine

This is a **real Java 17+ project**, not browser-executed Java. Implement and test directed weighted graph algorithms without external dependencies.

## Run the tests

From the `java-capstone` directory:

```bash
mkdir -p out
javac -d out src/main/java/masty/GraphSearch.java src/test/java/masty/GraphSearchTest.java
java -ea -cp out masty.GraphSearchTest
```

## Learn in stages

1. Draw the graph and manually trace the queue in BFS.
2. Trace DFS's LIFO stack and explain why neighbor order matters.
3. Compare BFS's fewest **edges** against Dijkstra's lowest total **weight**.
4. Trace Dijkstra's priority queue, distances, and predecessor map.
5. Trace A* with `f(n) = g(n) + h(n)`; explain admissibility and consistency.
6. Add tests for cycles, self-loops, disconnected graphs, duplicate edges, and equal-cost paths.
7. Extend the implementation with a `SearchTrace` record that captures frontier and closed-set snapshots.

## Design notes

- Directed edges; `addEdge` adds both endpoints automatically.
- Edge weights must be nonnegative. Zero-weight edges are allowed.
- BFS/DFS return paths with fewest edges / depth-first discovery respectively; they ignore weights.
- Dijkstra uses A* with a zero heuristic.
- A* is optimal with a **consistent, admissible** heuristic. Inconsistent heuristics may require additional handling for optimality; don't assume arbitrary heuristics work.
- No path: empty list for BFS/DFS; `Result(Long.MAX_VALUE, List.of())` for weighted searches.
- This is educational code, not a production graph library. Large `long` sums are not overflow-guarded.
