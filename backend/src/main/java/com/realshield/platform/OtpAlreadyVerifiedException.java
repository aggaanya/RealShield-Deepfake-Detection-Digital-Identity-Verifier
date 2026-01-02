package com.realshield.platform;

public class OtpAlreadyVerifiedException extends RuntimeException {
    public OtpAlreadyVerifiedException(String message) {
        super(message);
    }
}
