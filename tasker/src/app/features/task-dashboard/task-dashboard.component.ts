import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../models/task.model';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { sharedImports } from '../../shared/shared.imports';
import { MatDialog } from '@angular/material/dialog';
import { CreationDialogComponent } from '../../shared/components/creation-dialog/creation-dialog.component';
import { CardContainerComponent } from "../../shared/components/card-container/card-container.component";
import { CardState } from '../../models/state.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  imports: [...sharedImports, CardContainerComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  public groupTasks: Record<string, Task[]> = {
    in_progress: [],
    pending: [],
    to_test: [],
    done: []
  };
  public projectId: string = '';
  private getAllTasksSubscription: Subscription | undefined;
  private createTaskSubscription: Subscription | undefined;
  private updateTaskSubscription: Subscription | undefined;
  private openCreationDialogSubscription: Subscription | undefined;
  private openModificationDialogSubscription: Subscription | undefined;
  private deleteTaskSubscription: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;

    this.getAllTasks()
  }

  getAllTasks() {
    if (this.getAllTasksSubscription) {
      this.getAllTasksSubscription.unsubscribe();
    }
    this.getAllTasksSubscription = this.apiService.getAllTasks(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      this.groupTasks = this.groupTasksByStatus(this.tasks);
      console.log(this.tasks, this.groupTasks)
    });
  }

  groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
    return tasks.reduce((groups, task) => {
      const status = task.status;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
      return groups;
    }, {} as Record<string, Task[]>);
  }

  createTask(taskData: any) {
    const newTask: Task = {
      title: taskData.title,
      description: taskData.description,
      projectId: taskData.projectId,
      status: taskData.status
    };
    if (this.createTaskSubscription) {
      this.createTaskSubscription.unsubscribe();
    }
    this.createTaskSubscription = this.apiService.createTask(newTask).subscribe((task) => {
      this.tasks.push(task);
      if (!this.groupTasks[task.status]) {
        this.groupTasks[task.status] = [];
      }
      this.groupTasks[task.status].push(task);
    });
  }

  updateTask(taskData: Task) {
    if (this.updateTaskSubscription) {
      this.updateTaskSubscription.unsubscribe();
    }

    this.updateTaskSubscription = this.apiService.updateTask(taskData).subscribe((task) => {
      const index = this.tasks.findIndex(t => t._id === task._id);
      const oldTask = this.tasks[index];

      this.groupTasks[oldTask.status] = this.groupTasks[oldTask.status].filter(t => t._id !== taskData._id);

      this.tasks[index] = taskData;

      if (!this.groupTasks[taskData.status]) {
        this.groupTasks[taskData.status] = [];
      }

      this.groupTasks[taskData.status].push(taskData);
    });
  }

  deleteTask(taskId: string) {
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
    this.deleteTaskSubscription = this.apiService.deleteTask(taskId).subscribe(() => {
      const taskStatus = this.tasks.find(t => t._id === taskId)?.status || 'pending';
      this.tasks = this.tasks.filter(t => t._id !== taskId);
      this.groupTasks[taskStatus] = this.groupTasks[taskStatus].filter(t => t._id !== taskId);
    });
  }

  openCreationDialog(status: string): void {
    const dialogRef = this.dialog.open(CreationDialogComponent, {
      data: {
        mode: 'create',
        title: 'Create a new task',
        projectId: this.projectId,
        status: status as CardState
      }
    });

    if (this.openCreationDialogSubscription) {
      this.openCreationDialogSubscription.unsubscribe();
    }

    this.openCreationDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createTask(result.data);
      }
    });
  }

  openModificationDialog(task: Task): void {
    const dialogRef = this.dialog.open(CreationDialogComponent, {
      data: {
        mode: 'edit',
        title: 'Edit task',
        projectId: this.projectId,
        data: task
      }
    });

    if (this.openModificationDialogSubscription) {
      this.openModificationDialogSubscription.unsubscribe();
    }

    this.openModificationDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this.deleteTask(result.data._id);
        } else {
          this.updateTask(result.data);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getAllTasksSubscription) {
      this.getAllTasksSubscription.unsubscribe();
    }
    if (this.createTaskSubscription) {
      this.createTaskSubscription.unsubscribe();
    }
    if (this.updateTaskSubscription) {
      this.updateTaskSubscription.unsubscribe();
    }
    if (this.openCreationDialogSubscription) {
      this.openCreationDialogSubscription.unsubscribe();
    }
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
    if (this.openModificationDialogSubscription) {
      this.openModificationDialogSubscription.unsubscribe();
    }
  }
}
