package com.realshield.platform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//we have created the separate service for email as Email logic is not same to service logic

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Email Verification OTP");
            message.setText(
                    "Your OTP for email verification is: " + otp +
                            "\n\nThis OTP is valid for 10 minutes."
            );
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email");
        }
    }


}
