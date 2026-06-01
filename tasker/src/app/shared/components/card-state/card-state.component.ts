import { Component, Input, OnInit } from '@angular/core';
import { CardState } from '../../../models/state.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-state',
  imports: [CommonModule],
  templateUrl: './card-state.component.html',
  styleUrl: './card-state.component.scss',
})
export class CardStateComponent implements OnInit {
  @Input() status: CardState | null = null;
  public background: string = 'background-color: grey;';
  public stateText: string = 'En attente';
  public show: boolean = false;
  public tipX: number = 0;
  public tipY: number = 0;

  ngOnInit(): void {
    this.acquireBackground();
  }

  acquireBackground(): void {
    switch(this.status) {
      case 'pending':
        this.background = 'background-color: red;';
        this.stateText = 'A faire';
        break;
      case 'in_progress':
        this.background = 'background-color: orange;'
        this.stateText = 'En cours';
        break;
      case 'to_test':
        this.background = 'background-color: violet;'
        this.stateText = 'A tester';
        break;
      case 'done':
        this.background = 'background-color: green;'
        this.stateText = 'Accompli'
        break;
      default:
        this.background = 'background-color: grey;'
        this.stateText = 'En attente';
        break;
    }
  }

  showTooltip(showBoolean: boolean): void {
    this.show = showBoolean;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.show) {
      const tooltipWidth = this.stateText.length * 8;
      if (event.clientX + 10 + tooltipWidth > window.innerWidth) {
        this.tipX = event.clientX - tooltipWidth;
      } else {
        this.tipX = event.clientX + 10;
      }
      if (event.clientY + 10 + 15 > window.innerHeight) {
        this.tipY = event.clientY - 10 - 15;
      } else {
        this.tipY = event.clientY + 10;
      }
    }
  }

}
