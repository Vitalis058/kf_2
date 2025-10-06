"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CommunityDetails,
  UseCommunityDetailsReturn,
  MembershipStatus,
} from "../types/communityDetails";
import { communityDetailsService } from "../services/communityDetailsService";

export const useCommunityDetails = (
  slug: string
): UseCommunityDetailsReturn => {
  // State management
  const [community, setCommunity] = useState<CommunityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinLoading, setJoinLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);

  // Fetch community details
  const fetchCommunityDetails = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await communityDetailsService.getCommunityBySlug(slug);

      if (response.success && response.community) {
        setCommunity(response.community);
      } else {
        setError(response.message || "Community not found");
        setCommunity(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load community details";
      setError(errorMessage);
      setCommunity(null);
      console.error("Error fetching community details:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Join community function
  const joinCommunity = useCallback(async () => {
    if (!community || joinLoading || community.membershipStatus === "member")
      return;

    setJoinLoading(true);
    setError(null);

    try {
      const response = await communityDetailsService.joinCommunity(
        community.id
      );

      if (response.success) {
        // Update community state with new membership status and member count
        setCommunity((prev) =>
          prev
            ? {
                ...prev,
                membershipStatus: response.membershipStatus,
                memberCount: response.memberCount,
                joinedAt: new Date(),
                permissions: {
                  canPost: true,
                  canReply: true,
                  canModerate: false,
                  canManage: false,
                  canInvite: false,
                  canViewMembers: true,
                },
              }
            : null
        );

        // Log success for debugging
        console.log("Successfully joined community:", {
          communityId: community.id,
          newMemberCount: response.memberCount,
          timestamp: new Date().toISOString(),
        });
      } else {
        setError(response.message || "Failed to join community");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to join community";
      setError(errorMessage);
      console.error("Error joining community:", err);
    } finally {
      setJoinLoading(false);
    }
  }, [community, joinLoading]);

  // Leave community function
  const leaveCommunity = useCallback(async () => {
    if (
      !community ||
      leaveLoading ||
      community.membershipStatus === "not_member"
    )
      return;

    setLeaveLoading(true);
    setError(null);

    try {
      const response = await communityDetailsService.leaveCommunity(
        community.id
      );

      if (response.success) {
        // Update community state with new membership status and member count
        setCommunity((prev) =>
          prev
            ? {
                ...prev,
                membershipStatus: "not_member" as MembershipStatus,
                memberCount: response.memberCount,
                joinedAt: undefined,
                permissions: {
                  canPost: false,
                  canReply: false,
                  canModerate: false,
                  canManage: false,
                  canInvite: false,
                  canViewMembers: false,
                },
              }
            : null
        );

        // Log success for debugging
        console.log("Successfully left community:", {
          communityId: community.id,
          newMemberCount: response.memberCount,
          timestamp: new Date().toISOString(),
        });
      } else {
        setError(response.message || "Failed to leave community");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to leave community";
      setError(errorMessage);
      console.error("Error leaving community:", err);
    } finally {
      setLeaveLoading(false);
    }
  }, [community, leaveLoading]);

  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchCommunityDetails();
  }, [fetchCommunityDetails]);

  // Computed values
  const isMember =
    community?.membershipStatus === "member" ||
    community?.membershipStatus === "admin" ||
    community?.membershipStatus === "moderator" ||
    community?.membershipStatus === "owner";

  const canPost = community?.permissions?.canPost || false;
  const membershipStatus = community?.membershipStatus || "not_member";

  // Effect to fetch data when slug changes
  useEffect(() => {
    fetchCommunityDetails();
  }, [fetchCommunityDetails]);

  // Return hook interface
  return {
    community,
    loading: loading || joinLoading || leaveLoading,
    error,
    refetch,
    joinCommunity,
    leaveCommunity,
    isMember,
    canPost,
    membershipStatus,
  };
};
