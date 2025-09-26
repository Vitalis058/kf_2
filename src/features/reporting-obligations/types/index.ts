// Reporting Obligations Types

export interface ReportingObligation {
  id: string;
  name: string;
  dueDate: string;
  status: 'Due Soon' | 'Upcoming' | 'Overdue';
  assignedTo: string;
  type: 'Financial' | 'Environmental' | 'Compliance' | 'Regulatory' | 'Operational';
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
  category?: string;
}

export interface SubmittedReport {
  id: string;
  name: string;
  type: 'Financial' | 'Environmental' | 'Compliance' | 'Regulatory' | 'Operational';
  status: 'Approved' | 'Pending Review' | 'Rejected' | 'Under Review';
  submittedDate: string;
  reviewer: string;
  fileUrl: string;
  fileSize?: string;
  version?: string;
  comments?: string;
}

export interface ReceivedReport {
  id: string;
  title: string;
  source: string;
  receivedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  fileUrl: string;
  fileSize?: string;
  category?: string;
  description?: string;
}

export interface ReportDocument {
  id: string;
  name: string;
  category: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  fileUrl: string;
  version?: string;
  status?: 'Active' | 'Archived' | 'Draft';
}

export interface ReportingSummary {
  totalReports: number;
  completed: number;
  pending: number;
  overdue: number;
  complianceRate: number;
}

export interface ReportingFilters {
  searchQuery: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  reportTypeFilter: string;
  statusFilter: string;
  priorityFilter: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Component Props Types
export interface SummaryHighlightsProps {
  data: ReportingSummary;
  className?: string;
}

export interface UpcomingObligationsProps {
  obligations: ReportingObligation[];
  onViewAll?: () => void;
  onActionClick?: (obligation: ReportingObligation, action: string) => void;
  className?: string;
}

export interface SubmittedReportsProps {
  reports: SubmittedReport[];
  onViewAll?: () => void;
  onViewReport?: (report: SubmittedReport) => void;
  onDownloadReport?: (report: SubmittedReport) => void;
  className?: string;
}

export interface ReceivedReportsProps {
  reports: ReceivedReport[];
  onViewAll?: () => void;
  onViewReport?: (report: ReceivedReport) => void;
  onDownloadReport?: (report: ReceivedReport) => void;
  className?: string;
}

export interface DocumentWalletPanelProps {
  documents: ReportDocument[];
  onViewAll?: () => void;
  onViewDocument?: (document: ReportDocument) => void;
  onDownloadDocument?: (document: ReportDocument) => void;
  className?: string;
}

export interface ReportingObligationsPageProps {
  className?: string;
}

// Filter and Search Types
export interface FilterOption {
  value: string;
  label: string;
}

export interface DateRangeFilter {
  startDate: string | null;
  endDate: string | null;
}

// API Response Types
export interface ReportingObligationsResponse {
  summaryData: ReportingSummary;
  upcomingObligations: ReportingObligation[];
  submittedReports: SubmittedReport[];
  receivedReports: ReceivedReport[];
  reportDocuments: ReportDocument[];
}

// Status Badge Types
export type ObligationStatus = 'Due Soon' | 'Upcoming' | 'Overdue';
export type ReportStatus = 'Approved' | 'Pending Review' | 'Rejected' | 'Under Review';
export type Priority = 'High' | 'Medium' | 'Low';
export type ReportType = 'Financial' | 'Environmental' | 'Compliance' | 'Regulatory' | 'Operational';

// Page Props Types
export interface AllObligationsPageProps {
  className?: string;
}

export interface AllSubmittedReportsPageProps {
  className?: string;
}

export interface AllReceivedReportsPageProps {
  className?: string;
}

export interface AllDocumentsPageProps {
  className?: string;
}
