package com.uib.avaluapp.auth.infrastructure.web.responses;

import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String accessToken;
    private UserDto user;
}
