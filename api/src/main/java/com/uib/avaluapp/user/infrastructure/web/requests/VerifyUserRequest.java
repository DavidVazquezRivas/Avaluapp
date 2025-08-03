package com.uib.avaluapp.user.infrastructure.web.requests;

import lombok.Data;

@Data
public class VerifyUserRequest {
    private String password;
}
