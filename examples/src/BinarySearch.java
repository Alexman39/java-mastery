// 11_BinarySearch — Java 17+
public class BinarySearch { static int find(int[] a,int target){int lo=0,hi=a.length-1;while(lo<=hi){int mid=lo+(hi-lo)/2;if(a[mid]==target)return mid;if(a[mid]<target)lo=mid+1;else hi=mid-1;}return -1;}public static void main(String[] args){System.out.println(find(new int[]{1,3,5,7},5));System.out.println(find(new int[]{1,3,5,7},6));} }
