"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Plus,
  SortAsc,
  RefreshCw,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import {
  CommunityDiscussionsProps,
  PostType,
} from "../../types/communityDetails";
import { useCommunityDiscussions } from "../../hooks/useCommunityDiscussions";
import { DiscussionItem } from "./DiscussionItem";
import { PostCreationActions } from "./PostCreationActions";

// Loading skeleton for discussions
const DiscussionsLoadingSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Empty state component
const EmptyDiscussionsState = ({ canPost }: { canPost: boolean }) => (
  <Card>
    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No discussions yet
      </h3>
      <p className="text-muted-foreground max-w-md mb-4">
        {canPost
          ? "Be the first to start a discussion in this community! Share your thoughts, ask questions, or start a conversation."
          : "This community doesn't have any discussions yet. Join the community to participate in conversations."}
      </p>
      {canPost && (
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Start a Discussion
        </Button>
      )}
    </CardContent>
  </Card>
);

// Error state component
const DiscussionsErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <Card>
    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Failed to load discussions
      </h3>
      <p className="text-muted-foreground max-w-md mb-4">
        {error ||
          "Something went wrong while loading discussions. Please try again."}
      </p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </CardContent>
  </Card>
);

export const CommunityDiscussions: React.FC<CommunityDiscussionsProps> = ({
  communityId,
  canPost = false,
  onCreatePost,
}) => {
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "oldest">(
    "recent"
  );

  const {
    discussions,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    totalCount,
  } = useCommunityDiscussions(communityId, { sortBy, limit: 10 });

  const handleCreatePost = (type: PostType) => {
    if (onCreatePost) {
      onCreatePost(type);
    }
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy as "recent" | "popular" | "oldest");
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMore();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>
                Discussions
                {totalCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {totalCount}
                  </Badge>
                )}
              </CardTitle>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Options */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[140px]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Post Creation Actions */}
      {canPost && (
        <PostCreationActions
          communityId={communityId}
          canPost={canPost}
          onCreatePost={handleCreatePost}
        />
      )}

      {/* Discussions Content */}
      {error ? (
        <DiscussionsErrorState error={error} onRetry={refetch} />
      ) : loading && discussions.length === 0 ? (
        <DiscussionsLoadingSkeleton />
      ) : discussions.length === 0 ? (
        <EmptyDiscussionsState canPost={canPost} />
      ) : (
        <div className="space-y-4">
          {/* Discussions List */}
          {discussions.map((discussion) => (
            <DiscussionItem
              key={discussion.id}
              discussion={discussion}
              onClick={(discussionId) => {
                // Future: Navigate to discussion detail page
                console.log("Navigate to discussion:", discussionId);
              }}
            />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Load More
                  </>
                )}
              </Button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && discussions.length > 5 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                You&apos;ve reached the end of the discussions
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityDiscussions;
