
/**
 * Created by Aboo on 6/13/16.
 */
 import java.util.Scanner;

public class Test1{

    /**
     * This method reverses a string
     * Eg:- the reverse of Hello is olleH
     * @param str
     * @return the reversed string
     */
    public String reverse(String str){
        String s="";
        for(int i=str.length();i>0;i--)
        {
            s=s+str.substring(i-1,i);
        }
        return s;
    }

    /**
     * In the english language the letters a, e, i, o, u are known as vowels
     * This method removes all the vowels from the string passed as parameter and returns the processed string
     * Eg if the string is Hello the return string should be Hll
     * @param str
     * @return the string without vowels
     */
    public String removeVowels(String str){
        String s="";
        for(int i=0;i<str.length();i++)
        {
            String ext=str.substring(i,i+1);
            if(!ext.equalsIgnoreCase("a") && !ext.equalsIgnoreCase("e") &&
                    !ext.equalsIgnoreCase("i") && !ext.equalsIgnoreCase("o") && !ext.equalsIgnoreCase("u") )
                s=s+ext;
        }
        return s;
    }

    public static void main(String[] args) {
        Test1 t1=new Test1();
        Scanner sc=new Scanner(System.in);
        String ip=sc.nextLine();
        System.out.println(t1.reverse(ip));
        //System.out.println(t1.removeVowels("HAll00Oo"));
    }
}
