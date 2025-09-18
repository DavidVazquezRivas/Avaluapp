package com.uib.avaluapp.user.domain.services;

import com.uib.avaluapp.action.domain.models.Action;
import com.uib.avaluapp.action.domain.models.Activity;
import com.uib.avaluapp.action.domain.models.EntityType;
import com.uib.avaluapp.action.domain.ports.ActionPort;
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
    private final ActionPort actionPort;

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
    public User createUser(CreateUserRequest createUserRequest, String authorization) {
        User user = User.builder()
                .username(createUserRequest.getUsername())
                .email(createUserRequest.getEmail())
                .role(createUserRequest.getRole())
                .password(encoder.encode(createUserRequest.getPassword()))
                .build();

        if (authorization != null) {
            User requester = this.getSingleUser(authorization);

            Action action = Action.builder()
                    .entityType(EntityType.USER)
                    .action(Activity.CREATED)
                    .entityName(user.getUsername())
                    .build();
            actionPort.logAction(requester.getId(), action);
            return userPort.createUser(user, requester.getId());
        } else {
            // For data initialization, set createdBy to null
            return userPort.createUser(user, null);
        }
    }

    @Override
    public void deleteUser(Long id, String authorization) {
        User requester = this.getSingleUser(authorization);
        User user = userPort.getSingleUser(id);

        userPort.deleteUser(id);

        Action action = Action.builder()
                .entityType(EntityType.USER)
                .action(Activity.DELETED)
                .entityName(user.getUsername())
                .build();
        actionPort.logAction(requester.getId(), action);
    }

    @Override
    public User updateUser(Long id, UpdateUserRequest updateUserRequest, String authorization) {
        User requester = this.getSingleUser(authorization);
        User user = User.builder()
                .username(updateUserRequest.getUsername())
                .email(updateUserRequest.getEmail())
                .role(updateUserRequest.getRole())
                .build();

        Action action = Action.builder()
                .entityType(EntityType.USER)
                .action(Activity.UPDATED)
                .entityName(user.getUsername())
                .build();
        actionPort.logAction(requester.getId(), action);

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
