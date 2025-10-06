import {
  CommunityDetails,
  CommunityStats,
  CommunityPermissions,
  MembershipStatus,
  CreatePostData,
  Discussion,
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
// Helper function to simulate creating a post
export const simulateCreatePost = (
  communityId: string,
  postData: CreatePostData
): { success: boolean; post?: Discussion } => {
  const community = getCommunityDetailsById(communityId);
  if (!community) {
    return { success: false };
  }

  // Create a new post/discussion
  const newPost: Discussion = {
    id: `post_${Date.now()}`,
    title: postData.title,
    content: postData.content,
    excerpt:
      postData.content.substring(0, 150) +
      (postData.content.length > 150 ? "..." : ""),
    author: {
      id: "current_user",
      name: "Current User",
      username: "currentuser",
      avatar: "/images/avatars/current-user.jpg",
      role: "member",
      joinedAt: new Date(),
      postCount: 1,
      replyCount: 0,
      reputation: 10,
      isOnline: true,
      lastSeenAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    replyCount: 0,
    likeCount: 0,
    viewCount: 1,
    type: postData.type,
    tags: postData.tags || [],
    isPinned: postData.isPinned || false,
    isLocked: false,
    communityId,
  };

  // Add type-specific content modifications
  if (postData.type === "link" && postData.linkUrl) {
    newPost.content += `\n\nLink: ${postData.linkUrl}`;
  }

  if (postData.type === "poll" && postData.pollOptions) {
    newPost.content += `\n\nPoll Options:\n${postData.pollOptions
      .map((opt, i) => `${i + 1}. ${opt}`)
      .join("\n")}`;
  }

  if (postData.type === "event") {
    if (postData.eventDate) {
      newPost.content += `\n\nEvent Date: ${postData.eventDate.toLocaleDateString()}`;
    }
    if (postData.eventLocation) {
      newPost.content += `\nLocation: ${postData.eventLocation}`;
    }
  }

  // Update community stats (simulate)
  const communityIndex = mockCommunityDetails.findIndex(
    (c) => c.id === communityId
  );
  if (communityIndex !== -1) {
    mockCommunityDetails[communityIndex].stats.totalPosts += 1;
    mockCommunityDetails[communityIndex].stats.totalDiscussions += 1;
    mockCommunityDetails[communityIndex].stats.lastActivityAt = new Date();

    // Add to recent discussions
    mockCommunityDetails[communityIndex].recentDiscussions.unshift(newPost);
    // Keep only the 5 most recent
    mockCommunityDetails[communityIndex].recentDiscussions =
      mockCommunityDetails[communityIndex].recentDiscussions.slice(0, 5);
  }

  return { success: true, post: newPost };
};
