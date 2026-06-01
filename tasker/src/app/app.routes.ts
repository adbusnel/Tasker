import { Routes } from '@angular/router';
import { ProjectDashboardComponent } from './features/project-dashboard/project-dashboard.component';
import { TaskDashboardComponent } from './features/task-dashboard/task-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: ProjectDashboardComponent,
  },
  {
    path: ':id/tasks',
    component: TaskDashboardComponent,
  },
];
