package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.security.BudgetAppUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    private final String secretKey = "test-secret-key-test-secret-key-test-secret-key";
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserDetailsService userDetailsService;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(authenticationManager, userDetailsService, secretKey);
    }

    @Test
    void test_generateToken_ContainsUsernameAndExpiration() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        BudgetAppUserDetails budgetAppUserDetails = new BudgetAppUserDetails(user);
        String result = authService.generateToken(budgetAppUserDetails);
        Jws<Claims> parsed = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(result);
        assertEquals("testuser", parsed.getPayload().getSubject());
        Date issuedAt = parsed.getPayload().getIssuedAt();
        Date expiry = parsed.getPayload().getExpiration();
        assertEquals(86400000L, expiry.getTime() - issuedAt.getTime());
    }

    @Test
    void test_validateToken_GetsTheValidUserDetails() {
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9" +
                ".eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTc1OTMwNjgwOCwiZXhwIjoxNzU5MzkzMjA4fQ.Ohqo6M_bcW-kF3qwCs1sXsDha4BHNUU_x8smpxNBqiM";
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        BudgetAppUserDetails budgetAppUserDetails = new BudgetAppUserDetails(user);
        when(userDetailsService.loadUserByUsername("testuser")).thenReturn(budgetAppUserDetails);
        UserDetails userDetails = authService.validateToken(jwtToken);
        assertEquals("testuser", userDetails.getUsername());
    }

}
