// Non-Financial Services Marketplace Types

// Main Non-Financial Service interface
export interface NonFinancialService {
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
    items: NonFinancialService[];
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
  service: NonFinancialService;
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

// Constants
export const NON_FINANCIAL_SERVICE_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Legal", label: "Legal Services" },
  { value: "Accounting", label: "Accounting & Finance" },
  { value: "Consulting", label: "Business Consulting" },
  { value: "Compliance", label: "Compliance & Regulatory" },
  { value: "Registration", label: "Business Registration" },
  { value: "HR", label: "Human Resources" },
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
  { value: "low-cost", label: "Low Cost (≤AED 5,000)" },
  { value: "standard", label: "Standard (AED 5,000-15,000)" },
  { value: "premium", label: "Premium (≥AED 15,000)" },
  { value: "consultation", label: "Free Consultation" },
] as const;
