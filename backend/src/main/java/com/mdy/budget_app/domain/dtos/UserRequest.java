package com.mdy.budget_app.domain.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {
    @NotBlank
    @Size(min = 4, max = 12, message = "Username must be between {min} and {max} characters")
    private String username;
    @NotBlank
    @Size(min = 4, max = 12, message = "Password must be between {min} and {max} characters")
    private String password;
    @NotBlank
    @Size(min = 4, max = 12, message = "First name must be between {min} and {max} characters")
    private String firstName;
    private String lastName;
    @NotBlank
    @Email
    private String email;
}
