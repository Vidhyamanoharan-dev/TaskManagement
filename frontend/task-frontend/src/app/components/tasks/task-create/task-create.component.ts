import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './task-create.component.html'
})
export class TaskCreateComponent {
  title = '';
  description = '';
  completed = false;

  constructor(private taskService: TaskService, private router: Router) {}

  create() {
    const payload = { title: this.title, description: this.description, completed: this.completed };
    this.taskService.create(payload).subscribe({
      next: () => { alert('Task created'); this.router.navigate(['/tasks']); },
      error: (err) => { console.error(err); alert('Create failed'); }
    });
  }
}
