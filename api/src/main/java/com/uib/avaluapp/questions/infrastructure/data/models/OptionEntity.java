package com.uib.avaluapp.questions.infrastructure.data.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "option")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class OptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @Column(name = "correct")
    private boolean correct;
}
