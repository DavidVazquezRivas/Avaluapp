package com.uib.avaluapp.auth.infrastructure.web.requests;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}
