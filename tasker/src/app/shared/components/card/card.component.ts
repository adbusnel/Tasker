import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { CardStateComponent } from '../card-state/card-state.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule, CardStateComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() content: Project | Task | null = null;

  ngOnInit(): void {

  }
}
