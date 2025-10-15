package com.mdy.budget_app.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String receivedFrom;
    @Column(nullable = false)
    private BigDecimal amount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;
    @Column(nullable = false)
    private LocalDate date;
    @Column(length = 200)
    private String comments;

    public Income(String receivedFrom, BigDecimal amount, Category category, Account account, LocalDate date, String comments) {
        this.receivedFrom = receivedFrom;
        this.amount = amount;
        this.category = category;
        this.account = account;
        this.date = date;
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Income income = (Income) o;
        return Objects.equals(id, income.id) && Objects.equals(receivedFrom, income.receivedFrom) && Objects.equals(amount, income.amount) && Objects.equals(category, income.category) && Objects.equals(account, income.account) && Objects.equals(date, income.date) && Objects.equals(comments, income.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, receivedFrom, amount, category, account, date, comments);
    }
}
