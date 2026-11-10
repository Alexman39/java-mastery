// 13_DynamicProgramming — Java 17+
public class DynamicProgramming { static long fibonacci(int n){if(n<0)throw new IllegalArgumentException();if(n<2)return n;long a=0,b=1;for(int i=2;i<=n;i++){long next=Math.addExact(a,b);a=b;b=next;}return b;}public static void main(String[] args){System.out.println(fibonacci(10));} }
