// 08_Encapsulation — Java 17+
public class Encapsulation { static class Account { private int balance; void deposit(int amount){if(amount<=0)throw new IllegalArgumentException();balance+=amount;} int balance(){return balance;} } public static void main(String[] args){Account a=new Account();a.deposit(20);System.out.println(a.balance());} }
