package com.mdy.budget_app.controller;

import com.mdy.budget_app.domain.dtos.UserRequest;
import com.mdy.budget_app.domain.dtos.UserResponse;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.mapper.UserMapper;
import com.mdy.budget_app.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity<UserResponse> registerNewUser(@Valid @RequestBody UserRequest userRequest) {
        User user = userMapper.toEntity(userRequest);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userService.registerNewUserAccount(user);
        UserResponse userResponse = userMapper.toDto(createdUser);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }
}
