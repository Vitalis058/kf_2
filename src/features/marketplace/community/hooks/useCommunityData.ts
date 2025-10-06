"use client";

import { useState, useEffect, useCallback } from "react";
import { Community, UseCommunityDataReturn } from "../types";
import { CommunityAPI, getMockCommunities } from "../services/communityService";

interface UseCommunityDataOptions {
  search?: string;
  category?: string;
  take?: number;
  skip?: number;
}

export const useCommunityData = (
  options: UseCommunityDataOptions = {}
): UseCommunityDataReturn => {
  const { search = "", category = "all", take = 12, skip = 0 } = options;

  // State
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch communities function
  const fetchCommunities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first, fallback to mock data
      let response;

      try {
        response = await CommunityAPI.getCommunities({
          take,
          skip,
          category: category !== "all" ? category : undefined,
          search: search.trim() || undefined,
        });
      } catch (apiError) {
        console.warn("Community API not available, using mock data:", apiError);
        response = await getMockCommunities();

        // Apply client-side filtering for mock data
        let filteredCommunities = response.communities.items;

        // Filter by category
        if (category && category !== "all") {
          filteredCommunities = filteredCommunities.filter(
            (community) => community.category === category
          );
        }

        // Filter by search query
        if (search.trim()) {
          const searchLower = search.toLowerCase();
          filteredCommunities = filteredCommunities.filter(
            (community) =>
              community.name.toLowerCase().includes(searchLower) ||
              community.description.toLowerCase().includes(searchLower) ||
              community.tags.some((tag) =>
                tag.toLowerCase().includes(searchLower)
              )
          );
        }

        // Apply pagination
        const startIndex = skip;
        const endIndex = startIndex + take;
        filteredCommunities = filteredCommunities.slice(startIndex, endIndex);

        response = {
          communities: {
            items: filteredCommunities,
            totalItems: filteredCommunities.length,
          },
        };
      }

      setCommunities(response.communities.items);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch communities";
      setError(errorMessage);
      console.error("Error fetching communities:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category, take, skip]);

  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  // Effect to fetch data when dependencies change
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (search.trim()) {
      const debounceTimer = setTimeout(() => {
        fetchCommunities();
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      fetchCommunities();
    }
  }, [search, fetchCommunities]); // Include fetchCommunities dependency

  return {
    communities,
    loading,
    error,
    refetch,
  };
};
