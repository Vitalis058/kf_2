"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  ArrowUpRight,
  AlertCircle,
  Clock,
  ChevronRight,
  FileText,
} from "lucide-react";
export const UpcomingObligations: React.FC<{
  obligations: Array<{
    id: string;
    name: string;
    dueDate: string;
    status: string;
    assignedTo: string;
    type: string;
    description?: string;
    priority?: string;
  }>;
  onViewAll?: () => void;
  onActionClick?: (
    obligation: {
      id: string;
      name: string;
      dueDate: string;
      status: string;
      assignedTo: string;
      type: string;
      description?: string;
      priority?: string;
    },
    action: string
  ) => void;
  className?: string;
}> = ({ obligations, onViewAll, onActionClick, className = "" }) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "overdue":
        return (
          <Badge variant="destructive" className="text-xs font-medium">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      case "due soon":
        return (
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-amber-100 text-amber-800 border-amber-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Due Soon
          </Badge>
        );
      case "upcoming":
      default:
        return (
          <Badge
            variant="outline"
            className="text-xs font-medium text-blue-600 border-blue-200"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        );
    }
  };

  const getActionButton = (obligation: {
    id: string;
    name: string;
    dueDate: string;
    status: string;
    assignedTo: string;
    type: string;
    description?: string;
    priority?: string;
  }) => {
    const handleAction = (action: string) => {
      if (onActionClick) {
        onActionClick(obligation, action);
      } else {
        console.log(`${action} clicked for obligation:`, obligation.id);
      }
    };

    switch (obligation.status.toLowerCase()) {
      case "overdue":
        return (
          <Button
            size="sm"
            variant="destructive"
            className="text-xs font-medium h-8"
            onClick={() => handleAction("submit")}
          >
            Submit Now
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        );
      case "due soon":
        return (
          <Button
            size="sm"
            className="text-xs font-medium h-8"
            onClick={() => handleAction("prepare")}
          >
            Prepare
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        );
      case "upcoming":
      default:
        return (
          <Button
            size="sm"
            variant="outline"
            className="text-xs font-medium h-8 text-primary border-primary/20 hover:bg-primary/5"
            onClick={() => handleAction("view")}
          >
            View
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Upcoming Obligations
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Reports you need to file soon
            </p>
          </div>
          {onViewAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAll}
              className="text-primary hover:text-primary/80 hover:bg-primary/5 text-sm font-medium"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {obligations.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-xl">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              No upcoming obligations found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              All caught up! Check back later for new requirements.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {obligations.slice(0, 5).map((obligation) => {
              const daysUntilDue = getDaysUntilDue(obligation.dueDate);
              return (
                <div
                  key={obligation.id}
                  className="p-4 bg-white/60 rounded-xl border border-white/20 hover:border-primary/20 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                        {obligation.name}
                      </h3>
                      {obligation.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {obligation.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      {getStatusBadge(obligation.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                        <span>
                          Due: {formatDate(obligation.dueDate)}
                          {daysUntilDue >= 0 && (
                            <span className="ml-1 font-medium">
                              (
                              {daysUntilDue === 0
                                ? "Today"
                                : `${daysUntilDue} days`}
                              )
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-2 text-muted-foreground" />
                        <span>Assigned to: {obligation.assignedTo}</span>
                      </div>
                      {obligation.priority && (
                        <div className="flex items-center">
                          <Badge
                            variant={
                              obligation.priority === "High"
                                ? "destructive"
                                : obligation.priority === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {obligation.priority} Priority
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">{getActionButton(obligation)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingObligations;
