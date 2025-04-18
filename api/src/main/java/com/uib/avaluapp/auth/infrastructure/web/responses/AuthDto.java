package com.uib.avaluapp.auth.infrastructure.web.responses;

import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthDto {
    private String accessToken;
    private String refreshToken;
    private UserDto user;
}
