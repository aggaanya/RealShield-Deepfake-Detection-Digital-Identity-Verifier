package com.realshield.platform.exception;

public class InvalidResetTokenException extends RuntimeException{
    public InvalidResetTokenException(String message) {
        super(message);
    }
}
