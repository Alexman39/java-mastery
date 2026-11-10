// 07_References — Java 17+
public class References { static class Box { int value; Box(int value){this.value=value;} } public static void main(String[] args){Box a=new Box(2); Box b=a; b.value=9; System.out.println(a.value); b=new Box(5); System.out.println(a.value); } }
