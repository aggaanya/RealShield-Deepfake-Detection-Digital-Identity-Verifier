package com.realshield.platform.exception;

public class OtpAlreadyVerifiedException extends RuntimeException {
    public OtpAlreadyVerifiedException(String message) {
        super(message);
    }
}
