// Community Details API Services with abstraction layer

import {
  GetCommunityDetailsResponse,
  JoinCommunityResponse,
  LeaveCommunityResponse,
  GetDiscussionsResponse,
  GetMembersResponse,
  CreatePostData,
  CreatePostResponse,
  PaginationOptions,
  Discussion,
} from "../types/communityDetails";

import {
  getCommunityDetailsBySlug,
  simulateJoinCommunity,
  simulateLeaveCommunity,
  simulateCreatePost,
} from "../mock-data/mockCommunityDetails";

import {
  getDiscussionsByCommunityId,
  getRecentDiscussions,
  getPopularDiscussions,
} from "../mock-data/mockDiscussions";

import { getMembersByCommunityId } from "../mock-data/mockMembers";

// Service interface for community details operations
export interface CommunityDetailsService {
  getCommunityBySlug(slug: string): Promise<GetCommunityDetailsResponse>;
  joinCommunity(communityId: string): Promise<JoinCommunityResponse>;
  leaveCommunity(communityId: string): Promise<LeaveCommunityResponse>;
  getCommunityDiscussions(
    communityId: string,
    options?: PaginationOptions
  ): Promise<GetDiscussionsResponse>;
  getCommunityMembers(
    communityId: string,
    options?: PaginationOptions
  ): Promise<GetMembersResponse>;
  createPost(
    communityId: string,
    post: CreatePostData
  ): Promise<CreatePostResponse>;
}

// Mock implementation of community details service
export class MockCommunityDetailsService implements CommunityDetailsService {
  async getCommunityBySlug(slug: string): Promise<GetCommunityDetailsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const community = getCommunityDetailsBySlug(slug);

    if (!community) {
      return {
        community: null as never,
        success: false,
        message: "Community not found",
      };
    }

    return {
      community,
      success: true,
      message: "Community details retrieved successfully",
    };
  }

  async joinCommunity(communityId: string): Promise<JoinCommunityResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const result = simulateJoinCommunity(communityId);

      if (!result.success) {
        return {
          success: false,
          message: "Failed to join community. Community not found.",
          membershipStatus: "not_member",
          memberCount: 0,
        };
      }

      return {
        success: true,
        message: "Successfully joined the community! Welcome aboard.",
        membershipStatus: "member",
        memberCount: result.newMemberCount,
      };
    } catch (_error) {
      return {
        success: false,
        message: "An error occurred while joining the community.",
        membershipStatus: "not_member",
        memberCount: 0,
      };
    }
  }

  async leaveCommunity(communityId: string): Promise<LeaveCommunityResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 250));

    try {
      const result = simulateLeaveCommunity(communityId);

      if (!result.success) {
        return {
          success: false,
          message: "Failed to leave community. Community not found.",
          memberCount: 0,
        };
      }

      return {
        success: true,
        message: "You have successfully left the community.",
        memberCount: result.newMemberCount,
      };
    } catch (_error) {
      return {
        success: false,
        message: "An error occurred while leaving the community.",
        memberCount: 0,
      };
    }
  }

  async getCommunityDiscussions(
    communityId: string,
    options: PaginationOptions = {}
  ): Promise<GetDiscussionsResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    const { limit = 10, sortBy = "recent" } = options;

    let discussions: Discussion[] = [];

    switch (sortBy) {
      case "popular":
        discussions = getPopularDiscussions(communityId, limit * 2);
        break;
      case "recent":
      default:
        discussions = getRecentDiscussions(communityId, limit * 2);
        break;
    }

    // Apply pagination
    const paginatedDiscussions = discussions.slice(0, limit);
    const hasMore = discussions.length > limit;

    return {
      discussions: paginatedDiscussions,
      totalCount: getDiscussionsByCommunityId(communityId).length,
      hasMore,
      nextCursor: hasMore ? `cursor_${limit}` : undefined,
    };
  }

  async getCommunityMembers(
    communityId: string,
    options: PaginationOptions = {}
  ): Promise<GetMembersResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 120));

    const { limit = 20 } = options;
    const allMembers = getMembersByCommunityId(communityId);

    // Apply pagination
    const paginatedMembers = allMembers.slice(0, limit);
    const hasMore = allMembers.length > limit;

    return {
      members: paginatedMembers,
      totalCount: allMembers.length,
      hasMore,
      nextCursor: hasMore ? `cursor_${limit}` : undefined,
    };
  }

  async createPost(
    communityId: string,
    post: CreatePostData
  ): Promise<CreatePostResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      // Validate post data
      if (!post.title?.trim()) {
        return {
          success: false,
          message: "Post title is required.",
        };
      }

      if (!post.content?.trim()) {
        return {
          success: false,
          message: "Post content is required.",
        };
      }

      if (post.type === "link" && !post.linkUrl?.trim()) {
        return {
          success: false,
          message: "Link URL is required for link posts.",
        };
      }

      if (
        post.type === "poll" &&
        (!post.pollOptions || post.pollOptions.length < 2)
      ) {
        return {
          success: false,
          message: "At least 2 poll options are required.",
        };
      }

      // Use the simulate function
      const result = simulateCreatePost(communityId, post);

      if (!result.success) {
        return {
          success: false,
          message: "Community not found or post creation failed.",
        };
      }

      console.log("New post created:", result.post);

      return {
        success: true,
        message: "Post created successfully!",
        post: result.post,
      };
    } catch (_error) {
      return {
        success: false,
        message: "An error occurred while creating the post.",
      };
    }
  }
}

// Real API implementation (future)
export class ApiCommunityDetailsService implements CommunityDetailsService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.baseUrl = baseUrl;
  }

  async getCommunityBySlug(slug: string): Promise<GetCommunityDetailsResponse> {
    const response = await fetch(`${this.baseUrl}/api/communities/${slug}`);
    return response.json();
  }

  async joinCommunity(communityId: string): Promise<JoinCommunityResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/communities/${communityId}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  }

  async leaveCommunity(communityId: string): Promise<LeaveCommunityResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/communities/${communityId}/leave`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  }

  async getCommunityDiscussions(
    communityId: string,
    options: PaginationOptions = {}
  ): Promise<GetDiscussionsResponse> {
    const params = new URLSearchParams();
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.cursor) params.append("cursor", options.cursor);
    if (options.sortBy) params.append("sortBy", options.sortBy);

    const response = await fetch(
      `${this.baseUrl}/api/communities/${communityId}/discussions?${params}`
    );
    return response.json();
  }

  async getCommunityMembers(
    communityId: string,
    options: PaginationOptions = {}
  ): Promise<GetMembersResponse> {
    const params = new URLSearchParams();
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.cursor) params.append("cursor", options.cursor);

    const response = await fetch(
      `${this.baseUrl}/api/communities/${communityId}/members?${params}`
    );
    return response.json();
  }

  async createPost(
    communityId: string,
    post: CreatePostData
  ): Promise<CreatePostResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/communities/${communityId}/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }
    );
    return response.json();
  }
}

// Service factory for easy switching between mock and real implementations
export const createCommunityDetailsService = (): CommunityDetailsService => {
  // Use mock service in development or when API URL is not configured
  if (
    process.env.NODE_ENV === "development" ||
    !process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
  ) {
    return new MockCommunityDetailsService();
  }

  // Use real API service in production
  return new ApiCommunityDetailsService();
};

// Default export for easy importing
export const communityDetailsService = createCommunityDetailsService();
