package com.uib.avaluapp.user.infrastructure.web.responses;

import com.uib.avaluapp.user.domain.models.Role;
import com.uib.avaluapp.user.domain.models.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;

    public static UserDTO fromUser(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
