# Java Mastery — v0.3

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
