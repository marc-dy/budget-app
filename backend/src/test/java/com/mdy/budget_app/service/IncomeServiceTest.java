package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.repository.AccountRepository;
import com.mdy.budget_app.repository.CategoryRepository;
import com.mdy.budget_app.repository.IncomeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class IncomeServiceTest {
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private IncomeRepository incomeRepository;
    private IncomeService incomeService;

    @BeforeEach
    void setUp() {
        incomeService = new IncomeService(incomeRepository, categoryRepository, accountRepository);
    }

    @Test
    void testGetIncome_found() {
        Category category = new Category("Test Category");
        category.setId(1L);

        Account account = new Account("Test Account");
        account.setId(2L);

        Income income = new Income("Person", BigDecimal.valueOf(1200), category, account,
                LocalDate.of(1990, 5, 20), "test comment");
        income.setId(3L);
        when(incomeRepository.findById(3L)).thenReturn(Optional.of(income));
        Income result = incomeService.getIncome(3L);
        assertEquals(3L, result.getId());
        assertEquals("Person", result.getReceivedFrom());
        assertEquals(BigDecimal.valueOf(1200), result.getAmount());
        assertEquals(LocalDate.of(1990, 5, 20), result.getDate());
        assertEquals(1L, result.getCategory().getId());
        assertEquals("Test Category", result.getCategory().getName());
        assertEquals(2L, result.getAccount().getId());
        assertEquals("Test Account", result.getAccount().getName());
        assertEquals("test comment", result.getComments());
    }

    @Test
    void testGetIncome_throwErrorIfNotFound() {
        when(incomeRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> incomeService.getIncome(1L));
    }

    @Test
    void testSaveIncome_throwErrorWhenCategoryDoesNotExist() {
        Income income = new Income("IncomeDtoTest", BigDecimal.valueOf(1),
                new Category(3L, "Savings"),
                new Account(),
                LocalDate.of(2000
                        , 1,
                        1),
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> incomeService.save(income));
    }

    @Test
    void testSaveIncome_throwErrorWhenAccountDoesNotExist() {
        Income income = new Income("IncomeDtoTest", BigDecimal.valueOf(1),
                new Category(3L, "Savings"),
                new Account(2L, "Cash"),
                LocalDate.of(2000
                        , 1,
                        1),
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> incomeService.save(income));
    }

    @Test
    void testSaveIncome_saveAndReturnResponseDto() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        Income income = new Income("IncomeDtoTest", BigDecimal.valueOf(1),
                new Category(3L, "Savings"),
                new Account(2L, "Cash"),
                LocalDate.of(2000
                        , 1,
                        1),
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(true);
        income.setId(1L);
        when(incomeRepository.save(any(Income.class))).thenReturn(income);

        Income result = incomeService.save(income);
        assertEquals(1L, result.getId());
        assertEquals("IncomeDtoTest", result.getReceivedFrom());
        assertEquals(BigDecimal.valueOf(1), result.getAmount());
        assertEquals(LocalDate.of(2000, 1, 1), result.getDate());
        assertEquals(3L, result.getCategory().getId());
        assertEquals("Savings", result.getCategory().getName());
        assertEquals(2L, result.getAccount().getId());
        assertEquals("Cash", result.getAccount().getName());
        assertEquals("test comment", result.getComments());
    }

    @Test
    void testGetAllIncome_EmptyList() {
        List<Income> incomeList = new ArrayList<>();
        when(incomeRepository.findAll()).thenReturn(incomeList);
        List<IncomeResponse> incomeResponseList = incomeService.getAll();
        assertEquals(0, incomeResponseList.size());
    }

    @Test
    void testGetAllIncome_nonEmpty() {
        Category category = new Category("Test Category");
        category.setId(1L);

        Account account = new Account("Test Account");
        account.setId(2L);

        Income income1 = new Income("A", BigDecimal.valueOf(1200), category, account,
                LocalDate.of(1990, 5, 20), "test comment");
        income1.setId(3L);

        Income income2 = new Income("B", BigDecimal.valueOf(1300), category, account,
                LocalDate.of(2000, 1, 1), "test comment2");
        income2.setId(4L);

        List<Income> incomeList = new ArrayList<>();
        incomeList.add(income1);
        incomeList.add(income2);

        when(incomeRepository.findAll()).thenReturn(incomeList);
        List<IncomeResponse> incomeResponseList = incomeService.getAll();

        assertEquals(2, incomeResponseList.size());
        assertEquals(3L, incomeResponseList.get(0).getId());
        assertEquals(4L, incomeResponseList.get(1).getId());
    }

    @Test
    void testDeleteIncome_IdDoesNotExists() {
        when(incomeRepository.existsById(1L)).thenReturn(false);
        assertFalse(incomeService.delete(1L));
    }

    @Test
    void testDeleteIncome_IdExistsAndDeleteSuccessfully() {
        when(incomeRepository.existsById(1L)).thenReturn(true);
        assertTrue(incomeService.delete(1L));
        verify(incomeRepository, times(1)).deleteById(eq(1L));
    }
}
