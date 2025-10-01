package com.mdy.budget_app.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse userResponse = (UserResponse) o;
        return Objects.equals(id, userResponse.id) && Objects.equals(username, userResponse.username) && Objects.equals(firstName, userResponse.firstName) && Objects.equals(lastName, userResponse.lastName) && Objects.equals(email, userResponse.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, firstName, lastName, email);
    }
}
