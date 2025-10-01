package com.mdy.budget_app.mapper;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class IncomeMapper {
    private void setIncomeValues(Income income, IncomeRequest incomeRequest) {
        Category category = new Category();
        category.setId(incomeRequest.getCategoryId());
        Account account = new Account();
        account.setId(incomeRequest.getAccountId());
        income.setReceivedFrom(incomeRequest.getReceivedFrom());
        income.setDate(incomeRequest.getDate());
        income.setAmount(incomeRequest.getAmount());
        income.setCategory(category);
        income.setAccount(account);
        income.setComments(incomeRequest.getComments());
    }

    public Income toEntity(@NotNull IncomeRequest incomeRequest) {
        Income income = new Income();
        setIncomeValues(income, incomeRequest);
        return income;
    }

    public void updateEntityFromDto(@NotNull Income income, @NotNull IncomeRequest incomeRequest) {
        setIncomeValues(income, incomeRequest);
    }

    public IncomeResponse toResponse(@NotNull Income income) {
        return new IncomeResponse(
                income.getId(),
                income.getReceivedFrom(),
                income.getAmount(),
                new IncomeResponse.CategoryDto(income.getCategory().getId(), income.getCategory().getName()),
                new IncomeResponse.AccountDto(income.getAccount().getId(), income.getAccount().getName()),
                income.getDate(),
                income.getComments());
    }
}
