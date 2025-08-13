package com.mdy.budget_app.repository;

import com.mdy.budget_app.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {
}
