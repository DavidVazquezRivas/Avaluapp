package com.uib.avaluapp.auth.infrastructure.web.controllers;

import com.uib.avaluapp.auth.domain.services.AuthService;
import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.requests.RefreshTokenRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController extends BaseController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest authRequest) {
        return (handle(() -> authService.login(authRequest), "Login successful", HttpStatus.OK));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return (handle(() -> authService.refreshToken(refreshTokenRequest), "Token refreshed successfully", HttpStatus.OK));
    }
}
