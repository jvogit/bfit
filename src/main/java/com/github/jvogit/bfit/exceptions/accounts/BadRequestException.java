package com.github.jvogit.bfit.exceptions.accounts;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
