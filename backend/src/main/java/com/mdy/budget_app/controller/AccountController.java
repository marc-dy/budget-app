package com.mdy.budget_app.controller;

import com.mdy.budget_app.entity.Account;
import com.mdy.budget_app.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private AccountService service;

    @GetMapping
    public List<Account> getAllAccounts() {
        return service.getAll();
    }

    @PostMapping
    public Account createCategory(@RequestBody Account account) {
        return service.save(account);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) {
        service.delete(id);
    }

}
