# Worked examples — reasoning before code

These exercises accompany the chapters. Type and run each example yourself; don't merely read the output.

## 1. Loop invariants: first occurrence binary search

**Problem:** Find the first index containing `target` in a sorted integer array, or return -1.

Maintain a half-open candidate interval `[lo, hi)`. At the start of every iteration, **no index smaller than `lo` can contain the first target**, and **any first occurrence must be strictly below `hi`**. If `a[mid] < target`, discard `[lo, mid]`; otherwise retain `mid` and discard everything after it. When `lo == hi`, inspect the candidate.

```java
static int firstIndex(int[] a, int target) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo < a.length && a[lo] == target ? lo : -1;
}
```

Trace `a = [1, 2, 2, 2, 5]`, target `2`: `(lo,hi) = (0,5) → (0,2) → (0,1) → (1,1)`. Answer: 1. Runtime O(log n), extra space O(1).

**Challenge:** Modify the method to return the first index whose value is *greater than* target.

## 2. References: copy versus alias

```java
int[] original = {3, 6};
int[] alias = original;
int[] copy = original.clone();
alias[0] = 10;
System.out.println(original[0]); // 10
System.out.println(copy[0]);     // 3
```

`alias` and `original` refer to the same array; `clone()` creates a different array containing copies of primitive elements. **Important:** cloning an array of objects copies its references, not the objects themselves.

**Challenge:** Explain the result if `original` were an array of mutable `Box` objects and you changed a `Box.value` field through `copy[0]`.

## 3. BFS versus Dijkstra

BFS uses a FIFO queue and finds the path with the **fewest edges** in an unweighted graph. Dijkstra uses a priority queue and finds the **least total nonnegative weight**. A three-edge path can be cheaper than a one-edge path. Neither algorithm may safely be treated as a general negative-weight shortest-path solver.

Graph: `A → B (10)`, `A → C (1)`, `C → B (1)`. BFS may find direct path `A → B` (one edge, cost 10); Dijkstra finds `A → C → B` (two edges, cost 2).

**Challenge:** Construct a graph where BFS and Dijkstra return the same path. Explain why.

## 4. Recursion: why the stack grows

```java
static int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
```

For `sum(3)`, calls enter as `sum(3) → sum(2) → sum(1) → sum(0)`; values return as `0 → 1 → 3 → 6`. Four frames are conceptually active at maximum depth. The computation is O(n) time and O(n) stack space.

**Challenge:** Rewrite using a loop and compare the auxiliary space.

## 5. Dynamic programming: minimum coins

Define `dp[x]` as the minimum number of coins needed to make amount `x`. Set `dp[0] = 0` and other entries to an unreachable sentinel. For each positive denomination `coin`, update `dp[x] = min(dp[x], dp[x - coin] + 1)` for `x >= coin`. For coins `[1, 3, 4]` and amount 6, the optimal answer is 2 (`3 + 3`), not the greedy choice `4 + 1 + 1`.

**Challenge:** Why is a greedy choice not always globally optimal? Which input validation should your method perform?
