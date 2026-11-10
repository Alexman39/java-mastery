# Java Mastery — Autograded Practice Lab

**Purpose:** solve eight independent Java methods. Unlike the capstone, these methods are intentionally unfinished. You write the implementation; the tests provide feedback.

## Requirements

JDK 17 or newer. No Maven, Gradle, external dependencies, or internet connection required.

## Run

```bash
cd practice
bash run-tests.sh
```

The first run prints `TODO` for all 16 tests. **That is expected** and does not mean the course is broken. Open `src/main/java/masty/practice/Practice.java`, replace one `throw new UnsupportedOperationException(...)` at a time, and rerun the tests. A passing test is labeled `PASS`; a wrong answer is labeled `FAIL`.

When you have finished all eight methods, run:

```bash
bash run-tests.sh --require-complete
```

The strict command exits with status 2 if any TODO remains and status 1 for incorrect results.

## Recommended order

1. `isPrime` — loops, bounds, divisibility; O(sqrt n) target.
2. `reversed` — arrays, allocation, aliasing; O(n) time and space.
3. `binarySearchFirst` — binary search invariant; O(log n) time.
4. `countDistinctWords` — sets, normalization; average O(n) operations.
5. `letterCounts` — maps and character iteration; O(n) time.
6. `balancedBrackets` — stack, nesting; O(n) time and space.
7. `fibonacci` — iterative state; O(n) time and output space. For large n, `long` overflows; test inputs stay within range.
8. `minCoins` — bottom-up dynamic programming; O(amount × number of denominations) time.

## Important edge cases

- `binarySearchFirst` must return the **first** matching index for duplicates.
- `reversed` must not mutate the input array.
- `countDistinctWords` trims surrounding whitespace and ignores case; do not invent punctuation stripping.
- `minCoins` uses positive denominations and a nonnegative amount. These are preconditions; you may reject invalid input with `IllegalArgumentException`.
- `balancedBrackets` ignores nonbracket characters.
- `letterCounts` counts only English letters `a`–`z`, case-insensitively.

## Learning standard

Before coding, predict the output of a sample. Write your implementation independently. After tests pass, add at least two more tests of your own, explain the invariant, and state the complexity. Automated tests show evidence of correctness for covered cases, not proof of correctness for all inputs.
