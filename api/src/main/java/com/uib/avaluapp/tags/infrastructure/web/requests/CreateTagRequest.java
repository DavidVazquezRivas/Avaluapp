package com.uib.avaluapp.tags.infrastructure.web.requests;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateTagRequest {
    private String name;
    private String color;
    private Long projectId;
    private List<Long> questionIds;
}
