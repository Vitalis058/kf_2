import { Community } from "./index";

// Extended community interface for details page
export interface CommunityDetails extends Community {
  stats: CommunityStats;
  recentDiscussions: Discussion[];
  topMembers: CommunityMember[];
  joinedAt?: Date;
  membershipStatus: MembershipStatus;
  permissions: CommunityPermissions;
  bannerImage?: string;
  description: string; // Extended description for details page
}

// Community statistics
export interface CommunityStats {
  totalMembers: number;
  memberGrowthRate: number; // Percentage growth in last 30 days
  totalPosts: number;
  totalDiscussions: number;
  activityScore: number; // 0-100 activity rating
  lastActivityAt: Date;
  weeklyActiveMembers: number;
  monthlyActiveMembers: number;
}

// Discussion/Post interface
export interface Discussion {
  id: string;
  title: string;
  content: string;
  excerpt: string; // Short preview of content
  author: CommunityMember;
  createdAt: Date;
  updatedAt: Date;
  replyCount: number;
  likeCount: number;
  viewCount: number;
  type: PostType;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  communityId: string;
}

// Community member interface
export interface CommunityMember {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: MemberRole;
  joinedAt: Date;
  postCount: number;
  replyCount: number;
  reputation: number;
  isOnline: boolean;
  lastSeenAt: Date;
  bio?: string;
}

// Community permissions for current user
export interface CommunityPermissions {
  canPost: boolean;
  canReply: boolean;
  canModerate: boolean;
  canManage: boolean;
  canInvite: boolean;
  canViewMembers: boolean;
}

// Enums and types
export type MembershipStatus =
  | "not_member"
  | "pending"
  | "member"
  | "admin"
  | "moderator"
  | "owner"
  | "banned";

export type MemberRole = "member" | "moderator" | "admin" | "owner";

export type PostType =
  | "text"
  | "link"
  | "media"
  | "poll"
  | "event"
  | "announcement";

// API Response interfaces
export interface GetCommunityDetailsResponse {
  community: CommunityDetails;
  success: boolean;
  message?: string;
}

export interface JoinCommunityResponse {
  success: boolean;
  message: string;
  membershipStatus: MembershipStatus;
  memberCount: number;
}

export interface LeaveCommunityResponse {
  success: boolean;
  message: string;
  memberCount: number;
}

export interface GetDiscussionsResponse {
  discussions: Discussion[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface GetMembersResponse {
  members: CommunityMember[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  type: PostType;
  tags?: string[];
  isPinned?: boolean;
  linkUrl?: string; // For link posts
  pollOptions?: string[]; // For poll posts
  eventDate?: Date; // For event posts
  eventLocation?: string; // For event posts
}

export interface CreatePostResponse {
  success: boolean;
  message: string;
  post?: Discussion;
}

// Pagination options
export interface PaginationOptions {
  limit?: number;
  cursor?: string;
  sortBy?: "recent" | "popular" | "oldest";
  filterBy?: {
    type?: PostType;
    author?: string;
    tags?: string[];
  };
}

// Hook return types
export interface UseCommunityDetailsReturn {
  community: CommunityDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  joinCommunity: () => Promise<void>;
  leaveCommunity: () => Promise<void>;
  isMember: boolean;
  canPost: boolean;
  membershipStatus: MembershipStatus;
}

export interface UseCommunityDiscussionsReturn {
  discussions: Discussion[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  createPost: (data: CreatePostData) => Promise<void>;
  refetch: () => void;
  totalCount: number;
}

export interface UseJoinCommunityReturn {
  joinCommunity: (communityId: string) => Promise<void>;
  leaveCommunity: (communityId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

// Component prop interfaces
export interface CommunityDetailsPageProps {
  slug: string;
}

export interface CommunityHeaderProps {
  community: CommunityDetails;
  isLoading?: boolean;
  onJoinCommunity?: () => void;
  onLeaveCommunity?: () => void;
}

export interface CommunityStatsProps {
  stats: CommunityStats;
  isLoading?: boolean;
}

export interface CommunityDiscussionsProps {
  communityId: string;
  canPost?: boolean;
  onCreatePost?: (type: PostType) => void;
}

export interface DiscussionItemProps {
  discussion: Discussion;
  onClick?: (discussionId: string) => void;
}

export interface JoinCommunityButtonProps {
  communityId: string;
  membershipStatus: MembershipStatus;
  memberCount: number;
  onJoinSuccess?: () => void;
  onLeaveSuccess?: () => void;
  disabled?: boolean;
}

export interface PostCreationActionsProps {
  communityId: string;
  canPost: boolean;
  onCreatePost: (type: PostType) => void;
}

export interface CommunityMembersProps {
  communityId: string;
  members: CommunityMember[];
  totalCount: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}
export interface CommunityDetailsPageProps {
  slug: string;
  onBack?: () => void;
}
