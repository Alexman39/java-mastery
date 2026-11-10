// 14_Exceptions — Java 17+
public class ExceptionsExample { static int divide(int a,int b){if(b==0)throw new IllegalArgumentException("zero divisor");return a/b;}public static void main(String[] args){try{divide(4,0);}catch(IllegalArgumentException ex){System.out.println(ex.getMessage());}} }
