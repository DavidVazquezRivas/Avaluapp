package com.uib.avaluapp.user.infrastructure.web;

import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.user.domain.services.UserService;
import com.uib.avaluapp.user.infrastructure.web.requests.CreateUserRequest;
import com.uib.avaluapp.user.infrastructure.web.responses.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsers() {
        return handle(() -> userService.getAllUsers().stream().map(UserDTO::fromUser).collect(Collectors.toList()), "Users retrieved successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        return handle(() -> UserDTO.fromUser(userService.getSingleUser(id)), "User retrieved successfully", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody CreateUserRequest createUserRequest) {
        return handle(() -> UserDTO.fromUser(userService.createUser(createUserRequest)), "User created successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        return handle(() -> userService.deleteUser(id), "User deleted successfully", HttpStatus.NO_CONTENT);
    }
}