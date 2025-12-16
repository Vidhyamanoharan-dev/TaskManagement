import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  loading = false;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.taskService.getAll().subscribe({
      next: (res) => { this.tasks = res; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  edit(id: number) { this.router.navigate(['/tasks/edit', id]); }

  delete(id: number) {
    if (!confirm('Delete this task?')) return;

    this.taskService.delete(id).subscribe({
      next: () => {
        this.load(); // reload tasks
      },
      error: () => alert('Delete failed')
    });
  }

}
