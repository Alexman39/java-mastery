# Java Mastery

An English-language, first-principles Java and Computer Science learning website.

## What's included

- Responsive, dark-themed learning site with sidebar chapter navigation
- Four written chapters: Java execution, variables/types, decisions, and loops
- Worked code examples, end-of-chapter coding challenges, and revealable hints
- Browser-local chapter completion tracking
- Curriculum roadmap through data structures, graphs, and heuristic search
- GitHub Pages deployment workflow

## Run locally

No build system or dependencies required. From this folder:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000 .

## Publish to GitHub Pages

1. Create a public repository (for example, `java-mastery`).
2. Upload or push all files in this directory to its `main` branch, including `.github/workflows/pages.yml`.
3. In repository **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
4. After the deployment workflow completes, open the URL shown in the workflow's deployment summary (typically `https://USERNAME.github.io/java-mastery/`).

## Editorial roadmap

The chapter list includes planned material. Planned chapters are clearly marked and are **not** represented as complete. Future versions should expand theory, diagrams, interactive execution tracing, solutions, tests, and algorithm visualizers.

## Source materials

The initial chapter sequence was informed by the user's supplied Java lecture notes and introductory presentation. The explanations are original educational writing, with additional clarifications on modern JVM behavior and Java semantics. Do not redistribute the uploaded lecture files without permission.

## Limitations

Progress is stored only in localStorage in the current browser. Java code examples are displayed, not executed in-browser. This is a first release, not a complete textbook yet.
# java-mastery
