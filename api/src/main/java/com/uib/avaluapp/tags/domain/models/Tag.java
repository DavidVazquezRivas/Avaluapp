package com.uib.avaluapp.tags.domain.models;

import com.uib.avaluapp.project.domain.models.Project;
import com.uib.avaluapp.questions.domain.models.Question;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Tag {
    private Long id;
    private String name;
    private String color;
    private Project project;
    private List<Question> questions;
}
