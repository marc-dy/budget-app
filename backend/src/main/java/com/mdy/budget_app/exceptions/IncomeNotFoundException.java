package com.mdy.budget_app.exceptions;

public class IncomeNotFoundException extends IncomeException {
    public IncomeNotFoundException(String message) {
        super(message);
    }

    public IncomeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public IncomeNotFoundException(Throwable cause) {
        super(cause);
    }

    public IncomeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public IncomeNotFoundException() {
    }
}
