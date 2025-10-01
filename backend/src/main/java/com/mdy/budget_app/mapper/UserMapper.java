package com.mdy.budget_app.mapper;

import com.mdy.budget_app.domain.dtos.UserRequest;
import com.mdy.budget_app.domain.dtos.UserResponse;
import com.mdy.budget_app.domain.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserResponse toDto(User user);

    User toEntity(UserRequest userRequest);
}
