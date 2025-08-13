package com.mdy.budget_app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
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
}
