// Investment Marketplace Types

export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  company: string;
  companyId: string;
  type: "equity" | "debt" | "convertible" | "grant" | "crowdfunding";
  sector: string;
  stage: "seed" | "series_a" | "series_b" | "series_c" | "growth" | "pre_ipo";
  targetAmount: {
    amount: number;
    currency: string;
  };
  raisedAmount: {
    amount: number;
    currency: string;
  };
  minInvestment: {
    amount: number;
    currency: string;
  };
  maxInvestment?: {
    amount: number;
    currency: string;
  };
  expectedReturn?: number; // percentage
  investmentTerm?: string;
  riskLevel: "low" | "medium" | "high" | "very_high";
  deadline: string;
  documents: string[];
  requirements: string[];
  status: "draft" | "active" | "funded" | "closed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  opportunityId: string;
  investorId: string;
  amount: {
    amount: number;
    currency: string;
  };
  status: "pending" | "confirmed" | "completed" | "cancelled";
  investedAt: string;
  documents: string[];
  terms?: string;
}

export interface Investor {
  id: string;
  name: string;
  type:
    | "individual"
    | "institutional"
    | "venture_capital"
    | "angel"
    | "government";
  description?: string;
  investmentFocus: string[];
  minInvestment?: number;
  maxInvestment?: number;
  portfolioSize?: number;
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };
  verified: boolean;
  accredited: boolean;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  sector: string;
  foundedYear: number;
  employees: number;
  revenue?: {
    amount: number;
    currency: string;
    year: number;
  };
  valuation?: {
    amount: number;
    currency: string;
    date: string;
  };
  founders: string[];
  website?: string;
  verified: boolean;
}
