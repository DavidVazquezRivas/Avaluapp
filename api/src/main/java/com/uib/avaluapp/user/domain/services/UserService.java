package com.uib.avaluapp.user.domain.services;

import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.UpdateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.VerifyUserRequest;

import java.util.List;

public interface UserService {
    User getSingleUser(String authorization);

    List<User> getAllUsers();

    User createUser(CreateUserRequest createUserRequest, String authorization);

    void deleteUser(Long id, String authorization);

    User updateUser(Long id, UpdateUserRequest updateUserRequest, String authorization);

    User verifyUser(VerifyUserRequest request, String authorizationHeader);
}
