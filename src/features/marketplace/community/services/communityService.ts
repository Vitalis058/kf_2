// Community API Services

import {
  GetCommunitiesResponse,
  CreateCommunityRequestResponse,
  CommunityRequestData,
  Community,
} from "../types";
import { mockCommunities } from "../mock-data/mockCommunities";

// Mock API implementation for Community Services
export const CommunityAPI = {
  async getCommunities(options?: {
    take?: number;
    skip?: number;
    category?: string;
    search?: string;
  }): Promise<GetCommunitiesResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    const { take = 12, skip = 0, category, search } = options || {};

    let filteredCommunities = [...mockCommunities];

    // Filter by category if specified
    if (category && category !== "all") {
      filteredCommunities = filteredCommunities.filter(
        (community) => community.category === category
      );
    }

    // Filter by search query if specified
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      filteredCommunities = filteredCommunities.filter(
        (community) =>
          community.name.toLowerCase().includes(searchLower) ||
          community.description.toLowerCase().includes(searchLower) ||
          community.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply pagination
    const startIndex = skip;
    const endIndex = startIndex + take;
    const paginatedCommunities = filteredCommunities.slice(
      startIndex,
      endIndex
    );

    return {
      communities: {
        items: paginatedCommunities,
        totalItems: filteredCommunities.length,
      },
    };
  },

  async getCommunityById(id: string): Promise<Community | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const community = mockCommunities.find((c) => c.id === id);
    return community || null;
  },

  async createCommunityRequest(
    data: CommunityRequestData
  ): Promise<CreateCommunityRequestResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Log the request data to console as specified in requirements
    console.log("Community Request Submitted:", {
      timestamp: new Date().toISOString(),
      requestData: data,
    });

    // Simulate successful request creation
    return {
      success: true,
      message:
        "Community request submitted successfully! We'll review your request and get back to you soon.",
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  },

  async getCommunitiesByCategory(category: string): Promise<Community[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (category === "all") return mockCommunities;
    return mockCommunities.filter(
      (community) => community.category === category
    );
  },

  async searchCommunities(query: string): Promise<Community[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 120));

    const searchLower = query.toLowerCase();
    return mockCommunities.filter(
      (community) =>
        community.name.toLowerCase().includes(searchLower) ||
        community.description.toLowerCase().includes(searchLower) ||
        community.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  },

  async getPopularCommunities(limit: number = 6): Promise<Community[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return [...mockCommunities]
      .sort((a, b) => b.memberCount - a.memberCount)
      .slice(0, limit);
  },

  async getRecentCommunities(limit: number = 6): Promise<Community[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return [...mockCommunities]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  },
};

// Fallback function for when API is not available
export const getMockCommunities = async (): Promise<GetCommunitiesResponse> => {
  return {
    communities: {
      items: mockCommunities,
      totalItems: mockCommunities.length,
    },
  };
};

// Helper functions for direct use (without API simulation)
export const getCommunityCategories = () => {
  const categories = new Set(mockCommunities.map((c) => c.category));
  return Array.from(categories).sort();
};

export const getCommunityTags = () => {
  const tags = new Set(mockCommunities.flatMap((c) => c.tags));
  return Array.from(tags).sort();
};

export const getCommunityStats = () => {
  return {
    totalCommunities: mockCommunities.length,
    totalMembers: mockCommunities.reduce((sum, c) => sum + c.memberCount, 0),
    averageMembers: Math.round(
      mockCommunities.reduce((sum, c) => sum + c.memberCount, 0) /
        mockCommunities.length
    ),
    categoriesCount: new Set(mockCommunities.map((c) => c.category)).size,
  };
};
