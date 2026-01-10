package com.realshield.platform.exception;

public class InvalidOldPasswordException extends RuntimeException{
    public InvalidOldPasswordException(String message) {
        super(message);
    }
}
