"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Users } from "lucide-react";
import { CommunityGridProps } from "../types";
import { CommunityCard } from "./CommunityCard";

// Loading skeleton component for community cards
const CommunityCardSkeleton = () => (
  <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-pulse">
    <div className="flex items-start justify-between">
      <Skeleton className="h-12 w-12 rounded-lg bg-muted" />
      <Skeleton className="h-6 w-20 rounded-full bg-muted" />
    </div>
    <Skeleton className="h-6 w-3/4 bg-muted" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full bg-muted" />
      <Skeleton className="h-4 w-2/3 bg-muted" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16 rounded-full bg-muted" />
      <Skeleton className="h-5 w-20 rounded-full bg-muted" />
      <Skeleton className="h-5 w-14 rounded-full bg-muted" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 bg-muted" />
      <Skeleton className="h-4 w-32 bg-muted" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-8 flex-1 bg-muted" />
      <Skeleton className="h-8 flex-1 bg-muted" />
      <Skeleton className="h-8 flex-1 bg-muted" />
    </div>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <Users className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      No communities found
    </h3>
    <p className="text-muted-foreground max-w-md">
      We couldn&apos;t find any communities matching your criteria. Try
      adjusting your search or browse all communities.
    </p>
  </div>
);

// Error state component
const ErrorState = ({ error }: { error: string }) => (
  <div className="col-span-full">
    <Alert
      variant="destructive"
      className="border-destructive/50 bg-destructive/10"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-destructive-foreground">
        <strong>Error loading communities:</strong>{" "}
        {error ||
          "Something went wrong while loading communities. Please try again."}
      </AlertDescription>
    </Alert>
  </div>
);

export const CommunityGrid: React.FC<CommunityGridProps> = ({
  communities,
  loading = false,
  error = null,
}) => {
  // Show error state
  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ErrorState error={error} />
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <CommunityCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (!communities || communities.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <EmptyState />
      </div>
    );
  }

  // Show communities grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          onPostAction={(action, communityId) => {
            // Future functionality - for now just log
            console.log(`Post action: ${action} for community: ${communityId}`);
          }}
        />
      ))}
    </div>
  );
};

export default CommunityGrid;
