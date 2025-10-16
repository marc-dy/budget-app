package com.mdy.budget_app.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;


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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        IncomeResponse that = (IncomeResponse) o;
        return Objects.equals(id, that.id) && Objects.equals(receivedFrom, that.receivedFrom) && Objects.equals(amount, that.amount) && Objects.equals(category, that.category) && Objects.equals(account, that.account) && Objects.equals(date, that.date) && Objects.equals(comments, that.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, receivedFrom, amount, category, account, date, comments);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryDto {
        private Long id;
        private String name;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AccountDto {
        private Long id;
        private String name;
    }


}
