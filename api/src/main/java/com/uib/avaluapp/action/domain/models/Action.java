package com.uib.avaluapp.action.domain.models;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Action {
    private long id;
    private Activity action;
    private EntityType entityType;
    private String entityName;
    private LocalDateTime timestamp;
}
