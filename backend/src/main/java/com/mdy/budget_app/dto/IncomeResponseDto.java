package com.mdy.budget_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Setter
public class IncomeResponseDto {
    private Long id;
    private String receivedFrom;
    private BigDecimal amount;
    private CategoryDto category;
    private AccountDto account;
    private LocalDate date;
    private String comments;

    @Getter
    @AllArgsConstructor
    public static class CategoryDto {
        private Long id;
        private String name;
    }

    @Getter
    @AllArgsConstructor
    public static class AccountDto {
        private Long id;
        private String name;
    }


}
