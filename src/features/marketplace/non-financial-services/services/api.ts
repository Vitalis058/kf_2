// Non-Financial Services API

import {
  GetProductsResponse,
  GetFacetsResponse,
  GetProductsVariables,
} from "../types";
import { mockNonFinancialServices } from "../mock-data/mockNonFinancialServices";

export const NonFinancialServicesAPI = {
  async getNonFinancialServices(
    variables: GetProductsVariables
  ): Promise<GetProductsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const { take = 10, skip = 0 } = variables;
    const startIndex = skip;
    const endIndex = startIndex + take;

    return {
      products: {
        items: mockNonFinancialServices.slice(startIndex, endIndex),
        totalItems: mockNonFinancialServices.length,
      },
    };
  },

  async getFacets(): Promise<GetFacetsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      facets: {
        items: [],
      },
    };
  },
};

export const getMockNonFinancialServices =
  async (): Promise<GetProductsResponse> => {
    return {
      products: {
        items: mockNonFinancialServices,
        totalItems: mockNonFinancialServices.length,
      },
    };
  };
