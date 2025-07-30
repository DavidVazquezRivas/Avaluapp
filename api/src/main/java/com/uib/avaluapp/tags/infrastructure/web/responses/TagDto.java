package com.uib.avaluapp.tags.infrastructure.web.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TagDto {
    private Long id;
    private String name;
    private String color;
}
