package com.uib.avaluapp.user.infrastructure.data.adapters;

import com.uib.avaluapp.global.exceptions.BaseException;
import com.uib.avaluapp.global.exceptions.ExceptionCode;
import com.uib.avaluapp.user.domain.models.User;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import com.uib.avaluapp.user.infrastructure.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class UserAdapter implements UserPort {

    private UserRepository userRepository;

    @Autowired
    public UserAdapter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getSingleUser(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND));
        return UserEntityMapper.INSTANCE.toDomain(userEntity);
    }

    @Override
    public User getUserByUsername(String username) {
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND));
        return UserEntityMapper.INSTANCE.toDomain(userEntity);
    }

    @Override
    public List<User> getAllUsers() {
        Iterable<UserEntity> userEntities = userRepository.findAll();
        return StreamSupport.stream(userEntities.spliterator(), false)
                .map(UserEntityMapper.INSTANCE::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public User createUser(User user) {
        try {
            UserEntity entity = userRepository.save(UserEntityMapper.INSTANCE.toEntity(user));
            return UserEntityMapper.INSTANCE.toDomain(entity);
        } catch (Exception e) {
            throw new BaseException(ExceptionCode.USER_ALREADY_EXISTS);
        }
    }

    @Override
    public void deleteUser(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND));
        userRepository.delete(userEntity);
    }

    @Override
    public User updateUser(Long id, User user) {
        UserEntity existingUserEntity = userRepository.findById(id)
                .orElseThrow(() -> new BaseException(ExceptionCode.USER_NOT_FOUND));
        
        existingUserEntity.setUsername(user.getUsername());
        existingUserEntity.setEmail(user.getEmail());
        existingUserEntity.setRole(user.getRole());

        UserEntity updatedUserEntity = userRepository.save(existingUserEntity);
        return UserEntityMapper.INSTANCE.toDomain(updatedUserEntity);
    }
}
