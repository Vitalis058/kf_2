"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Laptop,
  DollarSign,
  Megaphone,
  Settings,
  Scale,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { CommunityCardProps, CATEGORY_COLORS, CATEGORY_ICONS } from "../types";
import { PostActionButtons } from "./PostActionButtons";
import { Button } from "@/components/ui/button";

const getCategoryIcon = (category: string) => {
  const iconName =
    CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || "MessageCircle";

  switch (iconName) {
    case "Laptop":
      return <Laptop className="h-5 w-5" />;
    case "DollarSign":
      return <DollarSign className="h-5 w-5" />;
    case "Megaphone":
      return <Megaphone className="h-5 w-5" />;
    case "Settings":
      return <Settings className="h-5 w-5" />;
    case "Scale":
      return <Scale className="h-5 w-5" />;
    case "Users":
      return <Users className="h-5 w-5" />;
    case "MessageCircle":
    default:
      return <MessageCircle className="h-5 w-5" />;
  }
};

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
  const categoryIcon = getCategoryIcon(community.category);
  const categoryColor = getCategoryColor(community.category);
  const communityLink = `/marketplace/communities/${community.slug}`;

  return (
    <Link href={communityLink} className="block h-full">
      <Card
        className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-0 bg-background h-full overflow-hidden cursor-pointer"
        role="article"
        aria-label={`Community: ${community.name}`}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${categoryColor}`}
            >
              {categoryIcon}
            </div>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-medium">
                {formatMemberCount(community.memberCount)}
              </span>
              <span>members</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(community.createdAt)}</span>
            </div>
          </div>

          {/* View Community Button */}
          <div className="mt-auto space-y-3">
            <Button className="w-full pointer-events-none">
              <span className="flex items-center justify-center gap-1">
                View Community
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>

            {/* Post Action Buttons */}
            <div className="pointer-events-auto">
              <PostActionButtons communityId={community.id} disabled={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CommunityCard;
