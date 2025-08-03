package com.uib.avaluapp.user.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.ports.UserPort;
import com.uib.avaluapp.user.domain.services.UserService;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.UpdateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.requests.VerifyUserRequest;
import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, UserPort userPort) {
        super(jwtService, userPort);
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> getUsers(
            @RequestHeader("Authorization") String authorizationHeader) {
        HandleConfig<List<UserDto>> config = HandleConfig.<List<UserDto>>builder()
                .authorization(authorizationHeader)
                .successMessage("Users retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> UserDtoMapper.INSTANCE.toDtoList(userService.getAllUsers()))
                .userHandler(() -> UserDtoMapper.INSTANCE.toSingletonDtoList(userService.getSingleUser(authorizationHeader)))
                .build();
        return handle(config);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> createUser(
            @RequestBody CreateUserRequest createUserRequest,
            @RequestHeader("Authorization") String authorizationHeader) {
        HandleConfig<UserDto> config = HandleConfig.<UserDto>builder()
                .authorization(authorizationHeader)
                .successMessage("User created successfully")
                .successStatus(HttpStatus.CREATED)
                .adminHandler(() -> UserDtoMapper.INSTANCE.toDto(userService.createUser(createUserRequest)))
                .build();
        return handle(config);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authorizationHeader) {
        HandleConfig<Void> config = HandleConfig.<Void>builder()
                .authorization(authorizationHeader)
                .successMessage("User deleted successfully")
                .successStatus(HttpStatus.NO_CONTENT)
                .adminHandler(HandleConfig.from(() -> userService.deleteUser(id)))
                .build();
        return handle(config);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest updateUserRequest,
            @RequestHeader("Authorization") String authorizationHeader) {
        HandleConfig<UserDto> config = HandleConfig.<UserDto>builder()
                .authorization(authorizationHeader)
                .successMessage("User updated successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> UserDtoMapper.INSTANCE.toDto(userService.updateUser(id, updateUserRequest)))
                .build();
        return handle(config);
    }

    @PutMapping("/verify")
    public ResponseEntity<ApiResponse<UserDto>> verifyUser(
            @RequestBody VerifyUserRequest verifyUserRequest,
            @RequestHeader("Authorization") String authorizationHeader) {
        HandleConfig<UserDto> config = HandleConfig.<UserDto>builder()
                .authorization(authorizationHeader)
                .successMessage("User verified successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> UserDtoMapper.INSTANCE.toDto(userService.verifyUser(verifyUserRequest, authorizationHeader)))
                .userHandler(() -> UserDtoMapper.INSTANCE.toDto(userService.verifyUser(verifyUserRequest, authorizationHeader)))
                .build();
        return handle(config);
    }
}