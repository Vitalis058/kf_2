"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CommunityCardProps, CATEGORY_COLORS } from "../types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getCategoryColor = (category: string) => {
  return (
    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    CATEGORY_COLORS.General
  );
};

const formatMemberCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const categoryColor = getCategoryColor(community.category);
  const communityLink = `/marketplace/communities/${community.slug}`;

  return (
    <Link href={communityLink} className="block h-full">
      <Card
        className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-border/50 hover:border-primary/30 bg-background h-full overflow-hidden cursor-pointer"
        role="article"
        aria-label={`Community: ${community.name}`}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header with Avatar and Category */}
          <div className="flex items-start justify-between mb-4">
            <Avatar className="h-12 w-12 border-2 border-border/20">
              <AvatarImage
                src={community.imageUrl}
                alt={`${community.name} avatar`}
              />
              <AvatarFallback
                className={`text-sm font-semibold ${categoryColor}`}
              >
                {community.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="outline"
              className={`text-xs ${categoryColor} border-current`}
            >
              {community.category}
            </Badge>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200"
            id={`community-title-${community.id}`}
          >
            {community.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
            {community.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {community.tags.slice(0, 3).map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {community.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{community.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="space-y-2 mb-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">
                {formatMemberCount(community.memberCount)}
              </span>
              <span> members</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>Created {formatDate(community.createdAt)}</span>
            </div>
          </div>

          {/* View Community Button */}
          <div className="mt-auto">
            <Button className="w-full pointer-events-none">
              <span className="flex items-center justify-center gap-1">
                View Community
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CommunityCard;
