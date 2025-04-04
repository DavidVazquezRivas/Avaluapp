package com.uib.avaluapp.user.domain.services;

import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;

import java.util.List;

public interface UserService {
    User getSingleUser(Long id);

    List<User> getAllUsers();

    User createUser(CreateUserRequest createUserRequest);

    void deleteUser(Long id);
}
