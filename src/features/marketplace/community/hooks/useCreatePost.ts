"use client";

import { useState, useCallback } from "react";
import { CreatePostData } from "../types/communityDetails";
import { communityDetailsService } from "../services/communityDetailsService";

export interface UseCreatePostReturn {
  createPost: (communityId: string, data: CreatePostData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useCreatePost = (): UseCreatePostReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createPost = useCallback(
    async (communityId: string, data: CreatePostData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        // Validate required fields
        if (!data.title?.trim()) {
          throw new Error("Post title is required");
        }
        if (!data.content?.trim()) {
          throw new Error("Post content is required");
        }
        if (data.type === "link" && !data.linkUrl?.trim()) {
          throw new Error("Link URL is required for link posts");
        }
        if (
          data.type === "poll" &&
          (!data.pollOptions || data.pollOptions.length < 2)
        ) {
          throw new Error("At least 2 poll options are required");
        }

        // Create the post via service
        const response = await communityDetailsService.createPost(
          communityId,
          data
        );

        if (!response.success) {
          throw new Error(response.message || "Failed to create post");
        }

        setSuccess(true);

        // Log success for debugging
        console.log("Post created successfully:", {
          postId: response.post?.id,
          communityId,
          type: data.type,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create post";
        setError(errorMessage);
        console.error("Error creating post:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    createPost,
    loading,
    error,
    success,
    reset,
  };
};

export default useCreatePost;
