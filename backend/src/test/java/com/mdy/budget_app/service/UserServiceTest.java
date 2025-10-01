package com.mdy.budget_app.service;

import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @InjectMocks
    UserService userService;
    @Mock
    private UserRepository userRepository;

    @Test
    void test_registerNewUser_butUsernameAlreadyExists() {
        User user = new User();
        user.setUsername("test");
        when(userRepository.existsByUsernameIgnoreCase("test")).thenReturn(true);
        assertThrows(IllegalArgumentException.class, () -> userService.registerNewUserAccount(user));
    }

    @Test
    void test_registerNewUser_butEmailAlreadyExists() {
        User user = new User();
        user.setUsername("test");
        user.setEmail("test@test.com");
        when(userRepository.existsByUsernameIgnoreCase("test")).thenReturn(false);
        when(userRepository.existsByEmailIgnoreCase("test@test.com")).thenReturn(true);
        assertThrows(IllegalArgumentException.class, () -> userService.registerNewUserAccount(user));
    }

    @Test
    void test_registerNewUser_successful() {
        User user = new User();
        user.setUsername("test");
        user.setPassword("test");
        user.setFirstName("TestFName");
        user.setLastName("TestLName");
        user.setEmail("test@test.com");
        when(userRepository.existsByUsernameIgnoreCase("test")).thenReturn(false);
        when(userRepository.existsByEmailIgnoreCase("test@test.com")).thenReturn(false);
        when(userRepository.save(user)).thenReturn(user);
        User savedUser = userService.registerNewUserAccount(user);
        assertEquals(savedUser, user);
    }

    @Test
    void test_getUserDoesNotExists() {
        when(userRepository.findByUsername("user")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> userService.getUser("user"));
    }

    @Test
    void test_getUserDoesExists() {
        User testUser = new User();
        when(userRepository.findByUsername("user")).thenReturn(Optional.of(testUser));
        User returnedUser = userService.getUser("user");
        assertEquals(testUser, returnedUser);
    }
}
