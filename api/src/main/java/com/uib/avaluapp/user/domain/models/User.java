package com.uib.avaluapp.user.domain.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Role role;
}
