package com.realshield.platform.exception;

public class OtpNotFoundException extends RuntimeException {
    public OtpNotFoundException(String message) {
        super("otp not found");
    }
}
