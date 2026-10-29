import { Injectable, signal } from '@angular/core';
export type AppMode = 'kids' | 'adult';
const STORAGE_KEY = 'calcplay-mode';
@Injectable({ providedIn: 'root' })
export class UiPreferencesService {
  readonly mode = signal<AppMode>(this.readMode());
  setMode(isKids: boolean): void {
    const mode: AppMode = isKids ? 'kids' : 'adult';
    this.mode.set(mode);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* Storage may be disabled. */ }
  }
  private readMode(): AppMode {
    try { return localStorage.getItem(STORAGE_KEY) === 'adult' ? 'adult' : 'kids'; }
    catch { return 'kids'; }
  }
}
