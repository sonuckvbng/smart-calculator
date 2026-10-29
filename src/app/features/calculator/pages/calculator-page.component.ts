import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { HistoryItem } from '../../../core/models/calculation.model';
import { CalculatorApiService } from '../../../core/services/calculator-api.service';
import { HistoryApiService } from '../../../core/services/history-api.service';
import { UiPreferencesService } from '../../../core/services/ui-preferences.service';

@Component({ selector: 'app-calculator-page', standalone: true, imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink], templateUrl: './calculator-page.component.html' })
export class CalculatorPageComponent {
  private readonly calculatorApi = inject(CalculatorApiService);
  private readonly historyApi = inject(HistoryApiService);
  readonly preferences = inject(UiPreferencesService);
  expression = '';
  result = '';
  error = '';
  isCalculating = false;
  readonly recent = signal<HistoryItem[]>([]);
  constructor() { this.refreshRecent(); }
  append(value: string): void { this.error = ''; this.expression += value; this.result = ''; }
  backspace(): void { this.expression = this.expression.slice(0, -1); this.error = ''; this.result = ''; }
  clear(): void { this.expression = ''; this.result = ''; this.error = ''; }
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    if (/^[0-9.+\-*\/%()]$/.test(event.key)) { event.preventDefault(); this.append(event.key); }
    else if (event.key === 'Backspace') { event.preventDefault(); this.backspace(); }
    else if (event.key === 'Escape') this.clear();
    else if (event.key === 'Enter') { event.preventDefault(); this.calculate(); }
  }
  calculate(): void {
    const expression = this.expression.trim();
    if (!expression || this.isCalculating) return;
    this.error = ''; this.isCalculating = true;
    this.calculatorApi.evaluate({ expression }).pipe(finalize(() => this.isCalculating = false)).subscribe({
      next: response => {
        this.result = String(response.result);
        this.historyApi.create({ expression, result: this.result, mode: this.preferences.mode() }).subscribe({ next: item => this.recent.update(items => [item, ...items].slice(0, 5)), error: () => this.refreshRecent() });
      },
      error: err => { this.result = ''; this.error = err?.error?.message || 'Check the expression and try again.'; },
    });
  }
  async copyResult(): Promise<void> {
    if (!this.result || !navigator.clipboard) return;
    try { await navigator.clipboard.writeText(this.result); } catch { this.error = 'Unable to copy the result in this browser.'; }
  }
  private refreshRecent(): void { this.historyApi.getRecent().subscribe({ next: items => this.recent.set(items.slice(0, 5)), error: () => this.recent.set([]) }); }
}
