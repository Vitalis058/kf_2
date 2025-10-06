// Community Marketplace Types

// Main Community interface
export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: CommunityCategory;
  tags: string[];
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  imageUrl?: string;
  isPublic: boolean;
  createdBy: string;
  isVerified?: boolean;
}

// Community categories
export type CommunityCategory =
  | "Technology"
  | "Finance"
  | "Marketing"
  | "Operations"
  | "Legal"
  | "HR"
  | "General";

// Community request data for form submission
export interface CommunityRequestData {
  name: string;
  description: string;
  category: CommunityCategory;
}

// Post action types for future functionality
export type PostActionType = "text" | "link" | "media";

// Component Props Types
export interface CommunityCardProps {
  community: Community;
  onPostAction?: (action: PostActionType, communityId: string) => void;
}

export interface CommunityGridProps {
  communities: Community[];
  loading?: boolean;
  error?: string | null;
}

export interface RequestCommunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CommunityRequestData) => void;
}

export interface RequestCommunityFormProps {
  onSubmit: (data: CommunityRequestData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface PostActionButtonsProps {
  communityId: string;
  disabled?: boolean;
}

// CommunityMarketplace component props (no props needed - self-contained page component)
export type CommunityMarketplaceProps = Record<string, never>;

// API Response Types (for future backend integration)
export interface GetCommunitiesResponse {
  communities: {
    items: Community[];
    totalItems: number;
  };
}

export interface CreateCommunityRequestResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

// Hook return types
export interface UseCommunityDataReturn {
  communities: Community[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseRequestCommunityReturn {
  submitRequest: (data: CommunityRequestData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

// Constants
export const COMMUNITY_CATEGORIES: {
  value: CommunityCategory;
  label: string;
}[] = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
  { value: "Operations", label: "Operations" },
  { value: "Legal", label: "Legal" },
  { value: "HR", label: "Human Resources" },
  { value: "General", label: "General" },
] as const;

export const POST_ACTION_TYPES: {
  value: PostActionType;
  label: string;
  icon: string;
}[] = [
  { value: "text", label: "Text Post", icon: "FileText" },
  { value: "link", label: "Link Post", icon: "Link" },
  { value: "media", label: "Media Post", icon: "Image" },
] as const;

// Category color mappings for UI
export const CATEGORY_COLORS: Record<CommunityCategory, string> = {
  Technology: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
  Finance: "text-green-600 bg-green-50 dark:bg-green-950/20",
  Marketing: "text-purple-600 bg-purple-50 dark:bg-purple-950/20",
  Operations: "text-orange-600 bg-orange-50 dark:bg-orange-950/20",
  Legal: "text-red-600 bg-red-50 dark:bg-red-950/20",
  HR: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20",
  General: "text-gray-600 bg-gray-50 dark:bg-gray-950/20",
};

// Category icon mappings
export const CATEGORY_ICONS: Record<CommunityCategory, string> = {
  Technology: "Laptop",
  Finance: "DollarSign",
  Marketing: "Megaphone",
  Operations: "Settings",
  Legal: "Scale",
  HR: "Users",
  General: "MessageCircle",
};
