package com.mdy.budget_app.service;

import com.mdy.budget_app.dto.IncomeDto;
import com.mdy.budget_app.dto.IncomeResponseDto;
import com.mdy.budget_app.entity.Income;
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

    public List<IncomeResponseDto> getAll() {
        return incomeRepository.findAll().stream().map(income -> new IncomeResponseDto(
                income.getId(),
                income.getReceivedFrom(),
                income.getAmount(),
                new IncomeResponseDto.CategoryDto(income.getCategory().getId(), income.getCategory().getName()),
                new IncomeResponseDto.AccountDto(income.getAccount().getId(), income.getAccount().getName()),
                income.getDate(),
                income.getComments()
        )).toList();
    }

    public IncomeResponseDto getIncome(Long id) {
        Income income = incomeRepository.findById(id).orElseThrow(() -> new RuntimeException(("Income ID not found")));
        return mapper.toResponse(income);
    }

    public IncomeResponseDto save(IncomeDto incomeDto) {
        final Long categoryId = incomeDto.getCategoryId();
        final Long accountId = incomeDto.getAccountId();

        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Invalid categoryId: " + categoryId);
        }

        if (!accountRepository.existsById((accountId))) {
            throw new IllegalArgumentException("Invalid accountId: " + accountId);
        }
        Income savedIncome = incomeRepository.save(mapper.toEntity(incomeDto));
        return mapper.toResponse(savedIncome);
    }

    public IncomeResponseDto update(Long id, IncomeDto incomeDto) {
        final Long categoryId = incomeDto.getCategoryId();
        final Long accountId = incomeDto.getAccountId();
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Invalid categoryId: " + categoryId);
        }

        if (!accountRepository.existsById((accountId))) {
            throw new IllegalArgumentException("Invalid accountId: " + accountId);
        }
        Income income = incomeRepository.findById(id).orElseThrow(() -> new RuntimeException("Income ID " + id + " does " +
                "not exists"));

        mapper.updateEntityFromDto(income, incomeDto);
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
