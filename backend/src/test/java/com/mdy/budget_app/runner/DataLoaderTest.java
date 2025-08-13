package com.mdy.budget_app.runner;

import com.mdy.budget_app.repository.AccountRepository;
import com.mdy.budget_app.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.ApplicationArguments;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DataLoaderTest {
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private DataLoader dataLoader;

    @Test
    void testRun_createsCategoryAndAccountIfNotExists() throws Exception {
        ApplicationArguments mockArgs = Mockito.mock(ApplicationArguments.class);
        when(categoryRepository.existsByName("General Savings")).thenReturn(false);
        when(accountRepository.existsByName("Cash")).thenReturn(false);
        dataLoader.run(mockArgs);
        verify(accountRepository, times(1)).save(any());
        verify(categoryRepository, times(1)).save(any());
    }

    @Test
    void testRun_doesNotCreateCategoryAndAccountIfExists() throws Exception {
        ApplicationArguments mockArgs = Mockito.mock(ApplicationArguments.class);
        when(categoryRepository.existsByName("General Savings")).thenReturn(true);
        when(accountRepository.existsByName("Cash")).thenReturn(true);
        dataLoader.run(mockArgs);
        verify(accountRepository, times(0)).save(any());
        verify(categoryRepository, times(0)).save(any());
    }
}
