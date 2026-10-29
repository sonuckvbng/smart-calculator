import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HistoryItem } from '../../../core/models/calculation.model';
import { HistoryApiService } from '../../../core/services/history-api.service';
@Component({ selector: 'app-history-page', standalone: true, imports: [CommonModule, MatCardModule], templateUrl: './history-page.component.html' })
export class HistoryPageComponent {
  private readonly historyApi = inject(HistoryApiService);
  readonly history = signal<HistoryItem[]>([]);
  readonly error = signal('');
  readonly loading = signal(false);
  constructor() { this.loadHistory(); }
  loadHistory(): void {
    this.loading.set(true); this.error.set('');
    this.historyApi.getRecent().subscribe({ next: items => { this.history.set(items); this.loading.set(false); }, error: () => { this.error.set('History service is not reachable. Start the backend services and try again.'); this.loading.set(false); } });
  }
  clearHistory(): void {
    this.historyApi.clear().subscribe({ next: () => { this.history.set([]); this.error.set(''); }, error: () => this.error.set('Could not clear history. Is the history service running?') });
  }
  deleteHistory(id?: number): void {
    if (id == null) return;
    this.historyApi.delete(id).subscribe({ next: () => this.history.update(items => items.filter(item => item.id !== id)), error: () => this.error.set('Could not delete this calculation. Please try again.') });
  }
}
