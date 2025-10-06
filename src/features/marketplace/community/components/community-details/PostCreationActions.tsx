"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PenTool,
  Link,
  Image,
  BarChart3,
  Calendar,
  Megaphone,
  Plus,
} from "lucide-react";
import {
  PostCreationActionsProps,
  PostType,
  CreatePostData,
} from "../../types/communityDetails";
import { CreatePostModal } from "./CreatePostModal";
import { useCreatePost } from "../../hooks/useCreatePost";
import { toast } from "sonner";

const postTypeOptions = [
  {
    type: "text" as PostType,
    label: "Text Post",
    description: "Share your thoughts and ideas",
    icon: PenTool,
    color: "text-blue-600",
    bgColor:
      "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900",
  },
  {
    type: "link" as PostType,
    label: "Link Post",
    description: "Share an interesting link",
    icon: Link,
    color: "text-green-600",
    bgColor:
      "bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900",
  },
  {
    type: "media" as PostType,
    label: "Media Post",
    description: "Share images or videos",
    icon: Image,
    color: "text-purple-600",
    bgColor:
      "bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900",
  },
  {
    type: "poll" as PostType,
    label: "Poll",
    description: "Ask the community to vote",
    icon: BarChart3,
    color: "text-orange-600",
    bgColor:
      "bg-orange-50 hover:bg-orange-100 dark:bg-orange-950 dark:hover:bg-orange-900",
  },
  {
    type: "event" as PostType,
    label: "Event",
    description: "Create or share an event",
    icon: Calendar,
    color: "text-indigo-600",
    bgColor:
      "bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900",
  },
  {
    type: "announcement" as PostType,
    label: "Announcement",
    description: "Make an important announcement",
    icon: Megaphone,
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900",
  },
];

export const PostCreationActions: React.FC<PostCreationActionsProps> = ({
  communityId,
  canPost,
  onCreatePost,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType>("text");
  const { createPost, error, success, reset } = useCreatePost();

  const handlePostTypeClick = (type: PostType) => {
    setSelectedPostType(type);
    setModalOpen(true);
    reset(); // Reset any previous state
  };

  const handleCreatePost = async (data: CreatePostData) => {
    try {
      await createPost(communityId, data);

      // Check if successful and show toast
      setTimeout(() => {
        if (success) {
          toast.success("Post created successfully!");
          // Trigger refresh of discussions
          if (onCreatePost) {
            onCreatePost(data.type);
          }
        } else if (error) {
          toast.error(error);
        }
      }, 100);
    } catch {
      toast.error("Failed to create post");
    }
  };

  if (!canPost) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Join to participate
          </h3>
          <p className="text-muted-foreground">
            Join this community to create posts and participate in discussions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create a Post
            </h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts, ask questions, or start a discussion with the
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {postTypeOptions.map((option) => {
              const IconComponent = option.icon;

              return (
                <Button
                  key={option.type}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-center gap-2 ${option.bgColor} border-2 hover:border-primary/20 transition-all duration-200`}
                  onClick={() => handlePostTypeClick(option.type)}
                >
                  <div
                    className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm`}
                  >
                    <IconComponent className={`h-5 w-5 ${option.color}`} />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm text-foreground">
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              💡 <strong>Tip:</strong> Follow community guidelines and be
              respectful when posting. Quality content helps build a better
              community for everyone.
            </p>
          </div>
        </CardContent>
      </Card>

      <CreatePostModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        communityId={communityId}
        initialPostType={selectedPostType}
        onSubmit={handleCreatePost}
      />
    </>
  );
};

export default PostCreationActions;
