"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Users, Calendar, ArrowLeft, Shield } from "lucide-react";
import { CommunityHeaderProps } from "../../types/communityDetails";
import { CATEGORY_COLORS } from "../../types";
import { JoinCommunityButton } from "./JoinCommunityButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <Skeleton className="h-20 w-20 rounded-full" />
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

  const categoryColor = getCategoryColor(community.category);

  return (
    <div className="bg-background">
      {/* Banner Image */}
      {community.bannerImage && (
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/10 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={community.bannerImage}
            alt={`${community.name} banner`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="border-b">
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
              <div className="flex items-start gap-6 mb-6">
                {/* Community Avatar */}
                <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={community.imageUrl}
                    alt={`${community.name} community avatar`}
                  />
                  <AvatarFallback
                    className={`text-2xl font-bold ${categoryColor}`}
                  >
                    {community.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Community Name and Category */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {community.name}
                    </h1>
                    {community.isVerified && (
                      <Shield className="h-6 w-6 text-blue-600 fill-blue-100" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`${categoryColor} border-current`}
                    >
                      {community.category}
                    </Badge>
                    {community.isVerified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
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
              {community.membershipStatus === "member" &&
                community.joinedAt && (
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
    </div>
  );
};

export default CommunityHeader;
