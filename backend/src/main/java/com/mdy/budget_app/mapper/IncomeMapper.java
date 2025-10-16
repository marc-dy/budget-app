package com.mdy.budget_app.mapper;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IncomeMapper {
    @Mapping(source = "categoryId", target = "category")
    @Mapping(source = "accountId", target = "account")
    Income toEntity(IncomeRequest incomeRequest);

    @InheritConfiguration
    void updateIncomeFromDto(IncomeRequest incomeRequest, @MappingTarget Income income);

    IncomeResponse toDto(Income income);

    /*
     * TODO: Currently there is no standalone categoryDto class so there is not existing mapper
     *  Once it's created, remove this and just refer to that one using @Mapper(uses = {CategoryMapper.class}
     */
    default IncomeResponse.CategoryDto categoryToCategoryDto(Category category) {
        if (category == null) {
            return null;
        }

        IncomeResponse.CategoryDto categoryDto = new IncomeResponse.CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }

    default IncomeResponse.AccountDto accountToAccountDto(Account account) {
        if (account == null) {
            return null;
        }

        IncomeResponse.AccountDto accountDto = new IncomeResponse.AccountDto();
        accountDto.setId(account.getId());
        accountDto.setName(account.getName());
        return accountDto;
    }

    default Category categoryIdToCategory(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        Category category = new Category();
        category.setId(categoryId);
        return category;
    }

    default Account accouuntIdToAccount(Long accountId) {
        if (accountId == null) {
            return null;
        }
        Account account = new Account();
        account.setId(accountId);
        return account;
    }
}
