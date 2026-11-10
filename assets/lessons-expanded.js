window.EXPANDED_LESSONS = [
  {
    "title": "Development Environment and Debugging",
    "group": "01 · FOUNDATIONS",
    "subtitle": "Use JDK tools and a debugger",
    "sections": [
      [
        "Tools and repeatable builds",
        "Install a current LTS JDK, verify java -version and javac -version, and use a project directory. Compile with javac and execute with java. IDEs automate these commands, but understanding them makes errors easier to diagnose.",
        "javac Main.java\njava Main"
      ],
      [
        "Compile-time versus runtime failures",
        "A syntax or type error prevents javac from producing valid bytecode. An exception occurs while the JVM executes a program. A logic bug can produce an incorrect result without any exception. Distinguish all three before debugging.",
        "int[] a = {2, 4};\nSystem.out.println(a[1]); // 4"
      ],
      [
        "Debugging with breakpoints",
        "Set a breakpoint, inspect local variables, step into a method, step over a call, and inspect the call stack. Predict each state before pressing Step. Print statements are useful, but breakpoints scale better to complicated code.",
        "static int twice(int n) { return n * 2; }"
      ],
      [
        "Assertions and reproducible cases",
        "Reduce a bug to the smallest failing input. Document expected versus actual behavior and make a regression test so the bug stays fixed. Assertions should not be the only validation for untrusted input.",
        "assert 2 + 2 == 4;"
      ]
    ],
    "exercise": [
      "Create a program with one compile error, one runtime error, and one logic error. Diagnose each using the compiler or debugger.",
      "Write down expected and actual output; fix one category at a time."
    ],
    "check": "Why does a successful compilation not prove a program is correct?"
  },
  {
    "title": "Operators, Casting and Numeric Precision",
    "group": "01 · FOUNDATIONS",
    "subtitle": "Arithmetic, promotion and overflow",
    "sections": [
      [
        "Numeric promotion",
        "Java promotes byte, short and char operands to int for most arithmetic. Mixing numeric types may promote the expression further. Assigning a wider value to a narrower type needs an explicit cast and may lose information.",
        "int x = 7;\ndouble y = x / 2.0;\nSystem.out.println(y); // 3.5"
      ],
      [
        "Overflow and boundaries",
        "An int has a finite range. Integer overflow wraps according to Java integer arithmetic; it does not throw by default. Math.addExact can detect overflow when that is required.",
        "int max = Integer.MAX_VALUE;\nSystem.out.println(max + 1); // -2147483648"
      ],
      [
        "Floating-point representation",
        "Binary floating point cannot represent most decimal fractions exactly. Use a tolerance for numerical comparisons and BigDecimal when exact decimal arithmetic is needed, such as many monetary calculations.",
        "System.out.println(0.1 + 0.2 == 0.3); // false"
      ],
      [
        "Increment and evaluation order",
        "The prefix increment returns the updated value; postfix returns the previous value and then updates the variable. Avoid complicated expressions that modify a variable multiple times.",
        "int n = 3;\nint before = n++;\nSystem.out.println(before + \":\" + n); // 3:4"
      ]
    ],
    "exercise": [
      "Implement a temperature converter and reject NaN and infinite inputs. Test negative and boundary temperatures.",
      "Use Double.isFinite and test values around zero."
    ],
    "check": "Why is comparing 0.1 + 0.2 to 0.3 with == unsafe?"
  },
  {
    "title": "Strings, Unicode and StringBuilder",
    "group": "02 · MEMORY",
    "subtitle": "Understand immutable text and Unicode",
    "sections": [
      [
        "String equality and immutability",
        "String is an immutable reference type. equals checks content; == checks identity. Methods such as replace and toUpperCase return a new String rather than modifying the original.",
        "String a = \"cat\";\nString b = a.toUpperCase();\nSystem.out.println(a + \", \" + b);"
      ],
      [
        "Unicode is more than char",
        "Java String uses UTF-16. A char represents one code unit, not always one complete Unicode character. Supplementary characters use surrogate pairs; codePoints() iterates Unicode code points. Grapheme clusters can contain several code points.",
        "String s = \"😀\";\nSystem.out.println(s.length()); // 2\nSystem.out.println(s.codePointCount(0,s.length())); // 1"
      ],
      [
        "Efficient concatenation",
        "Repeated concatenation in a loop may allocate many intermediate Strings. StringBuilder maintains a mutable character sequence and is useful for incremental construction.",
        "StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 3; i++) sb.append(i);\nSystem.out.println(sb); // 012"
      ],
      [
        "Validation and parsing",
        "trim, strip, split, startsWith, and parseInt are common building blocks. Validate input and handle NumberFormatException when text may not contain a valid integer.",
        "try {\n    int n = Integer.parseInt(\"42\");\n    System.out.println(n);\n} catch (NumberFormatException ex) {\n    System.out.println(\"Invalid number\");\n}"
      ]
    ],
    "exercise": [
      "Build a word-frequency counter that normalizes case and strips punctuation; document how Unicode is handled.",
      "Use a Map<String,Integer> and merge(word,1,Integer::sum)."
    ],
    "check": "Why can String.length() differ from the number of visible characters?"
  },
  {
    "title": "Encapsulation, Access and Static Members",
    "group": "03 · OBJECT-ORIENTED JAVA",
    "subtitle": "Design robust object boundaries",
    "sections": [
      [
        "Encapsulation protects invariants",
        "Keep fields private and expose operations that maintain valid state. A setter for every field is not always a good design. Validate constructor arguments and avoid returning mutable internal collections directly.",
        "class Account {\n  private int cents;\n  Account(int initial) { if(initial < 0) throw new IllegalArgumentException(); cents=initial; }\n  void deposit(int amount) { if(amount<=0) throw new IllegalArgumentException(); cents+=amount; }\n  int balance() { return cents; }\n}"
      ],
      [
        "Access modifiers",
        "private limits access to the enclosing class, package-private to the package, protected additionally to subclasses under Java access rules, and public to any accessible consumer. Choose the narrowest useful visibility.",
        "private int count;"
      ],
      [
        "Instance versus static",
        "Instance fields belong to each object. static fields belong to a class, not an instance. Static mutable state can couple unrelated tests and cause concurrency problems.",
        "class Counter {\n  static int created;\n  Counter() { created++; }\n}"
      ],
      [
        "Immutability and defensive copies",
        "Immutable objects are easier to reason about. final prevents reassignment of a variable or field, but does not automatically make referenced objects immutable. Copy mutable inputs when needed.",
        "final int[] values = {1};\nvalues[0] = 9; // legal"
      ]
    ],
    "exercise": [
      "Design a BankAccount with private state, validation, and tests for invalid deposits and withdrawals.",
      "Prevent negative balances; prefer operations over public setters."
    ],
    "check": "Why does final List<String> not guarantee an immutable list?"
  },
  {
    "title": "Polymorphism, Abstract Classes and Composition",
    "group": "03 · OBJECT-ORIENTED JAVA",
    "subtitle": "Model behavior with substitutable types",
    "sections": [
      [
        "Dynamic dispatch",
        "When a method is overridden, the runtime type of the object determines the invoked implementation. The declared reference type determines which methods the compiler permits.",
        "abstract class Shape { abstract double area(); }\nclass Square extends Shape {\n  final double side;\n  Square(double s){side=s;}\n  @Override double area(){return side*side;}\n}"
      ],
      [
        "Interfaces as contracts",
        "An interface describes supported operations. A class may implement several interfaces but extend only one class. Default methods can provide behavior without replacing careful interface design.",
        "interface Measurable { double measure(); }"
      ],
      [
        "Composition versus inheritance",
        "Use inheritance for a genuine is-a relationship. Prefer composition when one object uses or owns another. Composition limits coupling and avoids fragile superclass dependencies.",
        "class Engine { void start() {} }\nclass Car { private final Engine engine = new Engine(); }"
      ],
      [
        "Liskov substitution",
        "A subtype should honor its parent contract. Strengthening preconditions or surprising callers with incompatible behavior can make a technically valid inheritance hierarchy incorrect in practice.",
        "Shape shape = new Square(3);\nSystem.out.println(shape.area());"
      ]
    ],
    "exercise": [
      "Create a Shape interface with Circle and Rectangle implementations; compute total area without instanceof checks.",
      "Store Shape objects in a List and call area polymorphically."
    ],
    "check": "Why does composition often reduce coupling compared with inheritance?"
  },
  {
    "title": "Generics and Type Safety",
    "group": "03 · OBJECT-ORIENTED JAVA",
    "subtitle": "Reusable code without unsafe casts",
    "sections": [
      [
        "Generic collections",
        "List<String> accepts strings at compile time, reducing casts and many runtime ClassCastExceptions. Type arguments are checked statically and mostly erased at runtime.",
        "java.util.List<String> names = new java.util.ArrayList<>();\nnames.add(\"Ada\");"
      ],
      [
        "Generic methods and bounds",
        "A generic method declares its own type parameters. Bounds let code call operations guaranteed by an interface, such as Comparable.",
        "static <T extends Comparable<T>> T max(T a,T b) {\n  return a.compareTo(b)>=0?a:b;\n}"
      ],
      [
        "Wildcards and variance",
        "List<Integer> is not a subtype of List<Number>. Use ? extends T for producers and ? super T for consumers (PECS). A wildcard is not a free pass to insert arbitrary values.",
        "static double sum(java.util.List<? extends Number> xs) {\n  double n=0; for(Number x:xs)n+=x.doubleValue(); return n;\n}"
      ],
      [
        "Type erasure limitations",
        "You cannot directly create new T[] or test instanceof List<String> at runtime. Runtime representation does not preserve all generic type arguments.",
        "// Illegal: new T[10]"
      ]
    ],
    "exercise": [
      "Implement a generic Pair<A,B> with accessors, equality, and tests using multiple types.",
      "Use Objects.equals in equals and Objects.hash in hashCode."
    ],
    "check": "Why can a List<Integer> not be assigned to List<Number>?"
  },
  {
    "title": "Exceptions and Resource Management",
    "group": "04 · PRACTICAL JAVA",
    "subtitle": "Handle failure without hiding it",
    "sections": [
      [
        "Checked and unchecked exceptions",
        "Checked exceptions must be caught or declared. RuntimeException and its subclasses are unchecked. Choose exceptions that communicate the failure to the caller.",
        "static int parse(String s) { return Integer.parseInt(s); }"
      ],
      [
        "Catch only what you can handle",
        "Do not swallow exceptions silently or catch Exception around an entire program without a recovery strategy. Preserve causes when wrapping exceptions.",
        "try { Integer.parseInt(\"bad\"); }\ncatch (NumberFormatException e) { System.out.println(\"Enter digits\"); }"
      ],
      [
        "try-with-resources",
        "AutoCloseable resources are closed when the try block exits, including when exceptions occur. Prefer this for streams, readers, and other external resources.",
        "try (var reader = java.nio.file.Files.newBufferedReader(java.nio.file.Path.of(\"data.txt\"))) {\n  System.out.println(reader.readLine());\n}"
      ],
      [
        "Designing errors",
        "Validate public method inputs, document expected failures, and distinguish programmer mistakes from environmental failures. Avoid using exceptions for ordinary loop control.",
        "if (index < 0) throw new IllegalArgumentException(\"index\");"
      ]
    ],
    "exercise": [
      "Write a CSV loader that reports a useful error for a missing file and malformed numeric field.",
      "Catch IOException and NumberFormatException separately."
    ],
    "check": "Why is silently catching every exception harmful?"
  },
  {
    "title": "Files, Paths and Data Formats",
    "group": "04 · PRACTICAL JAVA",
    "subtitle": "Read and write safely",
    "sections": [
      [
        "Path and Files",
        "Use java.nio.file.Path and Files for portable file operations. Paths are interpreted relative to the working directory unless absolute. Never assume a user has a particular directory structure.",
        "var path = java.nio.file.Path.of(\"notes.txt\");\njava.nio.file.Files.writeString(path,\"hello\");\nSystem.out.println(java.nio.file.Files.readString(path));"
      ],
      [
        "Text encoding",
        "Specify UTF-8 when data must be exchanged reliably. A text file is bytes plus an encoding convention; Unicode strings are not stored as raw Java char arrays on disk.",
        "Files.writeString(path, \"Καλημέρα\", java.nio.charset.StandardCharsets.UTF_8);"
      ],
      [
        "Streaming versus loading",
        "readAllLines is convenient for small files but consumes memory proportional to input size. Use a buffered reader for large files and process one line at a time.",
        "try(var lines = java.nio.file.Files.lines(path)) {\n  System.out.println(lines.count());\n}"
      ],
      [
        "Simple persistence design",
        "Validate and escape delimiters in CSV. For nontrivial structured data, choose a documented format and a suitable library rather than inventing an ad-hoc parser.",
        "String csv = \"id,name\\n1,Ada\\n\";"
      ]
    ],
    "exercise": [
      "Build a persistent task list with add, list, complete, save, and reload operations.",
      "Start with TSV and reject embedded tab/newline, or choose a robust CSV library."
    ],
    "check": "When is Files.readAllLines inappropriate?"
  },
  {
    "title": "Collections, Iterators and Comparators",
    "group": "04 · PRACTICAL JAVA",
    "subtitle": "Choose the right container",
    "sections": [
      [
        "List, Set and Map",
        "List preserves positional order and permits duplicates. Set enforces uniqueness. Map associates keys with values. Select based on operations, not familiarity.",
        "var ids = new java.util.HashSet<Integer>();\nids.add(3); ids.add(3);\nSystem.out.println(ids.size()); // 1"
      ],
      [
        "Performance tradeoffs",
        "ArrayList offers fast indexed access but middle insertions shift elements. HashMap provides expected constant-time lookup with good hashes; TreeMap maintains sorted keys with logarithmic operations. Complexity is not a guarantee for every input.",
        "var counts = new java.util.HashMap<String,Integer>();\ncounts.merge(\"java\",1,Integer::sum);"
      ],
      [
        "Iterators and modification",
        "Enhanced for uses an iterator for Iterable collections. Removing directly from a collection during iteration can cause ConcurrentModificationException; use Iterator.remove or removeIf where appropriate.",
        "var xs = new java.util.ArrayList<>(java.util.List.of(1,2,3));\nxs.removeIf(n -> n % 2 == 0);"
      ],
      [
        "Sorting objects",
        "Comparable defines natural ordering; Comparator defines alternative orderings. Ensure comparators are consistent, transitive, and handle ties deliberately.",
        "var xs = new java.util.ArrayList<>(java.util.List.of(\"bbb\",\"a\",\"cc\"));\nxs.sort(java.util.Comparator.comparingInt(String::length));"
      ]
    ],
    "exercise": [
      "Build an inventory manager with a Map of product IDs and a sorted report by quantity.",
      "Use Comparator.comparingInt and thenComparing for stable tie rules."
    ],
    "check": "Why is HashMap not a substitute for an ordered map?"
  },
  {
    "title": "Lambdas, Streams and Optional",
    "group": "04 · PRACTICAL JAVA",
    "subtitle": "Process data declaratively",
    "sections": [
      [
        "Lambdas and functional interfaces",
        "A lambda implements a functional interface, an interface with one abstract method. Lambdas can capture effectively final local variables; avoid relying on mutable shared state.",
        "java.util.function.Predicate<Integer> even = n -> n % 2 == 0;"
      ],
      [
        "Stream pipelines",
        "Streams describe transformations and terminal operations. Intermediate operations are lazy. Avoid mutating the source during traversal; prefer simple loops when they communicate intent more clearly.",
        "var squares = java.util.List.of(1,2,3).stream()\n  .map(n -> n*n).toList();"
      ],
      [
        "Optional communicates absence",
        "Optional<T> can represent a potentially missing result. Prefer orElse, orElseGet, orElseThrow, or ifPresent to blindly calling get. Do not use Optional for every field or parameter.",
        "var maybe = java.util.Optional.of(\"Ada\");\nSystem.out.println(maybe.orElse(\"unknown\"));"
      ],
      [
        "Collectors and grouping",
        "Collectors.groupingBy groups elements by a key; toMap needs a merge strategy for duplicate keys. Consider memory usage when collecting large streams.",
        "var groups = java.util.List.of(\"a\",\"bb\",\"cc\").stream()\n  .collect(java.util.stream.Collectors.groupingBy(String::length));"
      ]
    ],
    "exercise": [
      "Given a list of orders, compute revenue by category using both a loop and streams; compare clarity and complexity.",
      "Use groupingBy and summingDouble for a stream approach."
    ],
    "check": "When does a stream execute its intermediate operations?"
  },
  {
    "title": "Dates, Records, Enums and Regular Expressions",
    "group": "04 · PRACTICAL JAVA",
    "subtitle": "Modern standard-library building blocks",
    "sections": [
      [
        "java.time",
        "LocalDate represents a date without time zone; Instant represents a point on the UTC timeline; ZonedDateTime includes time-zone rules. Do not treat local time as globally unique.",
        "var date = java.time.LocalDate.of(2026,11,11);\nSystem.out.println(date.plusDays(7));"
      ],
      [
        "Records and enums",
        "Records are concise data carriers with generated accessors and value-based equals/hashCode. They are shallowly immutable: a mutable component remains mutable. Enums model a fixed set of named constants.",
        "record Point(int x,int y) {}\nenum Status { TODO, DOING, DONE }"
      ],
      [
        "Regular expressions",
        "Pattern compiles a regex and Matcher applies it. Regex is useful for limited text patterns, but avoid treating it as a complete parser for complicated structured languages.",
        "boolean ok = java.util.regex.Pattern.matches(\"[A-Z]{2}[0-9]{3}\",\"AB123\");"
      ],
      [
        "Annotations",
        "Annotations attach metadata for compilers, tools, and frameworks. @Override helps catch mistaken method signatures; custom annotations are usually a later concern.",
        "@Override public String toString() { return \"example\"; }"
      ]
    ],
    "exercise": [
      "Create a record for an appointment with LocalDateTime and a Status enum; validate its fields.",
      "Use a compact record constructor for invariants."
    ],
    "check": "Why does a record not automatically make a contained List immutable?"
  },
  {
    "title": "Heaps, Priority Queues and Union-Find",
    "group": "05 · DATA STRUCTURES",
    "subtitle": "Efficient ordering and connectivity",
    "sections": [
      [
        "Binary heap invariant",
        "A min-heap is a complete binary tree where each parent is no greater than its children. It supports insertion and removal of the minimum in O(log n), and peek in O(1).",
        "var pq = new java.util.PriorityQueue<Integer>();\npq.add(7); pq.add(2);\nSystem.out.println(pq.remove()); // 2"
      ],
      [
        "Priority queues in graph search",
        "Dijkstra and A* use a priority queue for the next candidate. Java PriorityQueue does not automatically reorder a node when you mutate its priority; insert a new entry and skip stale entries.",
        "record Entry(int node,int distance) {}\nvar pq = new java.util.PriorityQueue<Entry>(java.util.Comparator.comparingInt(Entry::distance));"
      ],
      [
        "Disjoint-set union",
        "Union-Find tracks connected components using parent pointers. Path compression and union by size/rank make sequences of operations nearly constant amortized time. It powers Kruskal minimum spanning trees.",
        "int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }"
      ],
      [
        "Choosing a structure",
        "A heap orders only the highest-priority element; it is not a sorted list. Use TreeSet for ordered unique elements and PriorityQueue for repeated best-candidate extraction.",
        "// Heap: poll minimum; TreeSet: ordered iteration"
      ]
    ],
    "exercise": [
      "Implement a min-heap from an array, with push, pop, and invariant checks.",
      "For index i, children are 2*i+1 and 2*i+2."
    ],
    "check": "Why can mutating an element priority break PriorityQueue ordering?"
  },
  {
    "title": "Testing, Build Tools and Git",
    "group": "07 · ADVANCED JAVA",
    "subtitle": "Turn programs into maintainable projects",
    "sections": [
      [
        "Unit tests and boundaries",
        "A good test checks behavior for normal, boundary, and invalid inputs. Arrange, act, assert. Tests should be deterministic, isolated, and fast enough to run frequently.",
        "static void testSquare() {\n  if (4 != 2*2) throw new AssertionError();\n}"
      ],
      [
        "JUnit and dependency management",
        "JUnit is a widely used testing framework. Maven and Gradle compile projects, resolve dependencies, and run test suites. Learn the directory conventions and how to reproduce a build from a clean checkout.",
        "mvn test\n# or\n./gradlew test"
      ],
      [
        "Git workflow",
        "Commit small, coherent changes. Work in a feature branch, run tests, open a pull request, and merge only after review. A reproducible build makes collaboration safer.",
        "git switch -c feature/heap\ngit add . && git commit -m \"Implement heap\""
      ],
      [
        "Profiling and benchmarking",
        "Measure before optimizing. Warm up the JVM, avoid timing tiny operations with one System.nanoTime call, and use JMH for serious microbenchmarks. Complexity analysis and profiling answer different questions.",
        "long started = System.nanoTime();\n// run a representative workload\nSystem.out.println(System.nanoTime() - started);"
      ]
    ],
    "exercise": [
      "Add a build file and JUnit tests to the graph capstone, then run them in CI.",
      "Test an unreachable target and an incorrect heuristic assumption."
    ],
    "check": "Why is a passing test suite not a proof of total correctness?"
  },
  {
    "title": "Concurrency and Thread Safety",
    "group": "07 · ADVANCED JAVA",
    "subtitle": "Reason about shared mutable state",
    "sections": [
      [
        "Threads and races",
        "Two threads can interleave reads and writes unpredictably. Incrementing a shared counter is not an atomic operation. A data race can produce incorrect values even if each thread looks correct alone.",
        "class Counter { int n; void increment(){ n++; } }"
      ],
      [
        "Synchronization and visibility",
        "synchronized provides mutual exclusion and establishes happens-before relationships. volatile helps with visibility and ordering, but does not make compound operations like ++ atomic.",
        "class Counter { private int n; synchronized void inc(){n++;} synchronized int get(){return n;} }"
      ],
      [
        "Executors and tasks",
        "ExecutorService manages task execution. Always arrange shutdown; Future represents a result that may become available later. Prefer immutable messages over shared mutable state when possible.",
        "try(var executor = java.util.concurrent.Executors.newSingleThreadExecutor()) {\n  var result = executor.submit(() -> 42);\n  System.out.println(result.get());\n}"
      ],
      [
        "Deadlock and concurrent collections",
        "Deadlock can occur when locks are acquired in inconsistent orders. ConcurrentHashMap and atomic classes address common concurrency needs; thread safety must still be designed across operations.",
        "var counter = new java.util.concurrent.atomic.AtomicInteger();\ncounter.incrementAndGet();"
      ]
    ],
    "exercise": [
      "Implement a thread-safe counter and test it with multiple workers and a fixed number of increments.",
      "Use AtomicInteger or synchronized; await all Future results."
    ],
    "check": "Why is volatile int count insufficient for count++?"
  },
  {
    "title": "Final Capstone: Search Engine and Route Planner",
    "group": "08 · FINAL CAPSTONE",
    "subtitle": "Design, implement, verify and explain",
    "sections": [
      [
        "Requirements and architecture",
        "Build a console-based route planner over a directed weighted graph. Load nodes and edges, reject negative weights for Dijkstra, find a path, and explain whether the returned route is shortest. Keep parsing, graph storage, search, and output separate.",
        "record Edge(String to,double cost) {}"
      ],
      [
        "Milestone 1: graph and traversal",
        "Implement adjacency lists and BFS/DFS. Test cycles, disconnected components, self-loops, and unknown nodes. Specify a deterministic neighbor order for reproducible traversal tests.",
        "// Graph<String> + bfs(start,goal) + dfs(start,goal)"
      ],
      [
        "Milestone 2: weighted shortest paths",
        "Implement Dijkstra with a priority queue and stale-entry handling. Then implement A* with an admissible heuristic and document when optimality is guaranteed. Return a structured result including path, total cost, and expanded nodes.",
        "// SearchResult(path, cost, expandedCount)"
      ],
      [
        "Milestone 3: engineering quality",
        "Add input validation, unit tests, CLI help, README, sample graphs, and CI. Compare algorithm work on sparse and dense graphs. Use meaningful assertions rather than only checking that the program runs.",
        "// java RoutePlanner sample.csv A Z --algorithm astar"
      ],
      [
        "Acceptance criteria",
        "Pass at least 20 deterministic tests, include unreachable and zero-weight cases, explain O(V+E) BFS/DFS and Dijkstra complexity for your chosen priority queue, and demonstrate why a misleading heuristic can change A* behavior.",
        "// Keep implementation and tests in separate source directories"
      ]
    ],
    "exercise": [
      "Implement the capstone without copying the included reference engine; document design choices and submit a tested repository.",
      "Start with graph invariants and a tiny hand-calculated example."
    ],
    "check": "What assumptions are needed for Dijkstra and A* to return optimal paths?"
  }
];
