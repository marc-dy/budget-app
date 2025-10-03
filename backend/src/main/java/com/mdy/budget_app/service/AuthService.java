package com.mdy.budget_app.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;
    private final String secretKey;

    // TODO: Don't keep secretKey in application.properties
    public AuthService(AuthenticationManager authManager,
                       UserDetailsService userDetailsService,
                       @Value("${jwt.secret}") String secretKey) {
        this.authManager = authManager;
        this.userDetailsService = userDetailsService;
        this.secretKey = secretKey;
    }

    public UserDetails authenticate(String username, String password) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        return userDetailsService.loadUserByUsername(username);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        long jwtExpiryMs = 86400000L;
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiryMs))
                .signWith(getSigningKey())
                .compact();
    }

    public UserDetails validateToken(String token) {
        String username = extractUsername(token);
        return userDetailsService.loadUserByUsername(username);
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String extractUsername(String token) {
        Jws<Claims> parsed = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
        return parsed.getPayload().getSubject();
    }
}
