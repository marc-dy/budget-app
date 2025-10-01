package com.mdy.budget_app.security;

import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BudgetAppUserDetailsServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BudgetAppUserDetailsService budgetAppUserDetailsService;

    @Test
    void test_loadUserByUsername_UsernameExists() {
        String testUsername = "testuser";
        User testUser = new User(1L, "testuser", "testpass", "test", "test", "test@test.com",
                LocalDateTime.of(LocalDate.of(2000, 1, 1), LocalTime.of(1, 1)));
        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.of(testUser));
        BudgetAppUserDetails userDetails =
                (BudgetAppUserDetails) budgetAppUserDetailsService.loadUserByUsername(testUsername);
        assertEquals("testuser", userDetails.getUsername());
        assertEquals("testpass", userDetails.getPassword());
        assertEquals(1L, userDetails.getId());
        assertTrue(userDetails.isAccountNonExpired());
        assertTrue(userDetails.isAccountNonLocked());
        assertTrue(userDetails.isEnabled());
        assertTrue(userDetails.isCredentialsNonExpired());
        assertEquals("ROLE_USER", userDetails.getAuthorities().stream().toList().getFirst().getAuthority());
    }

    @Test
    void test_loadUserByUsername_UsernameDoesNotExists() {
        String testUsername = "testuser";
        when(userRepository.findByUsername(testUsername)).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class,
                () -> budgetAppUserDetailsService.loadUserByUsername(testUsername));
    }
}
