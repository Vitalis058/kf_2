"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Link, Image as ImageIcon } from "lucide-react";
import { PostActionButtonsProps, POST_ACTION_TYPES } from "../types";

const getActionIcon = (action: string) => {
  switch (action) {
    case "text":
      return <FileText className="h-4 w-4" />;
    case "link":
      return <Link className="h-4 w-4" />;
    case "media":
      return <ImageIcon className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const PostActionButtons: React.FC<PostActionButtonsProps> = ({
  communityId,
  disabled = true,
}) => {
  const handlePostAction = (action: string) => {
    if (!disabled) {
      // Future functionality - for now just log
      console.log(`Post action: ${action} for community: ${communityId}`);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {POST_ACTION_TYPES.map((actionType) => (
          <Tooltip key={actionType.value}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => handlePostAction(actionType.value)}
                className={`flex-1 min-w-0 ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {getActionIcon(actionType.value)}
                <span className="ml-1 text-xs hidden xs:inline truncate">
                  {actionType.label.replace(" Post", "")}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {disabled
                  ? `${actionType.label} - Coming Soon`
                  : `Create a ${actionType.label.toLowerCase()}`}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default PostActionButtons;
