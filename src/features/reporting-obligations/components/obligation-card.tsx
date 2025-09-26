"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ReportingObligation,
  ObligationStatus,
  ObligationPriority,
} from "../types";
import { formatDistanceToNow } from "date-fns";

interface ObligationCardProps {
  obligation: ReportingObligation;
  onStatusChange?: (id: string, status: ObligationStatus) => void;
  onView?: (id: string) => void;
}

const statusColors = {
  [ObligationStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [ObligationStatus.IN_PROGRESS]: "bg-blue-100 text-blue-800",
  [ObligationStatus.SUBMITTED]: "bg-purple-100 text-purple-800",
  [ObligationStatus.APPROVED]: "bg-green-100 text-green-800",
  [ObligationStatus.REJECTED]: "bg-red-100 text-red-800",
  [ObligationStatus.OVERDUE]: "bg-red-100 text-red-800",
};

const priorityColors = {
  [ObligationPriority.LOW]: "bg-gray-100 text-gray-800",
  [ObligationPriority.MEDIUM]: "bg-yellow-100 text-yellow-800",
  [ObligationPriority.HIGH]: "bg-orange-100 text-orange-800",
  [ObligationPriority.URGENT]: "bg-red-100 text-red-800",
};

export function ObligationCard({
  obligation,
  onStatusChange,
  onView,
}: ObligationCardProps) {
  const isOverdue =
    new Date(obligation.dueDate) < new Date() &&
    obligation.status !== ObligationStatus.APPROVED;

  const handleStatusChange = (newStatus: ObligationStatus) => {
    onStatusChange?.(obligation.id, newStatus);
  };

  return (
    <Card className={`w-full ${isOverdue ? "border-red-300" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">
            {obligation.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={priorityColors[obligation.priority]}>
              {obligation.priority}
            </Badge>
            <Badge className={statusColors[obligation.status]}>
              {obligation.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {obligation.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Category:</span>
          <span className="font-medium">
            {obligation.category.replace("_", " ")}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Due:</span>
          <span className={`font-medium ${isOverdue ? "text-red-600" : ""}`}>
            {formatDistanceToNow(new Date(obligation.dueDate), {
              addSuffix: true,
            })}
          </span>
        </div>

        {obligation.documents.length > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Documents:</span>
            <span className="font-medium">
              {obligation.documents.length} file(s)
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(obligation.id)}
          >
            View Details
          </Button>

          {obligation.status === ObligationStatus.PENDING && (
            <Button
              size="sm"
              onClick={() => handleStatusChange(ObligationStatus.IN_PROGRESS)}
            >
              Start Working
            </Button>
          )}

          {obligation.status === ObligationStatus.IN_PROGRESS && (
            <Button
              size="sm"
              onClick={() => handleStatusChange(ObligationStatus.SUBMITTED)}
            >
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
