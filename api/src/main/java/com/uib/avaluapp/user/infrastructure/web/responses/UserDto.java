package com.uib.avaluapp.user.infrastructure.web.responses;

import com.uib.avaluapp.user.domain.models.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private Boolean verified;
}
