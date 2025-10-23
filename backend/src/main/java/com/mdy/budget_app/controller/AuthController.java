package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.dtos.LoginRequest;
import com.mdy.budget_app.domain.dtos.LoginResponse;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.mapper.UserMapper;
import com.mdy.budget_app.service.AuthService;
import com.mdy.budget_app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        String accessToken = authService.generateToken(userDetails);
        User loggedInUser = userService.getUser(loginRequest.getUsername());
        LoginResponse authResponse = LoginResponse.builder()
                .user(userMapper.toDto(loggedInUser))
                .token(accessToken)
                .expiresIn(86400)
                .build();
        return ResponseEntity.ok(authResponse);
    }
}
