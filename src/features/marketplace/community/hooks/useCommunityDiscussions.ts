"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Discussion,
  UseCommunityDiscussionsReturn,
  CreatePostData,
  PaginationOptions,
} from "../types/communityDetails";
import { communityDetailsService } from "../services/communityDetailsService";

interface UseCommunityDiscussionsOptions {
  sortBy?: "recent" | "popular" | "oldest";
  limit?: number;
  autoFetch?: boolean;
}

export const useCommunityDiscussions = (
  communityId: string,
  options: UseCommunityDiscussionsOptions = {}
): UseCommunityDiscussionsReturn => {
  const { sortBy = "recent", limit = 10, autoFetch = true } = options;

  // State management
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [createPostLoading, setCreatePostLoading] = useState(false);

  // Fetch discussions function
  const fetchDiscussions = useCallback(
    async (reset: boolean = true) => {
      if (!communityId) return;

      setLoading(true);
      setError(null);

      try {
        const paginationOptions: PaginationOptions = {
          limit,
          sortBy,
          cursor: reset ? undefined : nextCursor,
        };

        const response = await communityDetailsService.getCommunityDiscussions(
          communityId,
          paginationOptions
        );

        if (reset) {
          setDiscussions(response.discussions);
        } else {
          setDiscussions((prev) => [...prev, ...response.discussions]);
        }

        setHasMore(response.hasMore);
        setTotalCount(response.totalCount);
        setNextCursor(response.nextCursor);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load discussions";
        setError(errorMessage);
        console.error("Error fetching discussions:", err);
      } finally {
        setLoading(false);
      }
    },
    [communityId, limit, sortBy, nextCursor]
  );

  // Load more discussions (pagination)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await fetchDiscussions(false);
  }, [loading, hasMore, fetchDiscussions]);

  // Create new post function
  const createPost = useCallback(
    async (postData: CreatePostData) => {
      if (!communityId || createPostLoading) return;

      setCreatePostLoading(true);
      setError(null);

      try {
        // Validate post data
        if (!postData.title?.trim()) {
          throw new Error("Post title is required");
        }
        if (!postData.content?.trim()) {
          throw new Error("Post content is required");
        }

        const response = await communityDetailsService.createPost(
          communityId,
          postData
        );

        if (response.success && response.post) {
          // Add new post to the beginning of discussions list
          setDiscussions((prev) => [response.post!, ...prev]);
          setTotalCount((prev) => prev + 1);

          // Log success for debugging
          console.log("Successfully created post:", {
            postId: response.post.id,
            communityId,
            title: postData.title,
            type: postData.type,
            timestamp: new Date().toISOString(),
          });
        } else {
          throw new Error(response.message || "Failed to create post");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create post";
        setError(errorMessage);
        console.error("Error creating post:", err);
        throw err; // Re-throw to allow component to handle it
      } finally {
        setCreatePostLoading(false);
      }
    },
    [communityId, createPostLoading]
  );

  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchDiscussions(true);
  }, [fetchDiscussions]);

  // Effect to fetch data when dependencies change
  useEffect(() => {
    if (autoFetch && communityId) {
      fetchDiscussions(true);
    }
  }, [communityId, sortBy, limit, autoFetch, fetchDiscussions]);

  // Return hook interface
  return {
    discussions,
    loading: loading || createPostLoading,
    error,
    hasMore,
    loadMore,
    createPost,
    refetch,
    totalCount,
  };
};

// Additional hook for join community functionality (separate concern)
export const useJoinCommunity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const joinCommunity = useCallback(async (communityId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await communityDetailsService.joinCommunity(communityId);

      if (response.success) {
        setSuccess(true);
        console.log("Successfully joined community:", {
          communityId,
          memberCount: response.memberCount,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error(response.message || "Failed to join community");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to join community";
      setError(errorMessage);
      console.error("Error joining community:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const leaveCommunity = useCallback(async (communityId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await communityDetailsService.leaveCommunity(
        communityId
      );

      if (response.success) {
        setSuccess(true);
        console.log("Successfully left community:", {
          communityId,
          memberCount: response.memberCount,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error(response.message || "Failed to leave community");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to leave community";
      setError(errorMessage);
      console.error("Error leaving community:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    joinCommunity,
    leaveCommunity,
    loading,
    error,
    success,
    reset,
  };
};
