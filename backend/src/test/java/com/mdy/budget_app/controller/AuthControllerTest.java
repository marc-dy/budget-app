package com.mdy.budget_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdy.budget_app.domain.dtos.LoginRequest;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.security.BudgetAppUserDetails;
import com.mdy.budget_app.service.AuthService;
import com.mdy.budget_app.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private UserService userService;

    @Test
    void testLoginSuccessful() throws Exception {
        LoginRequest loginRequest = LoginRequest.builder()
                .username("johndoe")
                .password("jd123")
                .build();
        User user = User.builder()
                .username("johndoe")
                .password("jd123")
                .firstName("John")
                .lastName("Doe")
                .email("johndoe@test.com")
                .id(1L)
                .build();
        BudgetAppUserDetails userDetails = new BudgetAppUserDetails(user);
        when(authService.authenticate("johndoe", "jd123")).thenReturn(userDetails);
        when(authService.generateToken(any())).thenReturn("testToken");
        when(userService.getUser("johndoe")).thenReturn(user);
        String loginBody = objectMapper.writeValueAsString(loginRequest);
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("user.id").value(1))
                .andExpect(jsonPath("user.username").value("johndoe"))
                .andExpect(jsonPath("user.email").value("johndoe@test.com"))
                .andExpect(jsonPath("user.firstName").value("John"))
                .andExpect(jsonPath("user.lastName").value("Doe"))
                .andExpect(jsonPath("token").value("testToken"))
                .andExpect(jsonPath("expiresIn").value(86400));
    }

    @Test
    void testLoginIncorrectCredentials() throws Exception {
        LoginRequest loginRequest = LoginRequest.builder()
                .username("johndoe")
                .password("jd123")
                .build();
        String loginBody = objectMapper.writeValueAsString(loginRequest);
        when(authService.authenticate("johndoe", "jd123")).thenThrow(new BadCredentialsException("Invalid " +
                "credentials"));
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testLogin_UsernameNotFound() throws Exception {
        LoginRequest loginRequest = LoginRequest.builder()
                .username("johndoe")
                .password("jd123")
                .build();
        String loginBody = objectMapper.writeValueAsString(loginRequest);
        when(authService.authenticate("johndoe", "jd123")).thenThrow(new UsernameNotFoundException("Username " +
                "not found"));
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isUnauthorized());
    }
}
