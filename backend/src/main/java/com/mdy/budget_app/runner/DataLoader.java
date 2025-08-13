package com.mdy.budget_app.runner;

import com.mdy.budget_app.entity.Account;
import com.mdy.budget_app.entity.Category;
import com.mdy.budget_app.repository.AccountRepository;
import com.mdy.budget_app.repository.CategoryRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    public DataLoader(CategoryRepository categoryRepository, AccountRepository accountRepository) {
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;

    }

    @Override
    public void run(ApplicationArguments args) {
        String categoryName = "General Savings";
        boolean categoryExists = categoryRepository.existsByName(categoryName);
        if (!categoryExists) {
            Category category = new Category(categoryName);
            categoryRepository.save(category);
            System.out.println("Default category loaded on startup");
        }

        String accountName = "Cash";
        boolean accountExists = accountRepository.existsByName(accountName);
        if (!accountExists) {
            Account account = new Account("Cash");
            accountRepository.save(account);
            System.out.println("Default account loaded on startup");

        }

    }
}
