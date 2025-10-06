"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  UserCheck,
} from "lucide-react";
import { CommunityStatsProps } from "../../types/communityDetails";

const formatNumber = (num: number | undefined | null): string => {
  if (num == null || num === undefined) {
    return "0";
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

const formatPercentage = (num: number): string => {
  return `${num > 0 ? "+" : ""}${num.toFixed(1)}%`;
};

const getActivityLevel = (score: number): { label: string; color: string } => {
  if (score >= 80)
    return {
      label: "Very Active",
      color: "text-green-600 bg-green-50 dark:bg-green-950/20",
    };
  if (score >= 60)
    return {
      label: "Active",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
    };
  if (score >= 40)
    return {
      label: "Moderate",
      color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20",
    };
  if (score >= 20)
    return {
      label: "Low",
      color: "text-orange-600 bg-orange-50 dark:bg-orange-950/20",
    };
  return {
    label: "Inactive",
    color: "text-red-600 bg-red-50 dark:bg-red-950/20",
  };
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
};

// Loading skeleton for community stats
const CommunityStatsSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-4 w-4 mx-auto" />
              <Skeleton className="h-8 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    </div>
  </div>
);

export const CommunityStats: React.FC<CommunityStatsProps> = ({
  stats,
  isLoading = false,
}) => {
  if (isLoading || !stats) {
    return <CommunityStatsSkeleton />;
  }

  const activityLevel = getActivityLevel(stats.activityScore);

  console.log(stats);

  return (
    <div className="space-y-6">
      {/* Main Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Community Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Total Members */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(stats.totalMembers)}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
              {stats.memberGrowthRate > 0 && (
                <div className="text-xs text-green-600 mt-1">
                  {formatPercentage(stats.memberGrowthRate)} this month
                </div>
              )}
            </div>

            {/* Total Discussions */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(stats.totalDiscussions)}
              </div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>

            {/* Total Posts */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(stats.totalPosts)}
              </div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>

            {/* Activity Score */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stats.activityScore}
              </div>
              <div className="text-sm text-muted-foreground">
                Activity Score
              </div>
              <Badge
                variant="secondary"
                className={`text-xs mt-1 ${activityLevel.color}`}
              >
                {activityLevel.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserCheck className="h-4 w-4" />
              Member Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Weekly Active
              </span>
              <span className="font-semibold">
                {formatNumber(stats.weeklyActiveMembers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Monthly Active
              </span>
              <span className="font-semibold">
                {formatNumber(stats.monthlyActiveMembers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Engagement Rate
              </span>
              <span className="font-semibold">
                {(
                  (stats.weeklyActiveMembers / stats.totalMembers) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Last Activity
              </span>
              <span className="font-semibold">
                {formatTimeAgo(stats.lastActivityAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Avg. Posts/Day
              </span>
              <span className="font-semibold">
                {(stats.totalPosts / 30).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Posts per Member
              </span>
              <span className="font-semibold">
                {(stats.totalPosts / stats.totalMembers).toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics */}
      {stats.memberGrowthRate > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Member Growth (30 days)
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatPercentage(stats.memberGrowthRate)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">New Members</div>
                <div className="text-lg font-semibold">
                  +
                  {Math.floor(
                    stats.totalMembers * (stats.memberGrowthRate / 100)
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityStats;
