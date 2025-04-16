package com.uib.avaluapp.auth.infrastructure.web.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccessTokenResponse {
    private String accessToken;
}
