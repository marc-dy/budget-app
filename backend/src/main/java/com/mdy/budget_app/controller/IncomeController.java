package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
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
    public List<IncomeResponse> getAllIncomes() {
        return incomeService.getAll();
    }

    @GetMapping("/{id}")
    public IncomeResponse getIncomeById(@PathVariable Long id) {
        return incomeService.getIncome(id);
    }

    @PostMapping
    public ResponseEntity<IncomeResponse> createIncome(@Valid @RequestBody IncomeRequest incomeRequest) {
        return new ResponseEntity<>(incomeService.save(incomeRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IncomeResponse> updateIncome(@PathVariable Long id,
                                                       @Valid @RequestBody IncomeRequest incomeRequest) {
        return new ResponseEntity<>(incomeService.update(id, incomeRequest), HttpStatus.OK);
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
