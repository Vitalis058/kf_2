"use client";

import { useState, useCallback } from "react";
import { CommunityRequestData, UseRequestCommunityReturn } from "../types";
import { CommunityAPI } from "../services/communityService";

export const useRequestCommunity = (): UseRequestCommunityReturn => {
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Submit request function
  const submitRequest = useCallback(async (data: CommunityRequestData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate data before submission
      if (!data.name?.trim()) {
        throw new Error("Community name is required");
      }
      if (!data.description?.trim()) {
        throw new Error("Community description is required");
      }
      if (!data.category) {
        throw new Error("Community category is required");
      }

      // Submit the request
      const response = await CommunityAPI.createCommunityRequest(data);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to submit community request"
        );
      }

      setSuccess(true);

      // Log success for debugging (as specified in requirements)
      console.log("Community request submitted successfully:", {
        requestId: response.requestId,
        timestamp: new Date().toISOString(),
        data,
      });

      // Success - no need to return anything
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to submit community request";
      setError(errorMessage);
      console.error("Error submitting community request:", err);
      // Don't re-throw - handle error internally via state
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset function to clear state
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    submitRequest,
    loading,
    error,
    success,
    reset,
  };
};
