import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'calculator' },
  { path: 'calculator', loadComponent: () => import('./features/calculator/pages/calculator-page.component').then(m => m.CalculatorPageComponent), title: 'Calculator | CalcPlay' },
  { path: 'games', loadComponent: () => import('./features/learning/pages/learning-page.component').then(m => m.LearningPageComponent), title: 'Math Games | CalcPlay' },
  { path: 'history', loadComponent: () => import('./features/history/pages/history-page.component').then(m => m.HistoryPageComponent), title: 'History | CalcPlay' },
  { path: '**', redirectTo: 'calculator' },
];
