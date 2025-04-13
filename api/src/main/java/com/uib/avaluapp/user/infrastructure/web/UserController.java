package com.uib.avaluapp.user.infrastructure.web;

import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.services.UserService;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.responses.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> getUsers() {
        return handle(() -> UserDtoMapper.INSTANCE.toDtoList(userService.getAllUsers()), "Users retrieved successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        return handle(() -> UserDtoMapper.INSTANCE.toDto(userService.getSingleUser(id)), "User retrieved successfully", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> createUser(@RequestBody CreateUserRequest createUserRequest) {
        return handle(() -> UserDtoMapper.INSTANCE.toDto(userService.createUser(createUserRequest)), "User created successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        return handle(() -> userService.deleteUser(id), "User deleted successfully", HttpStatus.NO_CONTENT);
    }
}