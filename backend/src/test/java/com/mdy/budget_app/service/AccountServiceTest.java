package com.mdy.budget_app.service;

import com.mdy.budget_app.entity.Account;
import com.mdy.budget_app.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    @Mock
    private AccountRepository repository;

    @InjectMocks
    private AccountService service;

    @Test
    void testGetAccount_found() {
        Account account = new Account("Cash");
        account.setId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(account));
        Account result = service.getAccount(1L);
        assertEquals("Cash", result.getName());
    }

    @Test
    void testGetAccount_notFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> service.getAccount(1L));
    }

    @Test
    void testGetAll_nonEmpty() {

        Account account1 = new Account("Cash");
        account1.setId(1L);
        Account account2 = new Account("BDO");
        account1.setId(2L);
        List<Account> accountList = new ArrayList<>();
        accountList.add(account1);
        accountList.add(account2);

        when(repository.findAll()).thenReturn(accountList);
        List<Account> resultList = service.getAll();
        assertEquals(resultList, accountList);
    }

    @Test
    void testGetAll_EmptyList() {
        List<Account> accountList = new ArrayList<>();

        when(repository.findAll()).thenReturn(accountList);
        List<Account> resultList = service.getAll();
        assertEquals(0, resultList.size());
    }

    // TODO: Test save and delete later
}
