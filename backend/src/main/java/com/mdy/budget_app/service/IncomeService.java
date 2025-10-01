package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.mapper.IncomeMapper;
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
    private final IncomeMapper mapper;

    public IncomeService(
            IncomeRepository incomeRepository,
            CategoryRepository categoryRepository,
            AccountRepository accountRepository,
            IncomeMapper mapper) {
        this.incomeRepository = incomeRepository;
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
        this.mapper = mapper;
    }

    public List<IncomeResponse> getAll() {
        return incomeRepository.findAll().stream().map(income -> new IncomeResponse(
                income.getId(),
                income.getReceivedFrom(),
                income.getAmount(),
                new IncomeResponse.CategoryDto(income.getCategory().getId(), income.getCategory().getName()),
                new IncomeResponse.AccountDto(income.getAccount().getId(), income.getAccount().getName()),
                income.getDate(),
                income.getComments()
        )).toList();
    }

    public IncomeResponse getIncome(Long id) {
        Income income = incomeRepository.findById(id).orElseThrow(() -> new RuntimeException(("Income ID not found")));
        return mapper.toResponse(income);
    }

    public IncomeResponse save(IncomeRequest incomeRequest) {
        final Long categoryId = incomeRequest.getCategoryId();
        final Long accountId = incomeRequest.getAccountId();

        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Invalid categoryId: " + categoryId);
        }

        if (!accountRepository.existsById((accountId))) {
            throw new IllegalArgumentException("Invalid accountId: " + accountId);
        }
        Income savedIncome = incomeRepository.save(mapper.toEntity(incomeRequest));
        return mapper.toResponse(savedIncome);
    }

    public IncomeResponse update(Long id, IncomeRequest incomeRequest) {
        final Long categoryId = incomeRequest.getCategoryId();
        final Long accountId = incomeRequest.getAccountId();
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Invalid categoryId: " + categoryId);
        }

        if (!accountRepository.existsById((accountId))) {
            throw new IllegalArgumentException("Invalid accountId: " + accountId);
        }
        Income income = incomeRepository.findById(id).orElseThrow(() -> new RuntimeException("Income ID " + id + " does " +
                "not exists"));

        mapper.updateEntityFromDto(income, incomeRequest);
        Income savedIncome = incomeRepository.save(income);
        return mapper.toResponse(savedIncome);
    }

    public boolean delete(Long id) {
        if (!incomeRepository.existsById(id)) {
            return false;
        }
        incomeRepository.deleteById(id);
        return true;
    }
}
