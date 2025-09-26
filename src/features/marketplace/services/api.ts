import { GraphQLClient } from "graphql-request";
import { 
  GetProductsResponse, 
  GetFacetsResponse, 
  GetProductsVariables,
  FinancialService 
} from "../types";

// GraphQL Client Configuration
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://9609a7336af8.ngrok-free.app/services-api";
const client = new GraphQLClient(endpoint);

// GraphQL Queries
const GET_PRODUCTS = `
  query GetProducts($take: Int!, $skip: Int, $filter: ProductFilterParameter, $sort: [ProductSortParameter!]) {
    products(options: { take: $take, skip: $skip, filter: $filter, sort: $sort }) {
      items {
        id
        createdAt
        name
        slug
        description
        facetValues {
          facet {
            id
            name
            code
          }
          id
          name
          code
        }
        customFields {
          Industry
          BusinessStage
          ProcessingTime
          RegistrationValidity
          Cost
          Steps
          TermsOfService
          RequiredDocuments
          RelatedServices {
            id
            name
            slug
          }
        }
      }
      totalItems
    }
  }
`;

const GET_FACETS = `
  query GetFacets {
    facets(options: { take: 100 }) {
      items {
        id
        name
        code
        values {
          id
          name
          code
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      facetValues {
        facet {
          id
          name
          code
        }
        id
        name
        code
      }
      customFields {
        Industry
        BusinessStage
        ProcessingTime
        RegistrationValidity
        Cost
        Steps
        TermsOfService
        RequiredDocuments
        RelatedServices {
          id
          name
          slug
        }
      }
    }
  }
`;

// API Functions
export class FinancialServicesAPI {
  /**
   * Fetch financial services with pagination and filtering
   */
  static async getFinancialServices(variables: GetProductsVariables): Promise<GetProductsResponse> {
    try {
      const response = await client.request<GetProductsResponse>(GET_PRODUCTS, variables);
      
      // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
      const filteredItems = response.products.items.filter((product) =>
        product.facetValues.some((fv) => fv.id === "66") &&
        !product.facetValues.some((fv) => fv.id === "67")
      );

      return {
        products: {
          items: filteredItems,
          totalItems: filteredItems.length
        }
      };
    } catch (error) {
      console.error("Error fetching financial services:", error);
      throw new Error("Failed to fetch financial services");
    }
  }

  /**
   * Fetch all facets for filtering
   */
  static async getFacets(): Promise<GetFacetsResponse> {
    try {
      const response = await client.request<GetFacetsResponse>(GET_FACETS);
      
      // Filter for relevant facets
      const relevantFacets = response.facets.items.filter(facet =>
        ["service-category", "business-stage", "provided-by", "pricing-model"].includes(facet.code)
      );

      return {
        facets: {
          items: relevantFacets
        }
      };
    } catch (error) {
      console.error("Error fetching facets:", error);
      throw new Error("Failed to fetch facets");
    }
  }

  /**
   * Fetch a single financial service by slug
   */
  static async getFinancialServiceBySlug(slug: string): Promise<FinancialService | null> {
    try {
      const response = await client.request<{ product: FinancialService }>(GET_PRODUCT_BY_SLUG, { slug });
      
      if (!response.product) {
        return null;
      }

      // Check if it's a financial service
      const isFinancialService = response.product.facetValues.some((fv) => fv.id === "66") &&
        !response.product.facetValues.some((fv) => fv.id === "67");

      if (!isFinancialService) {
        return null;
      }

      return response.product;
    } catch (error) {
      console.error("Error fetching financial service:", error);
      throw new Error("Failed to fetch financial service");
    }
  }

  /**
   * Search financial services
   */
  static async searchFinancialServices(
    query: string, 
    variables: GetProductsVariables
  ): Promise<GetProductsResponse> {
    try {
      // Add search filter to variables
      const searchVariables = {
        ...variables,
        filter: {
          ...variables.filter,
          name: { contains: query }
        }
      };

      return await this.getFinancialServices(searchVariables);
    } catch (error) {
      console.error("Error searching financial services:", error);
      throw new Error("Failed to search financial services");
    }
  }
}

// Mock data for development/fallback (legacy - will be replaced by imported data)
export const legacyMockFinancialServices: FinancialService[] = [
  {
    id: "1",
    name: "Business Operations Financing",
    slug: "business-operations-financing",
    description: "Working capital and operational funding solutions for daily business needs and cash flow management. This comprehensive financing program is designed to support UAE entrepreneurs and SMEs with flexible funding options to maintain smooth business operations.",
    category: "Operations",
    industry: "All Industries",
    processingTime: "5-10 business days",
    cost: "Starting from 2.5% APR",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    features: [
      "Working Capital Loans up to AED 5M",
      "Trade Finance Solutions",
      "Invoice Factoring Services",
      "Flexible Line of Credit",
      "Quick Approval Process",
      "Competitive Interest Rates"
    ],
    provider: "Khalifa Fund",
    eligibility: [
      "UAE-registered business",
      "Minimum 2 years in operation",
      "Annual revenue between AED 500K - AED 50M",
      "Good credit history",
      "Valid trade license"
    ],
    requirements: [
      "Business registration documents",
      "Financial statements (last 2 years)",
      "Bank statements (last 6 months)",
      "Trade license copy",
      "Business plan",
      "Collateral documentation (if applicable)"
    ],
    benefits: [
      "Flexible repayment terms",
      "No prepayment penalties",
      "Dedicated relationship manager",
      "Access to business advisory services",
      "Priority processing for existing clients"
    ],
    contact: {
      phone: "+971 4 123 4567",
      email: "operations@khalifafund.ae",
      address: "Khalifa Fund Headquarters, Dubai, UAE"
    },
    createdAt: new Date().toISOString(),
    facetValues: [
      {
        id: "66",
        code: "financial-services",
        name: "Financial Services",
        facet: {
          id: "1",
          name: "Service Category",
          code: "service-category"
        }
      }
    ],
    customFields: {
      Industry: "All Industries",
      BusinessStage: "Established",
      ProcessingTime: "5-10 business days",
      Cost: 2.5,
      Steps: "Application, Review, Approval, Disbursement",
      TermsOfService: "Standard terms apply",
      RequiredDocuments: "Business registration, financial statements, bank statements"
    }
  },
  {
    id: "2",
    name: "Growth & Expansion Financing",
    slug: "growth-expansion-financing",
    description: "Scale your business with our expansion and growth funding programs designed for ambitious entrepreneurs.",
    category: "Growth",
    industry: "Technology, Manufacturing",
    processingTime: "10-15 business days",
    cost: "Starting from 3.2% APR",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    features: [
      "Expansion Loans",
      "Market Entry Support",
      "Strategic Investment",
      "Growth Capital"
    ],
    provider: "Khalifa Fund",
    eligibility: [
      "UAE-registered business",
      "Minimum 3 years in operation",
      "Annual revenue between AED 1M - AED 100M",
      "Strong growth trajectory",
      "Valid trade license"
    ],
    requirements: [
      "Business registration documents",
      "Financial statements (last 3 years)",
      "Bank statements (last 12 months)",
      "Growth strategy document",
      "Market analysis report",
      "Management team profiles"
    ],
    benefits: [
      "Higher loan amounts",
      "Extended repayment terms",
      "Strategic advisory support",
      "Market entry assistance",
      "Priority processing"
    ],
    contact: {
      phone: "+971 4 123 4567",
      email: "growth@khalifafund.ae",
      address: "Khalifa Fund Headquarters, Dubai, UAE"
    },
    createdAt: new Date().toISOString(),
    facetValues: [
      {
        id: "66",
        code: "financial-services",
        name: "Financial Services",
        facet: {
          id: "1",
          name: "Service Category",
          code: "service-category"
        }
      }
    ],
    customFields: {
      Industry: "Technology, Manufacturing",
      BusinessStage: "Growth",
      ProcessingTime: "10-15 business days",
      Cost: 3.2,
      Steps: "Application, Due Diligence, Approval, Disbursement",
      TermsOfService: "Growth-focused terms",
      RequiredDocuments: "Business registration, financial statements, growth strategy"
    }
  }
];

// Import mock data from the data folder
import { mockFinancialServices } from "../data/mockFinancialServices";

// Fallback function for when API is not available
export const getMockFinancialServices = async (): Promise<GetProductsResponse> => {
  return {
    products: {
      items: mockFinancialServices,
      totalItems: mockFinancialServices.length
    }
  };
};
