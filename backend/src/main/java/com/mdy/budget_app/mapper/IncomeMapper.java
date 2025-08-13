package com.mdy.budget_app.mapper;

import com.mdy.budget_app.dto.IncomeDto;
import com.mdy.budget_app.dto.IncomeResponseDto;
import com.mdy.budget_app.entity.Account;
import com.mdy.budget_app.entity.Category;
import com.mdy.budget_app.entity.Income;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class IncomeMapper {
    public Income toEntity(@NotNull IncomeDto incomeDto) {
        Category category = new Category();
        category.setId(incomeDto.getCategoryId());
        Account account = new Account();
        account.setId(incomeDto.getAccountId());
        Income income = new Income();
        income.setReceivedFrom(incomeDto.getReceivedFrom());
        income.setDate(incomeDto.getDate());
        income.setAmount(incomeDto.getAmount());
        income.setCategory(category);
        income.setAccount(account);
        income.setComments(incomeDto.getComments());
        return income;
    }

    public IncomeResponseDto toResponse(@NotNull Income income) {
        return new IncomeResponseDto(
                income.getId(),
                income.getReceivedFrom(),
                income.getAmount(),
                new IncomeResponseDto.CategoryDto(income.getCategory().getId(), income.getCategory().getName()),
                new IncomeResponseDto.AccountDto(income.getAccount().getId(), income.getAccount().getName()),
                income.getDate(),
                income.getComments());
    }
}
