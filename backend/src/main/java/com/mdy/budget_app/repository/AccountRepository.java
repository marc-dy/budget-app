package com.mdy.budget_app.repository;

import com.mdy.budget_app.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByName(String name);
}
