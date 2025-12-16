package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.security.JwtUtil;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    // Method to extract user from JWT
    private User getUserFromToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) return null;

        String token = header.substring(7);
        String email =  jwtUtil.extractUsername(token);
        return userService.findByEmail(email);
    }

    //--------------------------------------------
    // CREATE TASK
    //--------------------------------------------
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task,
                                        @RequestHeader("Authorization") String authHeader) {

        User user = getUserFromToken(authHeader);
        if (user == null) return ResponseEntity.status(401).body("Invalid Token");

        return ResponseEntity.ok(taskService.createTask(task, user));
    }

    //--------------------------------------------
    // GET ALL TASKS OF LOGGED-IN USER
    //--------------------------------------------
    @GetMapping
    public ResponseEntity<?> getTasks(@RequestHeader("Authorization") String authHeader) {

        User user = getUserFromToken(authHeader);
        if (user == null) return ResponseEntity.status(401).body("Invalid Token");

        List<Task> tasks = taskService.getUserTasks(user);
        return ResponseEntity.ok(tasks);
    }


    //--------------------------------------------
    // GET SINGLE TASK BY ID
    //--------------------------------------------



    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id,
                                        @RequestHeader("Authorization") String authHeader) {

        User user = getUserFromToken(authHeader);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid Token");
        }

        Task task = taskService.getTaskById(id, user);

        if (task == null) {
            return ResponseEntity.status(404).body("Task not found");
        }

        return ResponseEntity.ok(task);
    }


    //--------------------------------------------
    // UPDATE TASK
    //--------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,
                                        @RequestBody Task task,
                                        @RequestHeader("Authorization") String authHeader) {

        User user = getUserFromToken(authHeader);
        if (user == null) return ResponseEntity.status(401).body("Invalid Token");

        Task updated = taskService.updateTask(id, task, user);
        if (updated == null) return ResponseEntity.status(404).body("Task not found");

        return ResponseEntity.ok(updated);
    }

    //--------------------------------------------
    // DELETE TASK
    //--------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
    
        User user = getUserFromToken(authHeader);
        if (user == null) return ResponseEntity.status(401).build();
    
        boolean deleted = taskService.deleteTask(id, user);
        if (!deleted) return ResponseEntity.notFound().build();
    
        return ResponseEntity.noContent().build(); // ⭐ FIX
    }
    
}
