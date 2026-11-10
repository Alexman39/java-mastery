# Java Mastery — Practice Workbook

This workbook is **deliberately separate from the explanations**. Write solutions before consulting chapter examples. Each task includes acceptance criteria; no solution is provided here. Work from top to bottom. Use Java 17+ and run each program with `javac` and `java`.

## Foundation drills (1–10)

1. **Output and expressions.** Print three lines: your name, `7 * 8`, and `17 / 5`. Explain the difference between quoted and unquoted expressions.
2. **Primitive boundaries.** Print `Integer.MAX_VALUE` and the result of adding 1. Explain overflow using 32-bit signed representation.
3. **Temperature converter.** Read a Celsius value and print Fahrenheit to two decimal places. Verify 0 → 32 and 100 → 212.
4. **Shipping rule.** Given subtotal and member status, apply free shipping for subtotal ≥ 50 or members; test values 49.99, 50, and 50.01.
5. **FizzBuzz.** Print 1–100, replacing multiples of 3/5 appropriately. Test 15 and 30.
6. **Loop comparison.** Write equivalent `for`, `while`, and `do-while` loops; explain why a do-while executes at least once.
7. **Digit reversal.** Reverse an integer without converting it to a String; test 1203 → 3021 and 0 → 0.
8. **Methods.** Implement `isPrime(int n)` with correct handling for n ≤ 1; explain your loop boundary.
9. **Array statistics.** Return min, max, and average from an array. Define behavior for an empty array.
10. **Binary search.** Implement iterative binary search on a sorted array; test empty, one-element, missing, and duplicate values. Document which duplicate index is returned.

## Memory and OOP drills (11–18)

11. **Value vs reference.** Write a method that changes an `int` parameter and a method that mutates a field on an object; predict which changes are visible to the caller.
12. **Aliasing.** Create two references to one mutable object; reassign one reference. Draw conceptual stack/heap diagrams before and after.
13. **BankAccount.** Make balance private; reject negative deposits and withdrawals beyond balance; write at least six assertions.
14. **Immutable coordinate.** Implement `record Point(int x, int y)` and a method returning a translated point without mutating the original.
15. **Inheritance vs composition.** Model a notification service using an interface and two implementations; explain why composition helps testing.
16. **Exceptions.** Parse a list of integer strings, report invalid entries, and continue processing valid ones. Do not catch `Exception` broadly.
17. **Collections.** Count word frequencies with `Map<String,Integer>`; normalize case and define punctuation handling.
18. **Generics.** Write `static <T> void swap(List<T> list, int a, int b)`; test `List<String>` and `List<Integer>`.

## Data structures and algorithms (19–28)

19. **Stack.** Implement a stack with an array that resizes when full; test underflow and LIFO order.
20. **Queue.** Implement a circular queue with head/tail indices; test wraparound and empty/full behavior.
21. **Linked list.** Implement append, remove-first, and iteration. Trace pointer changes for empty and singleton lists.
22. **Binary search tree.** Implement insert, contains, and inorder traversal. Explain worst-case height for sorted insertion.
23. **Hash table.** Implement separate chaining; test collisions and rehashing. Explain average vs worst-case lookup.
24. **Sorting.** Implement merge sort and insertion sort; compare operation counts on sorted and reversed arrays.
25. **Graph representation.** Build a directed adjacency-list graph with deterministic neighbor iteration; test isolated nodes.
26. **BFS and DFS.** Implement both without consulting the capstone source. Log frontier, closed set, current node, and children at each step.
27. **Dijkstra.** Use a priority queue; test a stale queue entry, zero-weight edges, and an unreachable goal. Explain why negative weights are rejected.
28. **A*.** Add a heuristic; demonstrate h=0 behaving like Dijkstra. Construct an inadmissible heuristic and describe how it can produce a suboptimal path.

## Advanced challenges (29–34)

29. **Recursion.** Compare recursive and iterative factorial; define overflow limits and base cases.
30. **Memoization.** Implement top-down Fibonacci with memoization and count calls; compare against naive recursion.
31. **Dynamic programming.** Solve minimum coin change for arbitrary denominations and target. Return impossible when no combination exists.
32. **Greedy counterexample.** Show a coin system where choosing the largest coin first fails to minimize coin count.
33. **Grid pathfinder.** Convert a 2D obstacle grid into graph neighbors; compare BFS and A* with Manhattan distance for 4-direction movement.
34. **Capstone extension.** Add a `SearchEvent` record and emit immutable snapshots of the frontier, visited set, distances, and current node. Export a trace as JSON or CSV for a future browser visualizer.

## Completion standard

For **every** drill: (1) write a prediction, (2) implement independently, (3) run at least three tests including an edge case, (4) state time/space complexity where applicable, and (5) write a 3–5 sentence explanation. A checkbox alone is not proof of mastery.
