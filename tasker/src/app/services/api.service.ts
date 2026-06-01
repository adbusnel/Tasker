import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllTasks(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasker/projects/${projectId}/tasks`);
  }

  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasker/tasks`, newTask);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    console.log(updatedTask)
    return this.http.put<Task>(`${this.apiUrl}/tasker/tasks/${updatedTask._id}`, updatedTask);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasker/tasks/${taskId}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/tasker/projects`);
  }

  createProject(newProject: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/tasker/projects`, newProject);
  }
}
