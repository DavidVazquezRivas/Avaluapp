package com.uib.avaluapp.auth.infrastructure.web.requests;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
