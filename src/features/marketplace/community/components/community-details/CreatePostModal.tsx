"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PenTool,
  Link as LinkIcon,
  Image as ImageIcon,
  BarChart3,
  Calendar,
  Megaphone,
  X,
  Plus,
} from "lucide-react";
import { PostType, CreatePostData } from "../../types/communityDetails";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  communityId: string;
  initialPostType?: PostType;
  onSubmit: (data: CreatePostData) => Promise<void>;
}

const postTypeConfig = {
  text: {
    icon: PenTool,
    label: "Text Post",
    description: "Share your thoughts and ideas",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  link: {
    icon: LinkIcon,
    label: "Link Post",
    description: "Share an interesting link",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  media: {
    icon: ImageIcon,
    label: "Media Post",
    description: "Share images or videos",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  poll: {
    icon: BarChart3,
    label: "Poll",
    description: "Ask the community to vote",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  event: {
    icon: Calendar,
    label: "Event",
    description: "Create or share an event",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
  },
  announcement: {
    icon: Megaphone,
    label: "Announcement",
    description: "Make an important announcement",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
};

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onOpenChange,
  initialPostType = "text",
  onSubmit,
}) => {
  const [postType, setPostType] = useState<PostType>(initialPostType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const currentConfig = postTypeConfig[postType];
  const IconComponent = currentConfig.icon;

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const postData: CreatePostData = {
        title: title.trim(),
        content: content.trim(),
        type: postType,
        tags: tags.length > 0 ? tags : undefined,
      };

      // Add type-specific data
      if (postType === "link" && linkUrl.trim()) {
        postData.linkUrl = linkUrl.trim();
      }
      if (postType === "poll" && pollOptions.some((opt) => opt.trim())) {
        postData.pollOptions = pollOptions.filter((opt) => opt.trim());
      }
      if (postType === "event") {
        if (eventDate) postData.eventDate = new Date(eventDate);
        if (eventLocation.trim()) postData.eventLocation = eventLocation.trim();
      }

      await onSubmit(postData);

      // Reset form
      setTitle("");
      setContent("");
      setLinkUrl("");
      setTags([]);
      setPollOptions(["", ""]);
      setEventDate("");
      setEventLocation("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    title.trim() &&
    content.trim() &&
    (postType !== "link" || linkUrl.trim()) &&
    (postType !== "poll" ||
      pollOptions.filter((opt) => opt.trim()).length >= 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`h-5 w-5 ${currentConfig.color}`} />
            Create {currentConfig.label}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type Selector */}
          <div>
            <Label className="text-sm font-medium">Post Type</Label>
            <Select
              value={postType}
              onValueChange={(value: PostType) => setPostType(value)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(postTypeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        <span>{config.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter your ${currentConfig.label.toLowerCase()} title...`}
              className="mt-2"
              required
            />
          </div>

          {/* Link URL (for link posts) */}
          {postType === "link" && (
            <div>
              <Label htmlFor="linkUrl" className="text-sm font-medium">
                Link URL *
              </Label>
              <Input
                id="linkUrl"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-2"
                required
              />
            </div>
          )}

          {/* Event Details */}
          {postType === "event" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate" className="text-sm font-medium">
                  Event Date
                </Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="eventLocation" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="eventLocation"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Event location or online"
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Poll Options */}
          {postType === "poll" && (
            <div>
              <Label className="text-sm font-medium">Poll Options *</Label>
              <div className="space-y-2 mt-2">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handlePollOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      required={index < 2}
                    />
                    {pollOptions.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePollOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPollOption}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Write your ${currentConfig.label.toLowerCase()} content...`}
              className="mt-2 min-h-[120px]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium">Tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="min-w-[100px]"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
