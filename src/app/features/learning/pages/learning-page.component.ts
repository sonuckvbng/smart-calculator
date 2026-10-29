import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AnswerResponse, Difficulty, MathCategory, Question } from '../../../core/models/learning.model';
import { LearningApiService } from '../../../core/services/learning-api.service';
import { UiPreferencesService } from '../../../core/services/ui-preferences.service';
@Component({ selector: 'app-learning-page', standalone: true, imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule], templateUrl: './learning-page.component.html' })
export class LearningPageComponent {
  private readonly learningApi = inject(LearningApiService);
  readonly preferences = inject(UiPreferencesService);
  category: MathCategory = 'MULTIPLICATION';
  difficulty: Difficulty = 'EASY';
  totalQuestions = 10;
  question = signal<Question | null>(null);
  answerInput: number | null = null;
  answered = signal(0);
  score = signal(0);
  feedback = signal('');
  feedbackGood = signal(false);
  gameFinished = signal(false);
  isLoading = signal(false);
  startGame(): void {
    this.feedback.set(''); this.isLoading.set(true); this.gameFinished.set(false); this.question.set(null);
    this.learningApi.startSession({ category: this.category, difficulty: this.difficulty, totalQuestions: this.totalQuestions }).subscribe({
      next: data => { this.question.set(data.currentQuestion); this.answered.set(0); this.score.set(0); this.answerInput = null; this.feedback.set(''); this.gameFinished.set(false); this.isLoading.set(false); },
      error: () => { this.feedback.set('Learning service is unavailable. Start the backend services and try again.'); this.isLoading.set(false); },
    });
  }
  submitAnswer(): void {
    const current = this.question();
    if (!current || this.answerInput === null || this.isLoading()) return;
    this.isLoading.set(true);
    this.learningApi.submitAnswer({ sessionId: current.sessionId, questionId: current.questionId, answer: Number(this.answerInput) }).subscribe({
      next: (data: AnswerResponse) => {
        this.feedbackGood.set(data.correct); this.feedback.set(data.correct ? 'Correct! Great work!' : `Not quite — the answer was ${data.correctAnswer}.`);
        this.score.set(data.score); this.answered.set(data.answered); this.answerInput = null; this.question.set(data.finished ? null : data.nextQuestion); this.gameFinished.set(data.finished); this.isLoading.set(false);
      },
      error: () => { this.feedback.set('Could not submit the answer. Please try again.'); this.feedbackGood.set(false); this.isLoading.set(false); },
    });
  }
}
