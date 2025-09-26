/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Folder,
  Archive,
  File,
} from "lucide-react";
export const DocumentWalletPanel: React.FC<{
  documents: Array<{
    id: string;
    name: string;
    category: string;
    fileType: string;
    fileSize: string;
    uploadDate: string;
    version?: string;
    status?: string;
    fileUrl?: string;
  }>;
  onViewAll?: () => void;
  onViewDocument?: (document: any) => void;
  onDownloadDocument?: (document: any) => void;
  className?: string;
}> = ({
  documents,
  onViewAll,
  onViewDocument,
  onDownloadDocument,
  className = "",
}) => {
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "excel":
      case "xlsx":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "word":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <Badge
            variant="default"
            className="text-xs font-medium bg-green-100 text-green-800 border-green-200"
          >
            Active
          </Badge>
        );
      case "archived":
        return (
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-gray-100 text-gray-800 border-gray-200"
          >
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </Badge>
        );
      case "draft":
        return (
          <Badge
            variant="outline"
            className="text-xs font-medium text-yellow-600 border-yellow-200"
          >
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
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

  const handleViewDocument = (document: any) => {
    if (onViewDocument) {
      onViewDocument(document);
    } else {
      console.log("View document:", document.id);
    }
  };

  const handleDownloadDocument = (document: any) => {
    if (onDownloadDocument) {
      onDownloadDocument(document);
    } else {
      console.log("Download document:", document.id);
    }
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Folder className="h-5 w-5 text-orange-600" />
              Document Wallet
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your uploaded reports and documents
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
        {documents.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-xl">
            <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              No documents found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload your first document to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.slice(0, 5).map((document) => (
              <div
                key={document.id}
                className="p-4 bg-white/60 rounded-xl border border-white/20 hover:border-primary/20 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getFileIcon(document.fileType)}
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                        {document.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium ${getCategoryColor(
                          document.category
                        )}`}
                      >
                        {document.category}
                      </Badge>
                      {document.version && (
                        <Badge variant="secondary" className="text-xs">
                          v{document.version}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    {getStatusBadge(document.status)}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>
                      Uploaded: {formatDate(document.uploadDate)}
                      <span className="ml-1">• {document.fileSize}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs font-medium h-8"
                      onClick={() => handleViewDocument(document)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs font-medium h-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleDownloadDocument(document)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  {document.status === "Draft" && (
                    <Badge
                      variant="outline"
                      className="text-xs text-yellow-600 border-yellow-200"
                    >
                      In Progress
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

export default DocumentWalletPanel;
