package com.example.taskmanager.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
}
