import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sharedImports } from './shared/shared.imports';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...sharedImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tasker';
}
