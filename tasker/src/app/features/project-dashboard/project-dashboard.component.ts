import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Project } from '../../models/project.model';
import { CardState } from '../../models/state.model';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { CreationDialogComponent } from '../../shared/components/creation-dialog/creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project-dashboard',
  imports: [CardComponent, CommonModule],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent implements OnInit {
  public projectsList: Project[] = [];
  private openCreationDialogSubscription: Subscription | undefined;
  private createProjectSubscription: Subscription | undefined;
  private getProjectsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    if (this.getProjectsSubscription) {
      this.getProjectsSubscription.unsubscribe();
    }
    this.getProjectsSubscription = this.apiService.getAllProjects().subscribe((projects) => {
      console.log(projects, this.projectsList)
      if (projects.length === 0) {
        this.projectsList = [];
      } else {
        this.projectsList = projects;
      }
    });
  }

  goToTasks(projectId: string): void {
    this.router.navigate([projectId, 'tasks']);
  }

  createProject(projectData: Project) {
    if (this.createProjectSubscription) {
      this.createProjectSubscription.unsubscribe();
    }
    const newProject: Project = {
      title: projectData.title,
      description: projectData.description,
      status: projectData.status
    };
    console.log(newProject)
    this.createProjectSubscription = this.apiService.createProject(newProject).subscribe((project) => {
      this.projectsList.push(project);
    });
  }

  openCreationDialog(): void {
    const dialogRef = this.dialog.open(CreationDialogComponent, {
      data: {
        mode: 'create',
        title: 'Create a new project',
        status: CardState.PENDING
      }
    });

    if (this.openCreationDialogSubscription) {
      this.openCreationDialogSubscription.unsubscribe();
    }

    this.openCreationDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProject(result.data);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.openCreationDialogSubscription) {
      this.openCreationDialogSubscription.unsubscribe();
    }

    if (this.createProjectSubscription) {
      this.createProjectSubscription.unsubscribe();
    }

    if (this.getProjectsSubscription) {
      this.getProjectsSubscription.unsubscribe();
    }
  }
}
