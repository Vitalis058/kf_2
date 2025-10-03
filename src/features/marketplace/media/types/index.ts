// Media Marketplace Types

export interface MediaContent {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  authorId: string;
  category:
    | "news"
    | "article"
    | "analysis"
    | "interview"
    | "report"
    | "press_release";
  tags: string[];
  sector?: string;
  readTime: number; // minutes
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  views: number;
  likes: number;
  shares: number;
  imageUrl?: string;
  videoUrl?: string;
  attachments?: string[];
}

export interface MediaAuthor {
  id: string;
  name: string;
  email: string;
  bio: string;
  expertise: string[];
  organization?: string;
  position?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  articlesCount: number;
  verified: boolean;
}

export interface MediaCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string;
  articlesCount: number;
  featured: boolean;
}

export interface MediaComment {
  id: string;
  contentId: string;
  authorId: string;
  authorName: string;
  comment: string;
  parentId?: string; // for replies
  createdAt: string;
  updatedAt: string;
  likes: number;
  status: "published" | "pending" | "hidden";
}

export interface MediaSubscription {
  id: string;
  userId: string;
  categories: string[];
  frequency: "daily" | "weekly" | "monthly";
  email: boolean;
  push: boolean;
  createdAt: string;
  active: boolean;
}
