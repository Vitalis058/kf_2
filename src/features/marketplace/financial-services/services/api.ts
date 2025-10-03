// Marketplace API Services

import {
  GetProductsResponse,
  GetFacetsResponse,
  GetProductsVariables,
} from "../types";
import { mockFinancialServices } from "../mock-data/mockFinancialServices";

// Mock API implementation for Financial Services
export const FinancialServicesAPI = {
  async getFinancialServices(
    variables: GetProductsVariables
  ): Promise<GetProductsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const { take = 10, skip = 0 } = variables;
    const startIndex = skip;
    const endIndex = startIndex + take;

    return {
      products: {
        items: mockFinancialServices.slice(startIndex, endIndex),
        totalItems: mockFinancialServices.length,
      },
    };
  },

  async getFacets(): Promise<GetFacetsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Return mock facets based on the financial services data
    return {
      facets: {
        items: [
          {
            id: "1",
            name: "Category",
            code: "category",
            values: [
              {
                id: "1",
                code: "operations",
                name: "Operations",
                facet: { id: "1", name: "Category", code: "category" },
              },
              {
                id: "2",
                code: "growth",
                name: "Growth",
                facet: { id: "1", name: "Category", code: "category" },
              },
              {
                id: "3",
                code: "projects",
                name: "Projects",
                facet: { id: "1", name: "Category", code: "category" },
              },
            ],
          },
          {
            id: "2",
            name: "Industry",
            code: "industry",
            values: [
              {
                id: "4",
                code: "technology",
                name: "Technology",
                facet: { id: "2", name: "Industry", code: "industry" },
              },
              {
                id: "5",
                code: "manufacturing",
                name: "Manufacturing",
                facet: { id: "2", name: "Industry", code: "industry" },
              },
              {
                id: "6",
                code: "services",
                name: "Services",
                facet: { id: "2", name: "Industry", code: "industry" },
              },
            ],
          },
        ],
      },
    };
  },
};

// Fallback function for when API is not available
export const getMockFinancialServices =
  async (): Promise<GetProductsResponse> => {
    return {
      products: {
        items: mockFinancialServices,
        totalItems: mockFinancialServices.length,
      },
    };
  };
