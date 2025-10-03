package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.repository.UserRepository;
import com.mdy.budget_app.security.BudgetAppUserDetails;
import com.mdy.budget_app.service.AccountService;
import com.mdy.budget_app.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    private String token;
    private User user;

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private UserRepository userRepository;

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
    void getAllAccount_returnsListOfAccount() throws Exception {
        List<Account> mockAccountList = List.of(
                new Account(1L, "BPI"),
                new Account(2L, "BDO")
        );

        when(accountService.getAll()).thenReturn(mockAccountList);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(get("/api/accounts").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(mockAccountList.size()))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("BPI"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("BDO"));


    }
}
