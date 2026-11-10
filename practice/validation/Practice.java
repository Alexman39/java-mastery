package masty.practice;

import java.util.List;
import java.util.Map;

/** Implement each TODO without changing method signatures. */
public final class Practice {
    private Practice() {}

    /** Return true if n is prime. Values less than 2 are not prime. */
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int d = 2; d <= n / d; d++) if (n % d == 0) return false;
        return true;
    }

    /** Return the first index of target in sorted ascending values, or -1. */
    public static int binarySearchFirst(int[] values, int target) {
        int lo = 0, hi = values.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (values[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo < values.length && values[lo] == target ? lo : -1;
    }

    /** Return a reversed copy; do not modify input. */
    public static int[] reversed(int[] values) {
        int[] result = new int[values.length];
        for (int i = 0; i < values.length; i++) result[i] = values[values.length - 1 - i];
        return result;
    }

    /** Return number of distinct words, ignoring case and surrounding whitespace. */
    public static int countDistinctWords(List<String> words) {
        java.util.Set<String> unique = new java.util.HashSet<>();
        for (String word : words) unique.add(word.trim().toLowerCase(java.util.Locale.ROOT));
        return unique.size();
    }

    /** Return first n Fibonacci numbers, starting 0,1; reject negative n. */
    public static long[] fibonacci(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be nonnegative");
        long[] result = new long[n];
        if (n > 1) result[1] = 1;
        for (int i = 2; i < n; i++) result[i] = result[i-1] + result[i-2];
        return result;
    }

    /** Return minimum coins for amount or -1 if impossible. Positive denominations only. */
    public static int minCoins(int[] denominations, int amount) {
        if (amount < 0) throw new IllegalArgumentException("negative amount");
        int[] dp = new int[amount + 1];
        java.util.Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : denominations) {
            if (coin <= 0) throw new IllegalArgumentException("nonpositive coin");
            for (int a = coin; a <= amount; a++) dp[a] = Math.min(dp[a], dp[a-coin] + 1);
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    /** Return true if brackets ()[]{} are balanced; ignore other characters. */
    public static boolean balancedBrackets(String input) {
        java.util.ArrayDeque<Character> stack = new java.util.ArrayDeque<>();
        for (char c : input.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') stack.push(c);
            else if (c == ')' || c == ']' || c == '}') {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
            }
        }
        return stack.isEmpty();
    }

    /** Return frequency map for lowercase letters a-z; ignore all other characters. */
    public static Map<Character, Integer> letterCounts(String input) {
        java.util.Map<Character, Integer> counts = new java.util.HashMap<>();
        for (char c : input.toCharArray()) {
            if (c >= 'A' && c <= 'Z') c = (char)(c + ('a' - 'A'));
            if (c >= 'a' && c <= 'z') counts.merge(c, 1, Integer::sum);
        }
        return counts;
    }
}
