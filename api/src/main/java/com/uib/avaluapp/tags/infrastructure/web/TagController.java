package com.uib.avaluapp.tags.infrastructure.web;

import com.uib.avaluapp.auth.domain.services.JwtService;
import com.uib.avaluapp.global.insfrastructure.web.BaseController;
import com.uib.avaluapp.global.insfrastructure.web.config.HandleConfig;
import com.uib.avaluapp.global.insfrastructure.web.response.ApiResponse;
import com.uib.avaluapp.tags.domain.services.TagService;
import com.uib.avaluapp.tags.infrastructure.web.requests.CreateTagRequest;
import com.uib.avaluapp.tags.infrastructure.web.responses.CompleteTagDto;
import com.uib.avaluapp.tags.infrastructure.web.responses.TagDto;
import com.uib.avaluapp.user.domain.ports.UserPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController extends BaseController {
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService, JwtService jwtService, UserPort userPort) {
        super(jwtService, userPort);
        this.tagService = tagService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompleteTagDto>> getTagById(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        HandleConfig<CompleteTagDto> config = HandleConfig.<CompleteTagDto>builder()
                .authorization(authorization)
                .successMessage("Tag retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> tagService.getTagById(authorization, id))
                .build();

        return handle(config);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<ApiResponse<List<TagDto>>> getAllTags(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long projectId) {
        HandleConfig<List<TagDto>> config = HandleConfig.<List<TagDto>>builder()
                .authorization(authorization)
                .successMessage("Tags retrieved successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> tagService.getAllTags(authorization, projectId))
                .build();

        return handle(config);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CompleteTagDto>> createTag(
            @RequestHeader("Authorization") String authorization,
            @RequestBody CreateTagRequest request) {
        HandleConfig<CompleteTagDto> config = HandleConfig.<CompleteTagDto>builder()
                .authorization(authorization)
                .successMessage("Tag created successfully")
                .successStatus(HttpStatus.CREATED)
                .adminHandler(() -> tagService.createTag(authorization, request))
                .build();

        return handle(config);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CompleteTagDto>> updateTag(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id,
            @RequestBody CreateTagRequest request) {
        HandleConfig<CompleteTagDto> config = HandleConfig.<CompleteTagDto>builder()
                .authorization(authorization)
                .successMessage("Tag updated successfully")
                .successStatus(HttpStatus.OK)
                .adminHandler(() -> tagService.updateTag(authorization, id, request))
                .build();

        return handle(config);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTag(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        HandleConfig<Void> config = HandleConfig.<Void>builder()
                .authorization(authorization)
                .successMessage("Tag deleted successfully")
                .successStatus(HttpStatus.NO_CONTENT)
                .adminHandler(HandleConfig.from(() -> tagService.deleteTag(authorization, id)))
                .build();

        return handle(config);
    }
}
