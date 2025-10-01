package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.dtos.IncomeRequest;
import com.mdy.budget_app.domain.dtos.IncomeResponse;
import com.mdy.budget_app.domain.entities.Account;
import com.mdy.budget_app.domain.entities.Category;
import com.mdy.budget_app.domain.entities.Income;
import com.mdy.budget_app.mapper.IncomeMapper;
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
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class IncomeServiceTest {
    private final IncomeMapper incomeMapper = new IncomeMapper();
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private IncomeRepository incomeRepository;
    private IncomeService service;

    @BeforeEach
    void setUp() {
        service = new IncomeService(incomeRepository, categoryRepository, accountRepository, incomeMapper);
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
        IncomeResponse result = service.getIncome(3L);
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
        assertThrows(RuntimeException.class, () -> service.getIncome(1L));
    }

    @Test
    void testSaveIncome_throwErrorWhenCategoryDoesNotExist() {
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, LocalDate.of(2000, 1, 1),
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> service.save(incomeRequest));
    }

    @Test
    void testSaveIncome_throwErrorWhenAccountDoesNotExist() {
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, LocalDate.of(2000, 1, 1),
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> service.save(incomeRequest));
    }

    @Test
    void testSaveIncome_saveAndReturnResponseDto() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, testDate,
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(true);

        Category category = new Category("Savings");
        category.setId(3L);

        Account account = new Account("Cash");
        account.setId(2L);
        Income savedIncome = new Income("IncomeDtoTest", BigDecimal.valueOf(1), category, account, testDate, "test " +
                "comments");
        savedIncome.setId(1L);
        when(incomeRepository.save(any(Income.class))).thenReturn(savedIncome);

        IncomeResponse result = service.save(incomeRequest);
        assertEquals(1L, result.getId());
        assertEquals("IncomeDtoTest", result.getReceivedFrom());
        assertEquals(BigDecimal.valueOf(1), result.getAmount());
        assertEquals(LocalDate.of(2000, 10, 10), result.getDate());
        assertEquals(3L, result.getCategory().getId());
        assertEquals("Savings", result.getCategory().getName());
        assertEquals(2L, result.getAccount().getId());
        assertEquals("Cash", result.getAccount().getName());
        assertEquals("test comments", result.getComments());
    }

    @Test
    void testGetAllIncome_EmptyList() {
        List<Income> incomeList = new ArrayList<>();
        when(incomeRepository.findAll()).thenReturn(incomeList);
        List<IncomeResponse> incomeResponseList = service.getAll();
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
        List<IncomeResponse> incomeResponseList = service.getAll();

        assertEquals(2, incomeResponseList.size());
        assertEquals(3L, incomeResponseList.get(0).getId());
        assertEquals(4L, incomeResponseList.get(1).getId());
    }

    @Test
    void testUpdateIncome_CategoryDoesNotExist() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, testDate,
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(false);
        assertThrows(RuntimeException.class, () -> service.update(1L, incomeRequest));
    }

    @Test
    void testUpdateIncome_AccountDoesNotExist() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, testDate,
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(false);
        assertThrows(RuntimeException.class, () -> service.update(1L, incomeRequest));
    }

    @Test
    void testUpdateIncome_IdDoesNotExist() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, testDate,
                "test comment");
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(true);
        when(incomeRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.update(1L, incomeRequest));
    }

    @Test
    void testUpdateIncome_SuccessfulUpdate() {
        LocalDate testDate = LocalDate.of(2000, 10, 10);
        IncomeRequest incomeRequest = new IncomeRequest("IncomeDtoTest", BigDecimal.valueOf(1), 3L, 2L, testDate,
                "test comment");

        Category category = new Category("Test Category 1");
        category.setId(1L);

        Category category3 = new Category("Test Category 3");
        category3.setId(3L);

        Account account2 = new Account("Test Account 2");
        account2.setId(2L);

        Account account4 = new Account("Test Account 4");
        account4.setId(4L);

        Income oldIncome = new Income("Old", BigDecimal.valueOf(1200), category, account4,
                LocalDate.of(1990, 5, 20), "test comment old");
        oldIncome.setId(1L);
        Income expectedUpdateIncome = new Income("IncomeDtoTest", BigDecimal.valueOf(1), category3, account2,
                testDate, "test comment");
        expectedUpdateIncome.setId((1L));
        when(categoryRepository.existsById(3L)).thenReturn(true);
        when(accountRepository.existsById(2L)).thenReturn(true);
        when(incomeRepository.findById(1L)).thenReturn(Optional.of(oldIncome));
        when(incomeRepository.save(
                        argThat(
                                i -> i.getId() == 1L
                                        && "IncomeDtoTest".equals(i.getReceivedFrom())
                                        && i.getAmount().compareTo(BigDecimal.valueOf(1)) == 0
                                        && i.getCategory().getId() == 3L
                                        && i.getAccount().getId() == 2L
                                        && i.getDate().equals(testDate)
                                        && "test comment".equals(i.getComments())
                        )
                )
        ).thenReturn(expectedUpdateIncome);
        IncomeResponse result = service.update(1L, incomeRequest);
        assertEquals(1L, result.getId());
        assertEquals("IncomeDtoTest", result.getReceivedFrom());
        assertEquals(BigDecimal.valueOf(1), result.getAmount());
        assertEquals(LocalDate.of(2000, 10, 10), result.getDate());
        assertEquals(3L, result.getCategory().getId());
        assertEquals("Test Category 3", result.getCategory().getName());
        assertEquals(2L, result.getAccount().getId());
        assertEquals("Test Account 2", result.getAccount().getName());
        assertEquals("test comment", result.getComments());
    }

    @Test
    void testDeleteIncome_IdDoesNotExists() {
        when(incomeRepository.existsById(1L)).thenReturn(false);
        assertFalse(service.delete(1L));
    }

    @Test
    void testDeleteIncome_IdExistsAndDeleteSuccessfully() {
        when(incomeRepository.existsById(1L)).thenReturn(true);
        assertTrue(service.delete(1L));
        verify(incomeRepository, times(1)).deleteById(eq(1L));
    }
}
