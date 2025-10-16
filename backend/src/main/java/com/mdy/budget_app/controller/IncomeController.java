package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.mapper.IncomeMapper;
import com.mdy.budget_app.service.IncomeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
@AllArgsConstructor
public class IncomeController {
    private final IncomeService incomeService;
    private final IncomeMapper incomeMapper;

    @GetMapping
    public List<IncomeResponse> getAllIncomes() {
        List<Income> incomeList = incomeService.getAll();
        return incomeList.stream().map(incomeMapper::toDto).toList();
    }

    @GetMapping("/{id}")
    public IncomeResponse getIncomeById(@PathVariable Long id) {
        Income income = incomeService.getIncome(id);
        return incomeMapper.toDto(income);
    }

    @PostMapping
    public ResponseEntity<IncomeResponse> createIncome(@Valid @RequestBody IncomeRequest incomeRequest) {
        Income income = incomeMapper.toEntity(incomeRequest);
        Income createdIncome = incomeService.save(income);
        IncomeResponse incomeResponse = incomeMapper.toDto(createdIncome);
        return new ResponseEntity<>(incomeResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncomeResponse> updateIncome(@PathVariable Long id,
                                                       @Valid @RequestBody IncomeRequest incomeRequest) {
        Income income = incomeService.getIncome(id);
        incomeMapper.updateIncomeFromDto(incomeRequest, income);
        Income updatedIncome = incomeService.save(income);
        IncomeResponse incomeResponse = incomeMapper.toDto(updatedIncome);
        return new ResponseEntity<>(incomeResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        boolean deleted = incomeService.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
