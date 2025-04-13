package com.uib.avaluapp.user.domain.services;

import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserPort userPort;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public UserServiceImpl(UserPort userPort, BCryptPasswordEncoder encoder) {
        this.userPort = userPort;
        this.encoder = encoder;
    }

    @Override
    public User getSingleUser(Long id) {
        // TODO check the user requesting is the same as the one in the token
        return userPort.getSingleUser(id);
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
}
