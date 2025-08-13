package com.mdy.budget_app.dto;

import jakarta.validation.constraints.*;
import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

@Value
public class IncomeDto {
    @NotBlank(message = "Received From is required")
    @Size(max = 100, message = "Received from cannot exceed 200 characters")
    String receivedFrom;

    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Amount must be greater than or equal to 0.")
    BigDecimal amount;

    @NotNull(message = "Category is required")
    @Positive(message = "Category ID must be a positive number")
    Long categoryId;

    @NotNull(message = "Account is required")
    @Positive(message = "Account ID must be a positive number")
    Long accountId;

    @NotNull
    LocalDate date;

    @Size(max = 500, message = "Comment cannot exceed 500 characters")
    String comments;
}
