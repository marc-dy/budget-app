package com.mdy.budget_app.domain.dtos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IncomeRequest {
    @NotBlank
    @Size(max = 100)
    String receivedFrom;

    @NotNull
    @PositiveOrZero
    BigDecimal amount;

    @NotNull
    @Positive
    Long categoryId;

    @NotNull
    @Positive
    Long accountId;

    @NotNull
    LocalDate date;

    @Size(max = 300)
    String comments;
}
