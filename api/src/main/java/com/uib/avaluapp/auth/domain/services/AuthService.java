package com.uib.avaluapp.auth.domain.services;

import com.uib.avaluapp.auth.infrastructure.web.requests.AuthRequest;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthDto;
import com.uib.avaluapp.auth.infrastructure.web.responses.AuthResponse;

public interface AuthService {
    AuthDto login(AuthRequest authRequest);

    AuthResponse refreshToken(String token);
}
