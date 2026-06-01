import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-container',
  imports: [CommonModule, CardComponent],
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.scss'
})
export class CardContainerComponent implements OnInit {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Output() cardClick = new EventEmitter<Task>();
  @Output() newTaskClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCardClick(task: Task) {
    this.cardClick.emit(task);
  }

  newTask() {
    this.newTaskClick.emit();
  }
}
