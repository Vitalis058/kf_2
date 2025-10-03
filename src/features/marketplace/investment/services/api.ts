// Investment API

import { InvestmentOpportunity } from "../types";

// Mock data - replace with actual API calls
const mockInvestmentOpportunities: InvestmentOpportunity[] = [
  // Add mock data here when needed
];

export const InvestmentAPI = {
  async getOpportunities() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      opportunities: {
        items: mockInvestmentOpportunities,
        totalItems: mockInvestmentOpportunities.length,
      },
    };
  },

  async getOpportunityById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return mockInvestmentOpportunities.find(
      (opportunity) => opportunity.id === id
    );
  },
};

export const getMockInvestmentOpportunities = async () => {
  return {
    opportunities: {
      items: mockInvestmentOpportunities,
      totalItems: mockInvestmentOpportunities.length,
    },
  };
};
