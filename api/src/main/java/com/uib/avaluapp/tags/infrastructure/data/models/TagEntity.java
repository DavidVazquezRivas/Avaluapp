package com.uib.avaluapp.tags.infrastructure.data.models;

import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import com.uib.avaluapp.questions.infrastructure.data.models.QuestionEntity;
import com.uib.avaluapp.surveys.infrastructure.data.models.SurveyEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class TagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "color", nullable = false)
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<SurveyEntity> surveys = new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    private List<QuestionEntity> questions = new ArrayList<>();

    public void addQuestion(QuestionEntity question) {
        question.getTags().add(this);
    }

    public void removeQuestion(QuestionEntity question) {
        question.getTags().remove(this);
    }
}
