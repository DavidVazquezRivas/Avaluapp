package com.uib.avaluapp.auth.domain.services;

import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.requests.RefreshTokenRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);

    AuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
