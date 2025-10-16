package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.repository.UserRepository;
import com.mdy.budget_app.security.BudgetAppUserDetails;
import com.mdy.budget_app.service.AuthService;
import com.mdy.budget_app.service.IncomeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class IncomeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    private String token;
    private User user;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private IncomeService incomeService;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("testpass");
        BudgetAppUserDetails budgetAppUserDetails = new BudgetAppUserDetails(user);
        token = "Bearer " + authService.generateToken(budgetAppUserDetails);
    }

    @Test
    void testGetAllIncome_returnsListOfIncome() throws Exception {
        List<Income> incomeList = List.of(
                new Income(1L, "test1", BigDecimal.valueOf(10),
                        new Category(2L, "Salary"),
                        new Account(3L, "BPI"),
                        LocalDate.of(1990, 1, 1),
                        "test1's comment"),
                new Income(2L, "test2", BigDecimal.valueOf(20),
                        new Category(3L, "Gift"),
                        new Account(4L, "BDO"),
                        LocalDate.of(1992, 2, 2),
                        "test2's comment")
        );
        when(incomeService.getAll()).thenReturn(incomeList);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(get("/api/incomes").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(incomeList.size()))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].receivedFrom").value("test1"))
                .andExpect(jsonPath("$[0].amount").value(10))
                .andExpect(jsonPath("$[0].category.id").value(2))
                .andExpect(jsonPath("$[0].category.name").value("Salary"))
                .andExpect(jsonPath("$[0].account.id").value(3))
                .andExpect(jsonPath("$[0].account.name").value("BPI"))
                .andExpect(jsonPath("$[0].date").value("1990-01-01"))
                .andExpect(jsonPath("$[0].comments").value("test1's comment"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].receivedFrom").value("test2"))
                .andExpect(jsonPath("$[1].amount").value(20))
                .andExpect(jsonPath("$[1].category.id").value(3))
                .andExpect(jsonPath("$[1].category.name").value("Gift"))
                .andExpect(jsonPath("$[1].account.id").value(4))
                .andExpect(jsonPath("$[1].account.name").value("BDO"))
                .andExpect(jsonPath("$[1].date").value("1992-02-02"))
                .andExpect(jsonPath("$[1].comments").value("test2's comment"));
    }
}
