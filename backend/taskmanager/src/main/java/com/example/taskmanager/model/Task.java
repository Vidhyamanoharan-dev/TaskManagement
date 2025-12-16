package com.example.taskmanager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Builder.Default
    private boolean completed = false;  // ← FIXED

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
