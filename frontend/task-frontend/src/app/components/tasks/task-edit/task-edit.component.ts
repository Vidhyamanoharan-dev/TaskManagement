import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {
  id!: number;
  title = '';
  description = '';
  completed = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getById(this.id).subscribe({
      next: (t) => {
        this.title = t.title;
        this.description = t.description ?? '';
        this.completed = !!t.completed;
      },
      error: () => { alert('Could not load task'); this.router.navigate(['/tasks']); }
    });
  }

  update() {
    const payload = { title: this.title, description: this.description, completed: this.completed };
    this.taskService.update(this.id, payload).subscribe({
      next: () => { alert('Updated'); this.router.navigate(['/tasks']); },
      error: () => alert('Update failed')
    });
  }
}
