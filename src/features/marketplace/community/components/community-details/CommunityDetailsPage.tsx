"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  Flag,
  MoreHorizontal,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommunityHeader } from "./CommunityHeader";
import { CommunityStats } from "./CommunityStats";
import { JoinCommunityButton } from "./JoinCommunityButton";
import { CommunityDiscussions } from "./CommunityDiscussions";
import { PostCreationActions } from "./PostCreationActions";
import { useCommunityDetails } from "../../hooks/useCommunityDetails";
import {
  CommunityDetailsPageProps,
  PostType,
} from "../../types/communityDetails";
import { useRouter } from "next/navigation";

export const CommunityDetailsPage: React.FC<CommunityDetailsPageProps> = ({
  slug,
  onBack,
}) => {
  const router = useRouter();
  const {
    community,
    loading: communityLoading,
    error: communityError,
    isMember,
  } = useCommunityDetails(slug);

  // CommunityDiscussions manages its own data fetching

  const handleShare = async () => {
    if (navigator.share && community) {
      try {
        await navigator.share({
          title: community.name,
          text: community.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log("Report community:", slug);
  };

  const handleCreatePost = (postType: PostType) => {
    // TODO: Implement post creation
    console.log("Create post:", postType, "in community:", slug);
  };

  if (communityLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 bg-muted rounded"></div>
              <div className="w-32 h-6 bg-muted rounded"></div>
            </div>

            {/* Community header skeleton */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-48 h-8 bg-muted rounded"></div>
                  <div className="w-full h-4 bg-muted rounded"></div>
                  <div className="w-3/4 h-4 bg-muted rounded"></div>
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="flex gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-1">
                    <div className="w-12 h-6 bg-muted rounded"></div>
                    <div className="w-16 h-4 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (communityError || !community) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onBack ? onBack() : router.push("/marketplace/communities")
              }
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Community Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The community you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Button
              onClick={() =>
                onBack ? onBack() : router.push("/marketplace/communities")
              }
            >
              Return to Communities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onBack ? onBack() : router.push("/marketplace/communities")
              }
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Communities
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {community.category}
              </Badge>
              {community.isVerified && (
                <Badge variant="default" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Community
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleReport}
                  className="text-destructive focus:text-destructive"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Report Community
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Community Header Section */}
        <div className="space-y-6 mb-8">
          <CommunityHeader community={community} />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <CommunityStats
                stats={community.stats}
                isLoading={communityLoading}
              />
            </div>

            <div className="lg:w-auto">
              <JoinCommunityButton
                communityId={community.id}
                membershipStatus={community.membershipStatus}
                memberCount={community.memberCount}
                onJoinSuccess={() => {
                  // Handle successful join
                  console.log("Successfully joined community");
                }}
                onLeaveSuccess={() => {
                  // Handle successful leave
                  console.log("Successfully left community");
                }}
              />
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Creation Actions */}
            <PostCreationActions
              communityId={community.id}
              canPost={isMember}
              onCreatePost={handleCreatePost}
            />

            {/* Discussions */}
            <CommunityDiscussions
              communityId={community.id}
              canPost={isMember}
              onCreatePost={(type: PostType) => {
                // Future: Handle post creation
                console.log("Create post of type:", type);
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Quick Stats */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Community Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Recent Posts
                  </div>
                  <span className="text-sm font-medium">
                    {community.stats.totalDiscussions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Active Today
                  </div>
                  <span className="text-sm font-medium">
                    {community.stats.weeklyActiveMembers}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Created
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(community.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Growth Rate
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +{community.stats.memberGrowthRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Community Rules/Guidelines */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-foreground">1.</span>
                  <span>Be respectful and constructive in discussions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-foreground">2.</span>
                  <span>Stay on topic and relevant to the community</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-foreground">3.</span>
                  <span>No spam, self-promotion, or duplicate posts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-foreground">4.</span>
                  <span>Use appropriate tags and categories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsPage;
