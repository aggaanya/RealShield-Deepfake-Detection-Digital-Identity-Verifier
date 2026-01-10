package com.realshield.platform.exception;

public class PasswordReuseException extends RuntimeException{
    public PasswordReuseException(String message) {
        super(message);
    }
}
