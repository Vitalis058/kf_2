"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  Users,
  Calendar,
  ArrowLeft,
  Laptop,
  DollarSign,
  Megaphone,
  Settings,
  Scale,
  MessageCircle,
} from "lucide-react";
import { CommunityHeaderProps } from "../../types/communityDetails";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../../types";
import { JoinCommunityButton } from "./JoinCommunityButton";

const getCategoryIcon = (category: string) => {
  const iconName =
    CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || "MessageCircle";

  switch (iconName) {
    case "Laptop":
      return <Laptop className="h-6 w-6" />;
    case "DollarSign":
      return <DollarSign className="h-6 w-6" />;
    case "Megaphone":
      return <Megaphone className="h-6 w-6" />;
    case "Settings":
      return <Settings className="h-6 w-6" />;
    case "Scale":
      return <Scale className="h-6 w-6" />;
    case "Users":
      return <Users className="h-6 w-6" />;
    case "MessageCircle":
    default:
      return <MessageCircle className="h-6 w-6" />;
  }
};

const getCategoryColor = (category: string) => {
  return (
    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    CATEGORY_COLORS.General
  );
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

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

// Loading skeleton for community header
const CommunityHeaderSkeleton = () => (
  <div className="bg-background border-b">
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left content */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>

        {/* Right content */}
        <div className="lg:w-80 space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  community,
  isLoading = false,
  onJoinCommunity,
  onLeaveCommunity,
}) => {
  if (isLoading || !community) {
    return <CommunityHeaderSkeleton />;
  }

  const categoryIcon = getCategoryIcon(community.category);
  const categoryColor = getCategoryColor(community.category);

  return (
    <div className="bg-background border-b">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 mb-6 text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/marketplace/communities"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Community Marketplace
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium truncate">
            {community.name}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Content - Community Info */}
          <div className="flex-1">
            {/* Community Header */}
            <div className="flex items-start gap-4 mb-6">
              {/* Community Icon */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColor}`}
              >
                {categoryIcon}
              </div>

              {/* Community Name and Category */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                  {community.name}
                </h1>
                <Badge
                  variant="secondary"
                  className={`${categoryColor} border-current`}
                >
                  {community.category}
                </Badge>
              </div>
            </div>

            {/* Community Description */}
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {community.description}
              </p>
            </div>

            {/* Community Tags */}
            {community.tags && community.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Actions and Stats */}
          <div className="lg:w-80 space-y-4">
            {/* Join/Member Button */}
            <JoinCommunityButton
              communityId={community.id}
              membershipStatus={community.membershipStatus}
              memberCount={community.memberCount}
              onJoinSuccess={onJoinCommunity}
              onLeaveSuccess={onLeaveCommunity}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Members
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatMemberCount(community.memberCount)}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Created
                  </span>
                </div>
                <div className="text-sm font-bold text-foreground">
                  {formatDate(community.createdAt)}
                </div>
              </div>
            </div>

            {/* Membership Info */}
            {community.membershipStatus === "member" && community.joinedAt && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">
                    Member since
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(community.joinedAt)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
