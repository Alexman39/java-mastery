package masty.practice;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public final class PracticeTest {
    private static int passed = 0;
    private static int failed = 0;
    private static int pending = 0;

    private static void test(String name, Runnable assertions) {
        try {
            assertions.run();
            passed++;
            System.out.println("PASS " + name);
        } catch (UnsupportedOperationException e) {
            pending++;
            System.out.println("TODO " + name + " — " + e.getMessage());
        } catch (Throwable e) {
            failed++;
            System.out.println("FAIL " + name + " — " + e);
        }
    }

    private static void eq(Object actual, Object expected) {
        if (!java.util.Objects.equals(actual, expected))
            throw new AssertionError("expected " + expected + ", got " + actual);
    }
    private static void arr(int[] actual, int... expected) {
        if (!Arrays.equals(actual, expected)) throw new AssertionError("expected " + Arrays.toString(expected) + ", got " + Arrays.toString(actual));
    }
    private static void arr(long[] actual, long... expected) {
        if (!Arrays.equals(actual, expected)) throw new AssertionError("expected " + Arrays.toString(expected) + ", got " + Arrays.toString(actual));
    }

    public static void main(String[] args) {
        test("prime: boundaries", () -> { eq(Practice.isPrime(-3), false); eq(Practice.isPrime(0), false); eq(Practice.isPrime(1), false); eq(Practice.isPrime(2), true); });
        test("prime: composite and large", () -> { eq(Practice.isPrime(97), true); eq(Practice.isPrime(100), false); eq(Practice.isPrime(121), false); });
        test("binary search: empty and missing", () -> { eq(Practice.binarySearchFirst(new int[]{}, 1), -1); eq(Practice.binarySearchFirst(new int[]{1,3,5}, 4), -1); });
        test("binary search: first duplicate", () -> { eq(Practice.binarySearchFirst(new int[]{1,2,2,2,4}, 2), 1); eq(Practice.binarySearchFirst(new int[]{7}, 7), 0); });
        test("reverse: empty and singleton", () -> { arr(Practice.reversed(new int[]{})); arr(Practice.reversed(new int[]{4}), 4); });
        test("reverse: nonmutation", () -> { int[] in = {1,2,3}; arr(Practice.reversed(in), 3,2,1); arr(in, 1,2,3); });
        test("distinct words: normalization", () -> eq(Practice.countDistinctWords(List.of(" Java ", "JAVA", "graph", " Graph ")), 2));
        test("distinct words: empty", () -> eq(Practice.countDistinctWords(List.of()), 0));
        test("fibonacci: boundaries", () -> { arr(Practice.fibonacci(0)); arr(Practice.fibonacci(1), 0); arr(Practice.fibonacci(2), 0,1); });
        test("fibonacci: sequence", () -> arr(Practice.fibonacci(8), 0,1,1,2,3,5,8,13));
        test("coin change: reachable", () -> { eq(Practice.minCoins(new int[]{1,3,4}, 6), 2); eq(Practice.minCoins(new int[]{2,5}, 0), 0); });
        test("coin change: impossible", () -> eq(Practice.minCoins(new int[]{4,6}, 7), -1));
        test("brackets: balanced", () -> { eq(Practice.balancedBrackets("a(b[c]{d})"), true); eq(Practice.balancedBrackets(""), true); });
        test("brackets: mismatch", () -> { eq(Practice.balancedBrackets("([)]"), false); eq(Practice.balancedBrackets("(("), false); });
        test("letters: normalization", () -> eq(Practice.letterCounts("Aab!Z"), Map.of('a',2,'b',1,'z',1)));
        test("letters: empty", () -> eq(Practice.letterCounts("123!?"), Map.of()));
        System.out.printf("%nRESULT: %d passed, %d failed, %d TODO%n", passed, failed, pending);
        if (failed > 0) System.exit(1);
        if (pending > 0 && Arrays.asList(args).contains("--require-complete")) System.exit(2);
    }
}
