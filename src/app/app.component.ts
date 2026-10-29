import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UiPreferencesService } from './core/services/ui-preferences.service';

@Component({
  selector: 'app-root', standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSlideToggleModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly preferences = inject(UiPreferencesService);
  setMode(event: MatSlideToggleChange): void { this.preferences.setMode(event.checked); }
}
