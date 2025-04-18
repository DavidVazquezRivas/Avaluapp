package com.uib.avaluapp.auth.domain.services;

import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthDto;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.infrastructure.web.UserDtoMapper;
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
    private final UserPort userPort;

    @Override
    public AuthDto login(AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);
            String username = jwtService.extractUsername(accessToken);

            User user = userPort.getUserByUsername(username);

            return AuthDto
                    .builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(UserDtoMapper.INSTANCE.toDto(user))
                    .build();
        } catch (Exception e) {
            throw new BaseException(ExceptionCode.INVALID_CREDENTIALS);
        }

    }

    @Override
    public AuthResponse refreshToken(String token) {

        if (token == null || token.isEmpty() || !jwtService.validateToken(token)) {
            throw new BaseException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtService.validateToken(token, userDetails)) {
            throw new BaseException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);

        User user = userPort.getUserByUsername(username);
        return AuthResponse
                .builder()
                .accessToken(newAccessToken)
                .user(UserDtoMapper.INSTANCE.toDto(user))
                .build();
    }
}
