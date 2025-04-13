package com.uib.avaluapp.auth.domain.services;

import com.uib.avaluapp.auth.domain.models.CustomUserDetails;
import com.uib.avaluapp.user.domain.ports.UserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserPort userPort;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return new CustomUserDetails(userPort.getUserByUsername(username));
    }
}
