package com.mdy.budget_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdy.budget_app.domain.dtos.UserRequest;
import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void testRegisterNewUser_SuccessfullyCreated() throws Exception {
        UserRequest userRequest = UserRequest.builder()
                .username("johndoe")
                .password("jd123")
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@test.com")
                .build();
        String messageBody = objectMapper.writeValueAsString(userRequest);

        User user = User.builder()
                .id(1L)
                .username("johndoe")
                .password("hashencodedstring")
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@test.com")
                .build();
        when(userService.registerNewUserAccount(any())).thenReturn(user);
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(messageBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("username").value("johndoe"))
                .andExpect(jsonPath("firstName").value("John"))
                .andExpect(jsonPath("lastName").value("Doe"))
                .andExpect(jsonPath("email").value("john.doe@test.com"));
    }
}
