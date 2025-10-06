"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  UserCheck,
  Loader2,
  Crown,
  Shield,
  Users,
  UserMinus,
  AlertCircle,
} from "lucide-react";
import {
  JoinCommunityButtonProps,
  MembershipStatus,
} from "../../types/communityDetails";
import { useJoinCommunity } from "../../hooks/useCommunityDiscussions";

const getMembershipIcon = (status: MembershipStatus) => {
  switch (status) {
    case "owner":
      return <Crown className="h-4 w-4" />;
    case "admin":
    case "moderator":
      return <Shield className="h-4 w-4" />;
    case "member":
      return <UserCheck className="h-4 w-4" />;
    case "pending":
      return <Loader2 className="h-4 w-4 animate-spin" />;
    case "not_member":
    default:
      return <UserPlus className="h-4 w-4" />;
  }
};

const getMembershipLabel = (status: MembershipStatus) => {
  switch (status) {
    case "owner":
      return "Owner";
    case "admin":
      return "Admin";
    case "moderator":
      return "Moderator";
    case "member":
      return "Member";
    case "pending":
      return "Pending";
    case "not_member":
    default:
      return "Join Community";
  }
};

const getMembershipColor = (status: MembershipStatus) => {
  switch (status) {
    case "owner":
      return "bg-yellow-500 hover:bg-yellow-600 text-white";
    case "admin":
      return "bg-purple-500 hover:bg-purple-600 text-white";
    case "moderator":
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case "member":
      return "bg-green-500 hover:bg-green-600 text-white";
    case "pending":
      return "bg-orange-500 text-white cursor-not-allowed";
    case "not_member":
    default:
      return "bg-primary hover:bg-primary/90 text-primary-foreground";
  }
};

const formatMemberCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const JoinCommunityButton: React.FC<JoinCommunityButtonProps> = ({
  communityId,
  membershipStatus,
  memberCount,
  onJoinSuccess,
  onLeaveSuccess,
  disabled = false,
}) => {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const { joinCommunity, leaveCommunity, loading, error, success, reset } =
    useJoinCommunity();

  const isMember =
    membershipStatus === "member" ||
    membershipStatus === "admin" ||
    membershipStatus === "moderator" ||
    membershipStatus === "owner";

  const canLeave = membershipStatus === "member"; // Only regular members can leave
  const isOwnerOrAdmin =
    membershipStatus === "owner" || membershipStatus === "admin";

  const handleJoin = async () => {
    if (loading || disabled || isMember) return;

    try {
      await joinCommunity(communityId);
      if (onJoinSuccess) {
        onJoinSuccess();
      }
    } catch (err) {
      console.error("Failed to join community:", err);
    }
  };

  const handleLeave = async () => {
    if (loading || disabled || !canLeave) return;

    try {
      await leaveCommunity(communityId);
      setShowLeaveDialog(false);
      if (onLeaveSuccess) {
        onLeaveSuccess();
      }
    } catch (err) {
      console.error("Failed to leave community:", err);
    }
  };

  const membershipIcon = getMembershipIcon(membershipStatus);
  const membershipLabel = getMembershipLabel(membershipStatus);
  const membershipColor = getMembershipColor(membershipStatus);

  // Show error state
  if (error) {
    return (
      <div className="space-y-3">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Action Failed</span>
          </div>
          <p className="text-sm text-destructive/80 mt-1">{error}</p>
          <Button variant="outline" size="sm" onClick={reset} className="mt-2">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Action Button */}
      {!isMember ? (
        <Button
          onClick={handleJoin}
          disabled={loading || disabled || membershipStatus === "pending"}
          className={`w-full ${membershipColor}`}
          size="lg"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <>
              {membershipIcon}
              <span className="ml-2">{membershipLabel}</span>
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-2">
          {/* Member Status Display */}
          <div
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg ${membershipColor}`}
          >
            {membershipIcon}
            <span className="font-medium">{membershipLabel}</span>
          </div>

          {/* Leave Button for Regular Members */}
          {canLeave && (
            <AlertDialog
              open={showLeaveDialog}
              onOpenChange={setShowLeaveDialog}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  disabled={loading || disabled}
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Leave Community
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave Community</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to leave this community? You will lose
                    access to all discussions and content, and will need to
                    request to join again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLeave}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <UserMinus className="h-4 w-4 mr-2" />
                    )}
                    Leave Community
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )}

      {/* Member Count Display */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{formatMemberCount(memberCount)} members</span>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <UserCheck className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isMember
                ? "Successfully joined the community!"
                : "Successfully left the community."}
            </span>
          </div>
        </div>
      )}

      {/* Admin/Owner Badge */}
      {isOwnerOrAdmin && (
        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            {membershipStatus === "owner"
              ? "Community Owner"
              : "Community Admin"}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default JoinCommunityButton;
