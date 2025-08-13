package com.mdy.budget_app.service;

import com.mdy.budget_app.entity.Account;
import com.mdy.budget_app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;

    public List<Account> getAll() {
        return repo.findAll();
    }

    public Account save(Account account) {
        return repo.save(account);
    }

    public Account getAccount(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException(("Account not found")));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
