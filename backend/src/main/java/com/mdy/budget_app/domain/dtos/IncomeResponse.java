package com.mdy.budget_app.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IncomeResponse {
    private Long id;
    private String receivedFrom;
    private BigDecimal amount;
    private CategoryDto category;
    private AccountDto account;
    private LocalDate date;
    private String comments;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryDto {
        private Long id;
        private String name;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AccountDto {
        private Long id;
        private String name;
    }


}
