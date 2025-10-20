package com.mdy.budget_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.exceptions.IncomeNotFoundException;
import com.mdy.budget_app.repository.UserRepository;
import com.mdy.budget_app.security.BudgetAppUserDetails;
import com.mdy.budget_app.service.AuthService;
import com.mdy.budget_app.service.IncomeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class IncomeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

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

    @Test
    void testGetIncomeById_IncomeExists() throws Exception {
        Income income = new Income(1L, "test1", BigDecimal.valueOf(10),
                new Category(2L, "Salary"),
                new Account(3L, "BPI"),
                LocalDate.of(1990, 1, 1),
                "test1's comment");

        when(incomeService.getIncome(1L)).thenReturn(income);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(get("/api/incomes/1").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("receivedFrom").value("test1"))
                .andExpect(jsonPath("amount").value(10))
                .andExpect(jsonPath("category.id").value(2))
                .andExpect(jsonPath("category.name").value("Salary"))
                .andExpect(jsonPath("account.id").value(3))
                .andExpect(jsonPath("account.name").value("BPI"))
                .andExpect(jsonPath("date").value("1990-01-01"))
                .andExpect(jsonPath("comments").value("test1's comment"));
    }

    @Test
    void testGetIncomeById_ThrowsErrorWhenIncomeDoesNotExists() throws Exception {
        when(incomeService.getIncome(2L)).thenThrow(new IncomeNotFoundException("Income not found"));
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(get("/api/incomes/2").header("Authorization", token))
                .andExpect(status().isNotFound());

    }

    @Test
    void testGetIncomeById_ThrowsErrorWhenInvalidId() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(get("/api/incomes/test").header("Authorization", token))
                .andExpect(status().isBadRequest());

    }

    @Test
    void testCreateIncome_InvalidJSONBody() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @NullAndEmptySource
    void testCreateIncome_InvalidReceivedFrom(String receivedFrom) throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                receivedFrom,
                BigDecimal.valueOf(1L),
                2L,
                3L,
                LocalDate.of(1990, 1, 1),
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateIncome_NegativeAmount() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(-1),
                2L,
                3L,
                LocalDate.of(1990, 1, 1),
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateIncome_NullAmount() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                null,
                2L,
                3L,
                LocalDate.of(1990, 1, 1),
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @NullSource
    @ValueSource(longs = {0, -1})
    void testCreateIncome_InvalidCategoryId(Long categoryId) throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(1),
                categoryId,
                3L,
                LocalDate.of(1990, 1, 1),
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @NullSource
    @ValueSource(longs = {0, -1})
    void testCreateIncome_InvalidAccountId(Long accountId) throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(1),
                2L,
                accountId,
                LocalDate.of(1990, 1, 1),
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateIncome_NullDate() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(1),
                2L,
                3L,
                null,
                "test");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateIncome_LongComment() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(1),
                2L,
                3L,
                LocalDate.of(1990, 1, 1),
                "This is a test comment. This is a test comment. This is a test comment. " +
                        "This is a test comment. This is a test comment. This is a test comment. " +
                        "This is a test comment. This is a test comment. This is a test comment. " +
                        "This is a test comment. This is a test comment. This is a test comment. " +
                        "1234567890123");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateIncome_successfullyCreated() throws Exception {
        Income createdIncome = new Income(
                1L,
                "Test",
                BigDecimal.valueOf(1),
                new Category(2L, "Savings"),
                new Account(3L, "BPI"),
                LocalDate.of(1990, 1, 1),
                "This is a test comment.");

        when(incomeService.save(any())).thenReturn(createdIncome);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        IncomeRequest incomeRequest = new IncomeRequest(
                "Test",
                BigDecimal.valueOf(1),
                2L,
                3L,
                LocalDate.of(1990, 1, 1),
                "This is a test comment.");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(post("/api/incomes").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("receivedFrom").value("Test"))
                .andExpect(jsonPath("amount").value(1))
                .andExpect(jsonPath("category.id").value(2))
                .andExpect(jsonPath("category.name").value("Savings"))
                .andExpect(jsonPath("account.id").value(3))
                .andExpect(jsonPath("account.name").value("BPI"))
                .andExpect(jsonPath("date").value("1990-01-01"))
                .andExpect(jsonPath("comments").value("This is a test comment."));
    }

    @Test
    void testUpdateIncome_successfullyUpdated() throws Exception {
        Income income = new Income(
                1L,
                "Test",
                BigDecimal.valueOf(1),
                new Category(2L, "Savings"),
                new Account(3L, "BPI"),
                LocalDate.of(1990, 1, 1),
                "This is a test comment.");

        when(incomeService.getIncome(1L)).thenReturn(income);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        IncomeRequest incomeRequest = new IncomeRequest(
                "Test2",
                BigDecimal.valueOf(1000),
                1L,
                1L,
                LocalDate.of(1992, 1, 1),
                "");
        Income updatedIncome = new Income(
                1L,
                "Test2",
                BigDecimal.valueOf(1000),
                new Category(1L, "Cash"),
                new Account(1L, "BDO"),
                LocalDate.of(1992, 1, 1),
                "");

        when(incomeService.save(any())).thenReturn(updatedIncome);

        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(put("/api/incomes/1").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("receivedFrom").value("Test2"))
                .andExpect(jsonPath("amount").value(1000))
                .andExpect(jsonPath("category.id").value(1))
                .andExpect(jsonPath("category.name").value("Cash"))
                .andExpect(jsonPath("account.id").value(1))
                .andExpect(jsonPath("account.name").value("BDO"))
                .andExpect(jsonPath("date").value("1992-01-01"))
                .andExpect(jsonPath("comments").value(""));
        verify(incomeService).save(
                argThat(i -> i.getReceivedFrom().equals("Test2")
                        && i.getAmount().equals(BigDecimal.valueOf(1000))
                        && i.getCategory().getId() == 1L
                        && i.getAccount().getId() == 1L
                        && i.getDate().equals(LocalDate.of(1992, 1, 1))
                        && i.getComments().isEmpty()
                )
        );
    }

    @Test
    void testUpdateIncome_ThrowsErrorWhenIncomeDoesNotExists() throws Exception {
        when(incomeService.getIncome(2L)).thenThrow(new IncomeNotFoundException("Income not found"));
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        IncomeRequest incomeRequest = new IncomeRequest(
                "Test2",
                BigDecimal.valueOf(1000),
                1L,
                1L,
                LocalDate.of(1992, 1, 1),
                "");
        String body = objectMapper.writeValueAsString(incomeRequest);
        mockMvc.perform(put("/api/incomes/2").header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isNotFound());

    }

    @Test
    void testUpdateIncome_ThrowsErrorWhenIncomeBodyIsEmpty() throws Exception {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(put("/api/incomes/2").header("Authorization", token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testDeleteIncomeSuccessful() throws Exception {
        when(incomeService.delete(2L)).thenReturn(true);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(delete("/api/incomes/2").header("Authorization", token))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteIncomeNotFound() throws Exception {
        when(incomeService.delete(2L)).thenReturn(false);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        mockMvc.perform(delete("/api/incomes/2").header("Authorization", token))
                .andExpect(status().isNotFound());
    }
}
