# Java Mastery — v0.9

A free, English-language, static Java and Computer Science course.

## Current scope

- 22 written lessons (7 from the earlier edition, 15 newly added) across foundations, JVM memory, OOP, collections, data structures, graph algorithms, heuristics and advanced topics.
- Per-chapter code snippets, independent challenges, hints, comprehension questions and browser-local completion tracking.
- Interactive loop tracing lab on the course overview.
- Responsive interface and GitHub Pages deployment workflow.

**Scope caveat:** This is a broad first-pass curriculum, **not** a fully comprehensive textbook or a guarantee of proficiency. Some snippets are fragments intended to be inserted into a class or method; imports and scaffolding may be required. The Java code is not executed in the browser. A future revision should add deeper proofs, graded test suites, more interactive visualizers, and complete executable examples for every lesson.

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. No dependencies or build step required.

## Publish to GitHub Pages

1. Create a public GitHub repository named `java-mastery`.
2. Push this folder's contents to its `main` branch.
3. Under **Settings → Pages**, select **GitHub Actions** as the deployment source.
4. The included `.github/workflows/pages.yml` deploys on pushes to `main`.

The URL is typically `https://USERNAME.github.io/java-mastery/`.

## Source attribution

The chapter order was informed by user-supplied Java course PDFs and exercises. Explanations are newly written and extend beyond those materials. Original third-party PDFs are not redistributed.

## Limitations

Progress uses localStorage and is not synchronized. The site is educational and does not provide an online Java runtime. Java versions 17+ are recommended for examples using records and switch expressions.

## v0.5 labs

The course overview now includes interactive conceptual object-reference memory states and a weighted shortest-path stepper comparing Dijkstra and A*. Both run entirely in the browser and require no backend. The diagrams are teaching models, not representations of physical JVM memory addresses.

### Release checks

Run `node --check assets/app.js`, `node --check assets/labs.js`, and `node --check assets/advanced-labs.js` to validate JavaScript syntax. Serve locally with `python3 -m http.server 8000` and verify the three graph/memory labs in a browser. Java source examples and the full site have not yet been exhaustively tested.

## v0.6 additions

- Interactive factorial recursion call-stack tracer (n=0..8).
- `java-capstone/`: complete Java graph-search implementation and dependency-free tests for BFS, DFS, Dijkstra, A*, and edge cases.
- Java source verified by compiling with OpenJDK 21 and running the tests.
- Site JavaScript verified with `node --check`; browser visual inspection still recommended.

## v0.7: practice and continuous verification

- `workbook/README.md`: 34 progressively structured independent programming challenges, including acceptance criteria and a capstone extension.
- `java-capstone/run-tests.sh`: one-command compilation and regression tests, without external libraries.
- Expanded Java graph-search regression coverage (directedness, cycles, zero weights, unreachable goals, edge updates, and BFS vs weighted shortest path).
- `.github/workflows/verify.yml`: automatic JavaScript syntax checks and Java capstone tests on pushes and pull requests.

Run `bash java-capstone/run-tests.sh` before merging a branch. The workbook is intentionally ungraded; browser-level tests and comprehensive lesson verification remain outstanding.

## Autograded practice (v0.8)

See [`practice/README.md`](practice/README.md) for eight Java methods and 16 automated checks. The methods deliberately begin as TODOs; the normal test command reports them without failing CI. Use `bash practice/run-tests.sh --require-complete` after implementing every method.

## v0.9: validation and worked examples

- `worked-examples/README.md` adds five detailed traces/invariants across searching, references, graph search, recursion, and dynamic programming.
- `practice/validation/` contains an instructor reference fixture and a harness validation script; the learner starter methods remain TODOs.
- `bash practice/validation/validate-harness.sh` must pass for release: all 16 tests pass with the correct implementation, and a deliberately broken implementation is rejected.
- Browser smoke testing is included in the release verification process; this is not a full cross-browser accessibility audit.

## v1.0: executable example suite

- `examples/src/` contains 14 complete standalone Java programs covering the runtime basics, branching, loops, arrays, methods, references, encapsulation, collections, recursion, binary search, BFS, dynamic programming and exceptions.
- `bash examples/run-all.sh` compiles all examples and compares actual output to checked-in expected output. This also runs in GitHub Actions.
- These are additional runnable examples, not a guarantee that every embedded lesson snippet has been compiled or tested.
