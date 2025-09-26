"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  ChevronRight,
  FileText,
  Calendar,
  User,
} from "lucide-react";
export const SubmittedReports: React.FC<{
  reports: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    submittedDate: string;
    reviewer: string;
    comments?: string;
    version?: string;
    fileSize?: string;
  }>;
  onViewAll?: () => void;
  onViewReport?: (report: {
    id: string;
    name: string;
    type: string;
    status: string;
    submittedDate: string;
    reviewer: string;
    comments?: string;
    version?: string;
    fileSize?: string;
  }) => void;
  onDownloadReport?: (report: {
    id: string;
    name: string;
    type: string;
    status: string;
    submittedDate: string;
    reviewer: string;
    comments?: string;
    version?: string;
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
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <Badge
            variant="default"
            className="text-xs font-medium bg-green-100 text-green-800 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending review":
        return (
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "under review":
        return (
          <Badge
            variant="outline"
            className="text-xs font-medium text-blue-600 border-blue-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="text-xs font-medium">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs font-medium">
            {status}
          </Badge>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "financial":
        return "text-green-600 bg-green-50 border-green-200";
      case "regulatory":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "environmental":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "compliance":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "operational":
        return "text-orange-600 bg-orange-50 border-orange-200";
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
    name: string;
    type: string;
    status: string;
    submittedDate: string;
    reviewer: string;
    comments?: string;
    version?: string;
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
    name: string;
    type: string;
    status: string;
    submittedDate: string;
    reviewer: string;
    comments?: string;
    version?: string;
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
              <FileText className="h-5 w-5 text-green-600" />
              Submitted Reports
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Reports you have submitted for review
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
              No submitted reports found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Submit your first report to get started.
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
                      {report.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium ${getTypeColor(
                          report.type
                        )}`}
                      >
                        {report.type}
                      </Badge>
                      {report.version && (
                        <Badge variant="secondary" className="text-xs">
                          v{report.version}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    {getStatusBadge(report.status)}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>
                      Submitted: {formatDate(report.submittedDate)}
                      {formatFileSize(report.fileSize)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>Reviewer: {report.reviewer}</span>
                  </div>
                  {report.comments && (
                    <div className="text-xs text-muted-foreground bg-muted/30 rounded-md p-2">
                      <span className="font-medium">Comments: </span>
                      {report.comments}
                    </div>
                  )}
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
                  {report.status === "Rejected" && (
                    <Badge variant="destructive" className="text-xs">
                      Action Required
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

export default SubmittedReports;
