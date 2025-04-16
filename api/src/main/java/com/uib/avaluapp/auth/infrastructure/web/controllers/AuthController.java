package com.uib.avaluapp.auth.infrastructure.web.controllers;

import com.uib.avaluapp.auth.domain.services.AuthService;
import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AccessTokenResponse;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;
import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.ports.UserPort;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
public class AuthController extends BaseController {
    private final AuthService authService;
    @Value("${secure.http.enabled}")
    private boolean secure;
    @Value("${jwt.refresh.expiration}")
    private long cookieExpiration;

    public AuthController(AuthService authService, JwtService jwtService, UserPort userPort) {
        super(jwtService, userPort);
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AccessTokenResponse>> login(
            @RequestBody AuthRequest authRequest,
            HttpServletResponse response
    ) {
        try {
            AuthResponse authResponse = authService.login(authRequest);

            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", authResponse.getRefreshToken())
                    .httpOnly(true)
                    .secure(secure)
                    .path("/api/auth/refresh")
                    .maxAge(Duration.ofMillis(cookieExpiration))
                    .sameSite("Strict")
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

            return ResponseEntity.ok(
                    ApiResponse.<AccessTokenResponse>builder()
                            .message("Login successful")
                            .data(AccessTokenResponse.builder()
                                    .accessToken(authResponse.getAccessToken())
                                    .build())
                            .build()
            );
        } catch (BaseException e) {
            return ResponseEntity
                    .status(e.getCode())
                    .body(ApiResponse.<AccessTokenResponse>builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<AccessTokenResponse>builder()
                            .success(false)
                            .message("Unexpected error: " + e.getMessage())
                            .build());
        }

    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AccessTokenResponse>> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        return (handle(() -> authService.refreshToken(refreshToken), "Token refreshed successfully", HttpStatus.OK));
    }
}
