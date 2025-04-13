package com.uib.avaluapp.auth.domain.services;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

public interface JwtService {
    public String extractUsername(String token);

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    public String generateAccessToken(UserDetails userDetails);

    public String generateRefreshToken(UserDetails userDetails);

    public boolean validateToken(String token);

    public boolean validateToken(String token, UserDetails userDetails);

}
