package com.uib.avaluapp.surveys.infrastructure.data.models;

import com.uib.avaluapp.project.infrastructure.data.models.ProjectEntity;
import com.uib.avaluapp.surveys.domain.models.SurveyStatus;
import com.uib.avaluapp.tags.infrastructure.data.models.TagEntity;
import com.uib.avaluapp.user.infrastructure.data.models.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "survey")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class SurveyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "url_code", nullable = false, unique = true, updatable = false)
    private String urlCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SurveyStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private UserEntity lead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id", nullable = false)
    private TagEntity tag;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = SurveyStatus.PENDING;
        if (this.urlCode == null || this.urlCode.isEmpty()) {
            this.urlCode = UUID.randomUUID().toString();
        }
    }
}
