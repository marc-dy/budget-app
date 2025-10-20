package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.exceptions.IncomeNotFoundException;
import com.mdy.budget_app.repository.AccountRepository;
import com.mdy.budget_app.repository.CategoryRepository;
import com.mdy.budget_app.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    public IncomeService(
            IncomeRepository incomeRepository,
            CategoryRepository categoryRepository,
            AccountRepository accountRepository) {
        this.incomeRepository = incomeRepository;
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
    }

    public List<Income> getAll() {
        return incomeRepository.findAll();
    }

    public Income getIncome(Long id) {
        return incomeRepository.findById(id).orElseThrow(() -> new IncomeNotFoundException(("Income ID not found")));
    }

    public Income save(Income income) {
        final Long categoryId = income.getCategory().getId();
        final Long accountId = income.getAccount().getId();

        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Invalid categoryId: " + categoryId);
        }

        if (!accountRepository.existsById((accountId))) {
            throw new IllegalArgumentException("Invalid accountId: " + accountId);
        }
        return incomeRepository.save(income);
    }

    public boolean delete(Long id) {
        if (!incomeRepository.existsById(id)) {
            return false;
        }
        incomeRepository.deleteById(id);
        return true;
    }
}
