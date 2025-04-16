package com.uib.avaluapp.auth.domain.services;

import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AccessTokenResponse;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return AuthResponse
                    .builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (Exception e) {
            throw new BaseException(ExceptionCode.INVALID_CREDENTIALS);
        }

    }

    @Override
    public AccessTokenResponse refreshToken(String token) {

        if (token == null || token.isEmpty() || !jwtService.validateToken(token)) {
            throw new BaseException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtService.validateToken(token, userDetails)) {
            throw new BaseException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);
        return AccessTokenResponse
                .builder()
                .accessToken(newAccessToken)
                .build();
    }
}
