import {
  CommunityDetails,
  CommunityStats,
  CommunityPermissions,
  MembershipStatus,
} from "../types/communityDetails";
import { mockCommunities } from "./mockCommunities";
import { getRecentDiscussions } from "./mockDiscussions";
import { getTopMembers } from "./mockMembers";

// Generate community stats based on community data
const generateCommunityStats = (
  communityId: string,
  memberCount: number
): CommunityStats => {
  const baseActivity = Math.floor(Math.random() * 50) + 30; // 30-80 activity score
  const growthRate = Math.floor(Math.random() * 15) + 5; // 5-20% growth

  return {
    totalMembers: memberCount,
    memberGrowthRate: growthRate,
    totalPosts: Math.floor(memberCount * 0.8) + Math.floor(Math.random() * 50),
    totalDiscussions:
      Math.floor(memberCount * 0.3) + Math.floor(Math.random() * 20),
    activityScore: baseActivity,
    lastActivityAt: new Date(
      Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
    ), // Last 24 hours
    weeklyActiveMembers:
      Math.floor(memberCount * 0.4) + Math.floor(Math.random() * 20),
    monthlyActiveMembers:
      Math.floor(memberCount * 0.7) + Math.floor(Math.random() * 30),
  };
};

// Generate permissions for different membership statuses
const generatePermissions = (
  membershipStatus: MembershipStatus
): CommunityPermissions => {
  switch (membershipStatus) {
    case "owner":
    case "admin":
      return {
        canPost: true,
        canReply: true,
        canModerate: true,
        canManage: true,
        canInvite: true,
        canViewMembers: true,
      };
    case "moderator":
      return {
        canPost: true,
        canReply: true,
        canModerate: true,
        canManage: false,
        canInvite: true,
        canViewMembers: true,
      };
    case "member":
      return {
        canPost: true,
        canReply: true,
        canModerate: false,
        canManage: false,
        canInvite: false,
        canViewMembers: true,
      };
    case "pending":
      return {
        canPost: false,
        canReply: false,
        canModerate: false,
        canManage: false,
        canInvite: false,
        canViewMembers: false,
      };
    case "not_member":
    default:
      return {
        canPost: false,
        canReply: false,
        canModerate: false,
        canManage: false,
        canInvite: false,
        canViewMembers: false,
      };
  }
};

// Convert basic communities to detailed communities
export const mockCommunityDetails: CommunityDetails[] = mockCommunities.map(
  (community) => {
    // Simulate different membership statuses for demo
    const membershipStatuses: MembershipStatus[] = [
      "not_member",
      "member",
      "admin",
    ];
    const randomStatus =
      membershipStatuses[Math.floor(Math.random() * membershipStatuses.length)];

    return {
      ...community,
      stats: generateCommunityStats(community.id, community.memberCount),
      recentDiscussions: getRecentDiscussions(community.id, 5),
      topMembers: getTopMembers(community.id, 6),
      joinedAt:
        randomStatus === "member" || randomStatus === "admin"
          ? new Date(
              community.createdAt.getTime() +
                Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
            )
          : undefined,
      membershipStatus: randomStatus,
      permissions: generatePermissions(randomStatus),
      bannerImage: `/images/communities/banners/${community.slug}-banner.jpg`,
      description: community.description, // Use existing description
    };
  }
);

// Helper function to get community details by slug
export const getCommunityDetailsBySlug = (
  slug: string
): CommunityDetails | null => {
  return (
    mockCommunityDetails.find((community) => community.slug === slug) || null
  );
};

// Helper function to get community details by ID
export const getCommunityDetailsById = (
  id: string
): CommunityDetails | null => {
  return mockCommunityDetails.find((community) => community.id === id) || null;
};

// Helper function to simulate joining a community
export const simulateJoinCommunity = (
  communityId: string
): { success: boolean; newMemberCount: number } => {
  const community = getCommunityDetailsById(communityId);
  if (!community) {
    return { success: false, newMemberCount: 0 };
  }

  // Simulate successful join with member count increase
  const newMemberCount = community.memberCount + 1;

  // Update the mock data (in real app, this would be handled by the backend)
  const communityIndex = mockCommunityDetails.findIndex(
    (c) => c.id === communityId
  );
  if (communityIndex !== -1) {
    mockCommunityDetails[communityIndex].memberCount = newMemberCount;
    mockCommunityDetails[communityIndex].membershipStatus = "member";
    mockCommunityDetails[communityIndex].permissions =
      generatePermissions("member");
    mockCommunityDetails[communityIndex].joinedAt = new Date();
  }

  return { success: true, newMemberCount };
};

// Helper function to simulate leaving a community
export const simulateLeaveCommunity = (
  communityId: string
): { success: boolean; newMemberCount: number } => {
  const community = getCommunityDetailsById(communityId);
  if (!community) {
    return { success: false, newMemberCount: 0 };
  }

  // Simulate successful leave with member count decrease
  const newMemberCount = Math.max(0, community.memberCount - 1);

  // Update the mock data
  const communityIndex = mockCommunityDetails.findIndex(
    (c) => c.id === communityId
  );
  if (communityIndex !== -1) {
    mockCommunityDetails[communityIndex].memberCount = newMemberCount;
    mockCommunityDetails[communityIndex].membershipStatus = "not_member";
    mockCommunityDetails[communityIndex].permissions =
      generatePermissions("not_member");
    mockCommunityDetails[communityIndex].joinedAt = undefined;
  }

  return { success: true, newMemberCount };
};

// Helper function to get community statistics
export const getCommunityStatistics = () => {
  return {
    totalCommunities: mockCommunityDetails.length,
    totalMembers: mockCommunityDetails.reduce(
      (sum, c) => sum + c.memberCount,
      0
    ),
    totalDiscussions: mockCommunityDetails.reduce(
      (sum, c) => sum + c.stats.totalDiscussions,
      0
    ),
    totalPosts: mockCommunityDetails.reduce(
      (sum, c) => sum + c.stats.totalPosts,
      0
    ),
    averageActivityScore: Math.round(
      mockCommunityDetails.reduce((sum, c) => sum + c.stats.activityScore, 0) /
        mockCommunityDetails.length
    ),
  };
};
