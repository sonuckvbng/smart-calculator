import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { CreateHistoryRequest, HistoryItem } from '../models/calculation.model';

@Injectable({ providedIn: 'root' })
export class HistoryApiService {
  private readonly http = inject(HttpClient);
  getRecent(): Observable<HistoryItem[]> { return this.http.get<HistoryItem[]>(API_ENDPOINTS.history); }
  create(request: CreateHistoryRequest): Observable<HistoryItem> { return this.http.post<HistoryItem>(API_ENDPOINTS.history, request); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${API_ENDPOINTS.history}/${id}`); }
  clear(): Observable<void> { return this.http.delete<void>(API_ENDPOINTS.history); }
}
