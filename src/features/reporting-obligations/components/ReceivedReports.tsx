"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Download,
  ChevronRight,
  FileText,
  Calendar,
  Building,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";
export const ReceivedReports: React.FC<{
  reports: Array<{
    id: string;
    title: string;
    source: string;
    receivedDate: string;
    priority: string;
    category?: string;
    description?: string;
    fileSize?: string;
  }>;
  onViewAll?: () => void;
  onViewReport?: (report: {
    id: string;
    title: string;
    source: string;
    receivedDate: string;
    priority: string;
    category?: string;
    description?: string;
    fileSize?: string;
  }) => void;
  onDownloadReport?: (report: {
    id: string;
    title: string;
    source: string;
    receivedDate: string;
    priority: string;
    category?: string;
    description?: string;
    fileSize?: string;
  }) => void;
  className?: string;
}> = ({
  reports,
  onViewAll,
  onViewReport,
  onDownloadReport,
  className = "",
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            <Info className="h-3 w-3 mr-1" />
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="outline"
            className="text-xs font-medium text-green-600 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Low Priority
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs font-medium">
            {priority}
          </Badge>
        );
    }
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return "text-gray-600 bg-gray-50 border-gray-200";

    switch (category.toLowerCase()) {
      case "regulatory":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "financial":
        return "text-green-600 bg-green-50 border-green-200";
      case "economic":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "security":
        return "text-red-600 bg-red-50 border-red-200";
      case "environmental":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
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

  const formatFileSize = (size?: string) => {
    if (!size) return "";
    return ` • ${size}`;
  };

  const handleViewReport = (report: {
    id: string;
    title: string;
    source: string;
    receivedDate: string;
    priority: string;
    category?: string;
    description?: string;
    fileSize?: string;
  }) => {
    if (onViewReport) {
      onViewReport(report);
    } else {
      console.log("View report:", report.id);
    }
  };

  const handleDownloadReport = (report: {
    id: string;
    title: string;
    source: string;
    receivedDate: string;
    priority: string;
    category?: string;
    description?: string;
    fileSize?: string;
  }) => {
    if (onDownloadReport) {
      onDownloadReport(report);
    } else {
      console.log("Download report:", report.id);
    }
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Received Reports
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Reports and documents received from authorities
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
        {reports.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-xl">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              No received reports found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              New reports will appear here when received.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div
                key={report.id}
                className="p-4 bg-white/60 rounded-xl border border-white/20 hover:border-primary/20 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                      {report.title}
                    </h3>
                    {report.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {report.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      {report.category && (
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${getCategoryColor(
                            report.category
                          )}`}
                        >
                          {report.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    {getPriorityBadge(report.priority)}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>
                      Received: {formatDate(report.receivedDate)}
                      {formatFileSize(report.fileSize)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Building className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>Source: {report.source}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs font-medium h-8"
                      onClick={() => handleViewReport(report)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs font-medium h-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleDownloadReport(report)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  {report.priority === "High" && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReceivedReports;
