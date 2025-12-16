import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<Task>(`${this.base}/${id}`);
  }

  create(task: Task) {
    return this.http.post<Task>(this.base, task);
  }

  update(id: number, task: Task) {
    return this.http.put<Task>(`${this.base}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
