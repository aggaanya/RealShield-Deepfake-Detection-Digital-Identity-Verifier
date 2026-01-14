package com.realshield.platform.utils;
import org.springframework.web.multipart.MultipartFile;
import java.security.MessageDigest;


//this is the class which convert any file into a unique hashcode

public class FileHashUtil {

    public static String generateSHA256(MultipartFile file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(file.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate file hash");
        }
    }
}
