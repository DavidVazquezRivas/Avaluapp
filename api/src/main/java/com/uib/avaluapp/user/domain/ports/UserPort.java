package com.uib.avaluapp.user.domain.ports;

import com.uib.avaluapp.user.domain.models.User;

import java.util.List;

public interface UserPort {
    User getSingleUser(Long id);

    User getUserByUsername(String username);

    List<User> getAllUsers();

    User createUser(User user);

    void deleteUser(Long id);

    User updateUser(Long id, User user);
}
