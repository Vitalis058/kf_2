// Financial Services Marketplace Types

// Main Financial Service interface (from existing codebase)
export interface FinancialService {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  industry: string;
  processingTime: string;
  cost: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  features: string[];
  provider: string;
  eligibility: string[];
  requirements: string[];
  benefits: string[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  createdAt: string;
  facetValues: FacetValue[];
  customFields: {
    Industry?: string;
    BusinessStage?: string;
    ProcessingTime?: string;
    RegistrationValidity?: string;
    Cost?: number;
    Steps?: string;
    TermsOfService?: string;
    RequiredDocuments?: string;
    RelatedServices?: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

export interface FacetValue {
  id: string;
  code: string;
  name: string;
  facet: {
    id: string;
    name: string;
    code: string;
  };
}

export interface Facet {
  id: string;
  name: string;
  code: string;
  values: FacetValue[];
}

export interface FilterState {
  [facetCode: string]: { [valueCode: string]: boolean } | string | boolean;
}

export interface SearchFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedIndustry: string;
  selectedPricing: string;
  showNewOnly: boolean;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ViewMode {
  mode: "grid" | "list";
}

// API Response Types
export interface GetProductsResponse {
  products: {
    items: FinancialService[];
    totalItems: number;
  };
}

export interface GetFacetsResponse {
  facets: {
    items: Facet[];
  };
}

export interface GetProductsVariables {
  take: number;
  skip?: number;
  filter?: {
    facetValueIds?: string[];
    facetValueOperator?: string;
  };
  sort?: {
    name?: string;
    createdAt?: string;
  };
}

// Component Props Types
export interface ServiceCardProps {
  service: FinancialService;
  viewMode: ViewMode["mode"];
  onViewDetails: (serviceId: string) => void;
}

export interface FilterSidebarProps {
  facets: Facet[];
  filterStates: FilterState;
  onFilterChange: (
    facetCode: string,
    valueCode: string,
    checked?: boolean
  ) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalItems: number;
  filteredItems: number;
}

export interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: ViewMode["mode"]) => void;
  viewMode: ViewMode["mode"];
  onShowFilters: () => void;
  showFilters: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Extended types for future use
export interface FinancialServiceApplication {
  id: string;
  serviceId: string;
  applicantId: string;
  amount: number;
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected";
  submittedAt?: string;
  reviewedAt?: string;
  documents: string[];
  notes?: string;
}

export interface FinancialProvider {
  id: string;
  name: string;
  type: "bank" | "government" | "private_lender" | "investment_firm";
  description: string;
  services: string[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  rating: number;
  verified: boolean;
}

// Constants
export const FINANCIAL_SERVICE_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Operations", label: "Operations" },
  { value: "Growth", label: "Growth" },
  { value: "Projects", label: "Projects" },
  { value: "Assets", label: "Assets" },
  { value: "Equity", label: "Equity" },
  { value: "Management", label: "Management" },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: "all", label: "All Industries" },
  { value: "Technology", label: "Technology" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Energy", label: "Energy" },
  { value: "Services", label: "Services" },
  { value: "Innovation", label: "Innovation" },
] as const;

export const PRICING_MODELS = [
  { value: "all", label: "All Pricing" },
  { value: "low-cost", label: "Low Cost (≤2.5% APR)" },
  { value: "standard", label: "Standard (2.5-3.5% APR)" },
  { value: "premium", label: "Premium (≥3.5% APR)" },
  { value: "equity", label: "Equity-based" },
] as const;
