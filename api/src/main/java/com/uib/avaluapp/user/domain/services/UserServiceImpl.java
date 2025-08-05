package com.uib.avaluapp.user.domain.services;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.UpdateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.VerifyUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserPort userPort;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;

    @Override
    public User getSingleUser(String authorization) {
        String token = jwtService.getTokenFromHeader(authorization);
        String username = jwtService.extractUsername(token);
        User user = userPort.getUserByUsername(username);

        return userPort.getSingleUser(user.getId());
    }

    @Override
    public List<User> getAllUsers() {
        return userPort.getAllUsers();
    }

    @Override
    public User createUser(CreateUserRequest createUserRequest) {
        User user = User.builder()
                .username(createUserRequest.getUsername())
                .email(createUserRequest.getEmail())
                .role(createUserRequest.getRole())
                .password(encoder.encode(createUserRequest.getPassword()))
                .build();

        return userPort.createUser(user);
    }

    @Override
    public void deleteUser(Long id) {
        userPort.deleteUser(id);
    }

    @Override
    public User updateUser(Long id, UpdateUserRequest updateUserRequest) {
        User user = User.builder()
                .username(updateUserRequest.getUsername())
                .email(updateUserRequest.getEmail())
                .role(updateUserRequest.getRole())
                .build();

        return userPort.updateUser(id, user);
    }

    @Override
    public User verifyUser(VerifyUserRequest request, String authorizationHeader) {
        User user = this.getSingleUser(authorizationHeader);
        user.setVerified(true);
        user.setPassword(encoder.encode(request.getPassword()));

        return userPort.verifyUser(user);
    }
}
