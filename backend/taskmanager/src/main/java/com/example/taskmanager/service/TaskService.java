package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    // CREATE TASK
    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    // GET ALL TASKS OF LOGGED-IN USER
    public List<Task> getUserTasks(User user) {
        return taskRepository.findByUser(user);
    }

    // GET A SINGLE TASK
    public Task getTaskById(Long id, User user) {
        return taskRepository.findByIdAndUser(id, user)
                .orElse(null); // ✅ now VALID
    }

    // UPDATE TASK
    public Task updateTask(Long id, Task updatedTask, User user) {
        Task existing = taskRepository.findByIdAndUser(id, user)
                .orElse(null);

        if (existing == null) return null;

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(existing);
    }

    // DELETE TASK
    public boolean deleteTask(Long id, User user) {
        Task task = taskRepository.findByIdAndUser(id, user)
                .orElse(null);

        if (task == null) return false;

        taskRepository.delete(task);
        return true;
    }
}
