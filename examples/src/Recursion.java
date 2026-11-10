// 10_Recursion — Java 17+
public class Recursion { static long factorial(int n){if(n<0)throw new IllegalArgumentException();return n<=1?1:n*factorial(n-1);} public static void main(String[] args){System.out.println(factorial(5));} }
