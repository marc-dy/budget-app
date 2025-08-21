package com.mdy.budget_app.controller;

import com.mdy.budget_app.dto.IncomeDto;
import com.mdy.budget_app.dto.IncomeResponseDto;
import com.mdy.budget_app.service.IncomeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public List<IncomeResponseDto> getAllIncomes() {
        return incomeService.getAll();
    }

    @GetMapping("/{id}")
    public IncomeResponseDto getIncomeById(@PathVariable Long id) {
        return incomeService.getIncome(id);
    }

    @PostMapping
    public ResponseEntity<IncomeResponseDto> createIncome(@Valid @RequestBody IncomeDto incomeDto) {
        return new ResponseEntity<>(incomeService.save(incomeDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncomeResponseDto> updateIncome(@PathVariable Long id,
                                                          @Valid @RequestBody IncomeDto incomeDto) {
        return new ResponseEntity<>(incomeService.update(id, incomeDto), HttpStatus.OK);
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
