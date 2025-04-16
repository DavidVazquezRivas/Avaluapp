package com.uib.avaluapp.auth.domain.services;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

public interface JwtService {
    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateAccessToken(UserDetails userDetails);

    String generateRefreshToken(UserDetails userDetails);

    boolean validateToken(String token);

    boolean validateToken(String token, UserDetails userDetails);

    String getTokenFromHeader(String authorizationHeader);
}
