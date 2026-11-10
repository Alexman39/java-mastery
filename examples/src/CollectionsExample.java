// 09_Collections — Java 17+
import java.util.*; public class CollectionsExample { public static void main(String[] args){Map<String,Integer> counts=new TreeMap<>();for(String s:List.of("a","b","a"))counts.merge(s,1,Integer::sum);System.out.println(counts);} }
