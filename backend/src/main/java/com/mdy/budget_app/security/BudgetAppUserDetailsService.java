package com.mdy.budget_app.security;

import com.mdy.budget_app.domain.entities.User;
import com.mdy.budget_app.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BudgetAppUserDetailsService implements UserDetailsService {
    private final UserRepository repository;

    public BudgetAppUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not " +
                "found: " + username));
        return new BudgetAppUserDetails(user);
    }
}
