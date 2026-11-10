window.EXTRA_LESSONS = [
  {
    "title": "Arrays and Strings",
    "group": "01 · FOUNDATIONS",
    "subtitle": "Indexed data and immutable text",
    "sections": [
      [
        "Arrays and bounds",
        "An array stores a fixed number of elements of one component type. Its length is fixed after construction. Indices start at zero; an invalid index throws ArrayIndexOutOfBoundsException.",
        "int[] scores = {10, 20, 30};\nSystem.out.println(scores[1]); // 20\nscores[1] = 25;"
      ],
      [
        "Iteration and aggregation",
        "Traverse indices when position matters. Maintain an accumulator and verify the empty-array case before calculating an average.",
        "int sum = 0;\nfor (int n : scores) sum += n;\ndouble average = (double) sum / scores.length;"
      ],
      [
        "Strings are objects",
        "String values are immutable. Concatenation creates a new value; equals compares content. charAt accesses UTF-16 code units, not necessarily whole Unicode characters.",
        "String name = \"Ada\";\nSystem.out.println(name.length());\nSystem.out.println(name.equals(\"Ada\"));"
      ]
    ],
    "exercise": [
      "Read an integer array, report minimum, maximum, sum, and mean. Define what happens for an empty array.",
      "Track min and max from the first element, after checking length."
    ],
    "check": "Why can an array of length five not access index five?"
  },
  {
    "title": "Methods and Scope",
    "group": "01 · FOUNDATIONS",
    "subtitle": "Decompose programs into testable operations",
    "sections": [
      [
        "Method contracts",
        "A method has a name, parameter types, a return type, and behavior. Small methods make programs easier to test and reason about.",
        "static int square(int n) {\n    return n * n;\n}"
      ],
      [
        "Local scope",
        "A local variable exists only within its declared scope. Parameters are local variables. Java passes arguments by value: a primitive value is copied; an object reference value is copied.",
        "static void change(int n) { n = 99; }\nint x = 3;\nchange(x);\nSystem.out.println(x); // 3"
      ],
      [
        "Overloading and return",
        "Methods may share a name when parameter lists differ. A non-void method must return a compatible value on all reachable paths.",
        "static int max(int a, int b) {\n    return a >= b ? a : b;\n}"
      ]
    ],
    "exercise": [
      "Implement isPrime(int n), then use it to print primes between 2 and 100.",
      "Check divisors up to d <= n / d, and handle n < 2."
    ],
    "check": "What exactly is copied when a reference argument is passed to a method?"
  },
  {
    "title": "Stack, Heap, References",
    "group": "02 · MEMORY",
    "subtitle": "Reason about object identity and lifetime",
    "sections": [
      [
        "Memory model",
        "Each thread has a JVM stack of frames for method calls. Objects and arrays are conceptually allocated on the heap. The JVM may optimize actual placement; do not confuse a teaching diagram with a physical address.",
        "int[] first = {1, 2};\nint[] second = first;\nsecond[0] = 9;\nSystem.out.println(first[0]); // 9"
      ],
      [
        "Aliasing",
        "Two references can point to the same mutable object. Assigning one reference to another copies the reference value, not the object.",
        "int[] a = {4};\nint[] b = a;\nb[0]++;\nSystem.out.println(a[0]); // 5"
      ],
      [
        "Garbage collection",
        "An object becomes eligible for garbage collection when it is no longer reachable from GC roots. Eligibility does not imply immediate reclamation; do not depend on finalization for cleanup.",
        "StringBuilder sb = new StringBuilder(\"hi\");\nsb = null; // old object may now be unreachable"
      ]
    ],
    "exercise": [
      "Create two arrays, one alias and one clone; mutate each and explain the results.",
      "Use clone() for a shallow array copy."
    ],
    "check": "Why does changing b[0] also change a[0] after b = a?"
  },
  {
    "title": "Inheritance and Interfaces",
    "group": "03 · OBJECT-ORIENTED JAVA",
    "subtitle": "Subtyping and dynamic dispatch",
    "sections": [
      [
        "Inheritance models is-a",
        "A subclass extends one superclass and inherits accessible behavior. Prefer composition unless a true substitutability relationship exists.",
        "class Animal { void sound() {} }\nclass Dog extends Animal {\n    @Override void sound() { System.out.println(\"Woof\"); }\n}"
      ],
      [
        "Dynamic dispatch",
        "An overridden instance method is selected based on the runtime object type, even if the variable has a superclass type.",
        "Animal a = new Dog();\na.sound(); // Woof"
      ],
      [
        "Interfaces are contracts",
        "Interfaces describe capabilities. A class may implement multiple interfaces; interface methods may also have default and static implementations.",
        "interface Drawable { void draw(); }\nclass Circle implements Drawable {\n    public void draw() { System.out.println(\"O\"); }\n}"
      ]
    ],
    "exercise": [
      "Model Shape with Circle and Rectangle, each implementing area() and print their areas through a shared interface.",
      "Prefer an interface with double area()."
    ],
    "check": "Why does Animal a = new Dog() call Dog.sound()?"
  },
  {
    "title": "Exceptions and Files",
    "group": "03 · OBJECT-ORIENTED JAVA",
    "subtitle": "Failures and reliable resource handling",
    "sections": [
      [
        "Exception categories",
        "Checked exceptions must be caught or declared. Unchecked exceptions extend RuntimeException. Catch failures at a level that can respond meaningfully.",
        "try {\n    int x = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n    System.out.println(\"Invalid integer\");\n}"
      ],
      [
        "Try with resources",
        "Close files deterministically with try-with-resources. Garbage collection is not a replacement for resource cleanup.",
        "import java.nio.file.*;\nimport java.io.IOException;\n// inside a method declaring throws IOException:\nString text = Files.readString(Path.of(\"notes.txt\"));"
      ],
      [
        "Validation",
        "Reject invalid arguments with clear exceptions. Do not swallow exceptions silently or catch Exception around every operation.",
        "static int divide(int a, int b) {\n    if (b == 0) throw new IllegalArgumentException(\"zero divisor\");\n    return a / b;\n}"
      ]
    ],
    "exercise": [
      "Build a line-based file reader that counts nonblank lines and handles missing files gracefully.",
      "Use Files.readAllLines and catch IOException."
    ],
    "check": "When should an exception be handled rather than propagated?"
  },
  {
    "title": "Lists, Stacks, Queues",
    "group": "04 · DATA STRUCTURES",
    "subtitle": "Choose structures based on operations",
    "sections": [
      [
        "ArrayList",
        "ArrayList is backed by a resizable array. Indexed access is O(1); appending is amortized O(1); inserting near the front shifts elements.",
        "import java.util.*;\nList<Integer> nums = new ArrayList<>();\nnums.add(10);\nnums.add(20);"
      ],
      [
        "Stack as Deque",
        "A stack is LIFO. ArrayDeque is generally preferred to the legacy Stack class for stack operations.",
        "Deque<String> stack = new ArrayDeque<>();\nstack.push(\"A\"); stack.push(\"B\");\nSystem.out.println(stack.pop()); // B"
      ],
      [
        "Queue as Deque",
        "A queue is FIFO. addLast and removeFirst make its semantics explicit. BFS relies on a FIFO frontier.",
        "Deque<String> queue = new ArrayDeque<>();\nqueue.addLast(\"A\"); queue.addLast(\"B\");\nSystem.out.println(queue.removeFirst()); // A"
      ]
    ],
    "exercise": [
      "Implement balanced-parentheses checking with an ArrayDeque stack.",
      "Push opening delimiters and match closing ones; reject a closing delimiter on an empty stack."
    ],
    "check": "Why is a queue appropriate for breadth-first search?"
  },
  {
    "title": "Hash Tables and Maps",
    "group": "04 · DATA STRUCTURES",
    "subtitle": "Fast lookup and the cost of hashing",
    "sections": [
      [
        "Maps and sets",
        "HashMap associates unique keys with values. HashSet stores unique elements. Expected average lookup is O(1), but worst cases and resizing matter.",
        "Map<String,Integer> count = new HashMap<>();\ncount.merge(\"java\", 1, Integer::sum);"
      ],
      [
        "Equality and hashing",
        "Keys rely on equals and hashCode. Equal objects must have equal hash codes. Mutable keys can break retrieval if their hash-relevant state changes.",
        "Set<String> seen = new HashSet<>();\nseen.add(\"A\");\nSystem.out.println(seen.contains(\"A\"));"
      ],
      [
        "Frequency counting",
        "A frequency map is useful in word counting, duplicate detection, and graph algorithms.",
        "for (String word : List.of(\"a\",\"b\",\"a\")) {\n    count.merge(word, 1, Integer::sum);\n}"
      ]
    ],
    "exercise": [
      "Write a word-frequency counter that ignores case and punctuation.",
      "Normalize tokens before merging counts."
    ],
    "check": "Why is using a mutable object as a HashMap key dangerous?"
  },
  {
    "title": "Trees and Binary Search Trees",
    "group": "04 · DATA STRUCTURES",
    "subtitle": "Hierarchical data and invariants",
    "sections": [
      [
        "Tree vocabulary",
        "A tree contains nodes connected by edges without cycles. Terms include root, parent, child, leaf, depth, and height. Binary trees have at most two children per node.",
        "class Node {\n    int value; Node left, right;\n    Node(int value) { this.value = value; }\n}"
      ],
      [
        "BST invariant",
        "For a binary search tree, keys in the left subtree are smaller and keys in the right subtree larger, under a chosen duplicate policy. Balanced height gives O(log n) search; a skewed tree may require O(n).",
        "static boolean contains(Node n, int x) {\n    if (n == null) return false;\n    if (n.value == x) return true;\n    return contains(x < n.value ? n.left : n.right, x);\n}"
      ],
      [
        "Traversals",
        "Inorder visits left-node-right and produces sorted values in a BST. Preorder and postorder serve other purposes, including serialization and cleanup.",
        "static void inorder(Node n) {\n    if (n == null) return;\n    inorder(n.left);\n    System.out.println(n.value);\n    inorder(n.right);\n}"
      ]
    ],
    "exercise": [
      "Implement BST insertion, lookup, and inorder traversal; test ascending insertion.",
      "Observe the skewed shape from already sorted input."
    ],
    "check": "Why can a BST degrade to linear search time?"
  },
  {
    "title": "Graphs and Representations",
    "group": "04 · DATA STRUCTURES",
    "subtitle": "Vertices, edges, and neighbors",
    "sections": [
      [
        "Graph models",
        "Graphs contain vertices and edges. They may be directed or undirected, weighted or unweighted. Cycles are allowed. Many real systems are naturally graphs.",
        "Map<Integer,List<Integer>> graph = new HashMap<>();\ngraph.put(0, List.of(1, 2));\ngraph.put(1, List.of(2));\ngraph.put(2, List.of());"
      ],
      [
        "Adjacency list",
        "An adjacency list stores neighbors for each vertex and typically uses O(V+E) space. An adjacency matrix uses O(V²) space but offers constant-time edge existence checks.",
        "for (int neighbor : graph.getOrDefault(0, List.of())) {\n    System.out.println(neighbor);\n}"
      ],
      [
        "Visited states",
        "Graph search must prevent repeated expansion on cycles. A visited set records explored vertices; the exact moment of marking matters for duplicate work.",
        "Set<Integer> visited = new HashSet<>();\nvisited.add(0);"
      ]
    ],
    "exercise": [
      "Represent a small social network as an adjacency list and print each person’s neighbors.",
      "Choose whether relationships are directed or mutual."
    ],
    "check": "Why can graph traversal loop forever without a visited set?"
  },
  {
    "title": "Sorting Algorithms",
    "group": "05 · ALGORITHMS",
    "subtitle": "Ordering and algorithmic tradeoffs",
    "sections": [
      [
        "Selection sort",
        "Selection sort repeatedly selects the smallest remaining element. It performs O(n²) comparisons and O(1) extra space, and is generally not stable.",
        "for (int i = 0; i < a.length; i++) {\n    int min = i;\n    for (int j = i + 1; j < a.length; j++)\n        if (a[j] < a[min]) min = j;\n    int t = a[i]; a[i] = a[min]; a[min] = t;\n}"
      ],
      [
        "Merge sort",
        "Merge sort divides the array, sorts halves recursively, and merges them. It runs in O(n log n) time and typically uses O(n) auxiliary array space.",
        "// mergeSort(a, left, right):\n// 1. Split at midpoint\n// 2. Sort each half\n// 3. Merge sorted halves"
      ],
      [
        "Stable sorting",
        "A stable sort preserves the original relative order of equal keys. Stability matters when sorting records by multiple fields. Java Arrays.sort has different implementations for primitive and object arrays.",
        "int[] a = {7, 3, 7, 1};\nArrays.sort(a);"
      ]
    ],
    "exercise": [
      "Implement insertion sort and merge sort, and compare comparison counts on random and sorted inputs.",
      "Count comparisons rather than only elapsed time."
    ],
    "check": "Why is O(n log n) usually better than O(n²) as n grows?"
  },
  {
    "title": "BFS and DFS",
    "group": "05 · ALGORITHMS",
    "subtitle": "Systematic exploration of state spaces",
    "sections": [
      [
        "Breadth-first search",
        "BFS uses a FIFO queue and explores nodes by increasing edge distance. On unweighted graphs it finds a shortest path in number of edges. Time complexity with adjacency lists is O(V+E).",
        "Deque<Integer> q = new ArrayDeque<>();\nSet<Integer> seen = new HashSet<>();\nq.add(0); seen.add(0);\nwhile (!q.isEmpty()) {\n    int v = q.removeFirst();\n    for (int n : graph.getOrDefault(v, List.of()))\n        if (seen.add(n)) q.addLast(n);\n}"
      ],
      [
        "Depth-first search",
        "DFS uses recursion or an explicit LIFO stack, exploring one branch before backtracking. It does not generally produce shortest paths.",
        "static void dfs(int v, Map<Integer,List<Integer>> g, Set<Integer> seen) {\n    if (!seen.add(v)) return;\n    for (int n : g.getOrDefault(v, List.of())) dfs(n, g, seen);\n}"
      ],
      [
        "Frontier and closed set",
        "A frontier holds discovered states awaiting expansion. A closed or visited set prevents repeated processing. Trace both at each step to understand search order.",
        "// BFS frontier: FIFO queue\n// DFS frontier: LIFO stack"
      ]
    ],
    "exercise": [
      "Implement BFS and DFS on the same graph; print expansion order and reconstruct a BFS path using a parent map.",
      "Store parent when first discovering each vertex."
    ],
    "check": "Why does BFS find shortest paths in unweighted graphs but DFS does not?"
  },
  {
    "title": "Dijkstra and A*",
    "group": "05 · ALGORITHMS",
    "subtitle": "Weighted shortest paths and guided search",
    "sections": [
      [
        "Dijkstra",
        "Dijkstra computes shortest paths from a source in graphs with nonnegative edge weights. A min-priority queue repeatedly selects the smallest tentative distance.",
        "record Edge(int to, int cost) {}\nrecord State(int node, int distance) {}\nPriorityQueue<State> pq = new PriorityQueue<>(\n    Comparator.comparingInt(State::distance));"
      ],
      [
        "Relaxation",
        "For edge u→v with weight w, update dist[v] if dist[u]+w is smaller. With a binary heap and adjacency lists the standard complexity is O((V+E) log V).",
        "if (dist[u] + weight < dist[v]) {\n    dist[v] = dist[u] + weight;\n    pq.add(new State(v, dist[v]));\n}"
      ],
      [
        "A* search",
        "A* prioritizes f(n)=g(n)+h(n), where g is known path cost and h estimates remaining cost. Admissible heuristics do not overestimate the true remaining cost; consistent heuristics additionally obey a triangle inequality.",
        "double f = gScore + heuristicEstimate;\n// Priority queue ordered by f"
      ]
    ],
    "exercise": [
      "Implement Dijkstra on a five-node weighted graph, then compare A* with a zero heuristic.",
      "With h=0, A* behaves like uniform-cost search under compatible tie-breaking."
    ],
    "check": "Why are negative edge weights a problem for Dijkstra?"
  },
  {
    "title": "Greedy and Heuristic Search",
    "group": "05 · ALGORITHMS",
    "subtitle": "Prioritize promising states without guarantees",
    "sections": [
      [
        "Greedy best-first",
        "Greedy best-first search orders its frontier by h(n) alone, ignoring the cost already paid. It can be fast but is not generally optimal.",
        "PriorityQueue<Node> frontier = new PriorityQueue<>(\n    Comparator.comparingDouble(n -> heuristic(n)));"
      ],
      [
        "Heuristic design",
        "A heuristic estimates how close a state is to a goal. Manhattan distance works for four-direction grid movement without diagonal moves, when each step has equal cost.",
        "static int manhattan(int x1,int y1,int x2,int y2) {\n    return Math.abs(x1-x2) + Math.abs(y1-y2);\n}"
      ],
      [
        "Comparing strategies",
        "BFS uses depth for unweighted graphs, Dijkstra uses g, greedy uses h, and A* uses g+h. Compare expansion order, path cost, and memory rather than assuming one always wins.",
        "// BFS: depth\n// Dijkstra: g\n// Greedy: h\n// A*: g + h"
      ]
    ],
    "exercise": [
      "Build a grid search comparison that reports explored nodes and path length for BFS, greedy, and A*.",
      "Use identical obstacles and start/goal positions."
    ],
    "check": "Why can greedy best-first return a longer path than A*?"
  },
  {
    "title": "Backtracking and Dynamic Programming",
    "group": "05 · ALGORITHMS",
    "subtitle": "Search, reuse, and overlapping subproblems",
    "sections": [
      [
        "Backtracking",
        "Backtracking explores candidate choices, undoes them, and prunes invalid branches. It is useful for constraint satisfaction and combinatorial search.",
        "static void subsets(int[] a, int i, List<Integer> path) {\n    if (i == a.length) { System.out.println(path); return; }\n    subsets(a, i+1, path);\n    path.add(a[i]);\n    subsets(a, i+1, path);\n    path.remove(path.size()-1);\n}"
      ],
      [
        "Memoization",
        "Dynamic programming saves results of overlapping subproblems. Top-down memoization combines recursion with a cache; bottom-up tabulation fills a table.",
        "static long fib(int n, long[] memo) {\n    if (n < 2) return n;\n    if (memo[n] != 0) return memo[n];\n    return memo[n] = fib(n-1,memo) + fib(n-2,memo);\n}"
      ],
      [
        "State definition",
        "Before writing a DP recurrence, define precisely what dp[i] represents, the base cases, transitions, and evaluation order. Complexity is number of states multiplied by work per state.",
        "// dp[i] = minimum cost to reach step i"
      ]
    ],
    "exercise": [
      "Solve coin change (minimum coins) with bottom-up DP and explain the unreachable case.",
      "Initialize unreachable states with a sentinel greater than any feasible answer."
    ],
    "check": "How does memoization avoid repeated recursive work?"
  },
  {
    "title": "Testing, Concurrency, JVM",
    "group": "06 · ADVANCED JAVA",
    "subtitle": "Verification, parallel execution, and performance",
    "sections": [
      [
        "Testing principles",
        "Test normal cases, boundaries, invalid input, and invariants. Unit tests should be deterministic and isolate behavior. Property-based tests can verify general laws.",
        "static int abs(int x) { return Math.abs(x); }\nassert abs(-3) == 3; // run with java -ea"
      ],
      [
        "Threads and shared state",
        "Threads can execute concurrently and interleave reads and writes. A data race can occur when shared mutable state is accessed without appropriate synchronization.",
        "// AtomicInteger supports atomic increments\nAtomicInteger counter = new AtomicInteger();\ncounter.incrementAndGet();"
      ],
      [
        "JVM tools",
        "Use javac and java to compile/run; javap -c inspects bytecode; jcmd and Java Flight Recorder help investigate JVM behavior. Benchmarking requires warmup and careful methodology.",
        "javac Main.java\njavap -c Main\njava Main"
      ]
    ],
    "exercise": [
      "Write tests for your binary search and benchmark it against linear search on several input sizes.",
      "Include empty arrays, duplicates, absent targets, and boundaries."
    ],
    "check": "Why is a single wall-clock timing run unreliable for Java benchmarking?"
  }
];
