// Reporting Obligations Types
export interface ReportingObligation {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: ObligationStatus;
  priority: ObligationPriority;
  category: ObligationCategory;
  firmId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  documents: ObligationDocument[];
}

export enum ObligationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  OVERDUE = 'OVERDUE'
}

export enum ObligationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum ObligationCategory {
  FINANCIAL_REPORTING = 'FINANCIAL_REPORTING',
  COMPLIANCE = 'COMPLIANCE',
  REGULATORY = 'REGULATORY',
  ANNUAL_RETURN = 'ANNUAL_RETURN',
  QUARTERLY_REPORT = 'QUARTERLY_REPORT'
}

export interface ObligationDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
  isRequired: boolean;
}

export interface CreateObligationRequest {
  title: string;
  description: string;
  dueDate: string;
  priority: ObligationPriority;
  category: ObligationCategory;
  firmId: string;
}

export interface UpdateObligationRequest {
  id: string;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: ObligationPriority;
  status?: ObligationStatus;
}

export interface ObligationFilters {
  status?: ObligationStatus[];
  priority?: ObligationPriority[];
  category?: ObligationCategory[];
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
}

export interface ObligationStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}
