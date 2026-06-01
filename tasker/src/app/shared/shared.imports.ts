import { CommonModule, NgIf, NgFor } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardStateComponent } from './components/card-state/card-state.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreationDialogComponent } from './components/creation-dialog/creation-dialog.component';
import { CardContainerComponent } from './components/card-container/card-container.component';

export const sharedImports = [
  CardComponent,
  CardContainerComponent,
  CardStateComponent,
  CommonModule,
  CreationDialogComponent,
  FooterComponent,
  HeaderComponent,
  NgIf,
  NgFor,
];
