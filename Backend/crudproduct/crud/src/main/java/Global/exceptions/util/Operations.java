package Global.exceptions.util;

public class Operations {
    public static String trimBracket(String str) {
        str = str.replace("[", "");
        str = str.replace("]", "");
        return str;
    }
}
