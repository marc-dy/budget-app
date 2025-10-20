package com.mdy.budget_app.exceptions;

public class IncomeException extends RuntimeException {
    public IncomeException(String message) {
        super(message);
    }

    public IncomeException(String message, Throwable cause) {
        super(message, cause);
    }

    public IncomeException(Throwable cause) {
        super(cause);
    }

    public IncomeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public IncomeException() {
    }
}
