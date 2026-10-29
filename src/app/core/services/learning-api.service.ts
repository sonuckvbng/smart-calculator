import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { AnswerResponse, SessionStartResponse, StartSessionRequest, SubmitAnswerRequest } from '../models/learning.model';

@Injectable({ providedIn: 'root' })
export class LearningApiService {
  private readonly http = inject(HttpClient);
  startSession(request: StartSessionRequest): Observable<SessionStartResponse> {
    return this.http.post<SessionStartResponse>(`${API_ENDPOINTS.learning}/sessions`, request);
  }
  submitAnswer(request: SubmitAnswerRequest): Observable<AnswerResponse> {
    return this.http.post<AnswerResponse>(`${API_ENDPOINTS.learning}/answers`, request);
  }
}
