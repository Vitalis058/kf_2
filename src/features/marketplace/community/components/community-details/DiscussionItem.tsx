"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Heart, Eye, Pin } from "lucide-react";
import { DiscussionItemProps } from "../../types/communityDetails";
import { formatDistanceToNow } from "date-fns";

export const DiscussionItem: React.FC<DiscussionItemProps> = ({
  discussion,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(discussion.id);
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "poll":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "media":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "link":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Author Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={discussion.author.avatar}
              alt={discussion.author.name}
            />
            <AvatarFallback>
              {discussion.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Discussion Content */}
          <div className="flex-1 min-w-0">
            {/* Header with author info and timestamp */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm text-foreground">
                {discussion.author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                @{discussion.author.username}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(discussion.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {discussion.author.role !== "member" && (
                <Badge variant="secondary" className="text-xs">
                  {discussion.author.role}
                </Badge>
              )}
            </div>

            {/* Title and Pin indicator */}
            <div className="flex items-start gap-2 mb-2">
              {discussion.isPinned && (
                <Pin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              )}
              <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                {discussion.title}
              </h3>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {discussion.excerpt}
            </p>

            {/* Tags and Post Type */}
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className={`text-xs ${getPostTypeColor(discussion.type)}`}
              >
                {discussion.type}
              </Badge>
              {discussion.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {discussion.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{discussion.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{discussion.replyCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{discussion.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{discussion.viewCount}</span>
              </div>
              {discussion.isLocked && (
                <Badge variant="outline" className="text-xs">
                  Locked
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionItem;
