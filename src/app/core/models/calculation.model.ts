export interface EvaluationRequest { expression: string; }
export interface EvaluationResponse { expression: string; result: string; success: boolean; }
export interface CreateHistoryRequest { expression: string; result: string; mode: 'kids' | 'adult'; }
export interface HistoryItem { id?: number; expression: string; result: string; mode: string; createdAt?: string; }
