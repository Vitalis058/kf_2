"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  ChevronRight as ChevronRightIcon,
  Calendar,
  Folder,
  Archive,
  File,
} from "lucide-react";
import { mockReportingData } from "../data/mockData";
import { ReportDocument } from "../types/index";

export const AllDocumentsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<ReportDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<ReportDocument[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDocuments(mockReportingData.reportDocuments);
        setFilteredDocuments(mockReportingData.reportDocuments);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter documents
  useEffect(() => {
    let filtered = documents;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (document) =>
          document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          document.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (document) => document.category === categoryFilter
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (document) => document.status === statusFilter
      );
    }

    setFilteredDocuments(filtered);
    setCurrentPage(1);
  }, [documents, searchQuery, categoryFilter, statusFilter]);

  // Pagination
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "excel":
      case "xlsx":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "word":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
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

  const handleViewDocument = (document: ReportDocument) => {
    console.log("View document:", document.id);
  };

  const handleDownloadDocument = (document: ReportDocument) => {
    console.log("Download document:", document.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 dark:from-blue-950 dark:via-blue-900/30 dark:to-blue-950">
        <div className="w-full">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 dark:from-blue-950 dark:via-blue-900/30 dark:to-blue-950">
      <div className="w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Home className="h-4 w-4" />
          <ChevronRightIcon className="h-4 w-4" />
          <span>Dashboard</span>
          <ChevronRightIcon className="h-4 w-4" />
          <span>Reporting Obligations</span>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-foreground font-medium">Document Wallet</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Wallet
          </h1>
          <p className="text-muted-foreground">
            Manage your uploaded reports and documents
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-sm bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Regulatory">Regulatory</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Operational">Operational</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Documents</h2>
            <p className="text-muted-foreground">
              {filteredDocuments.length} documents found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {currentDocuments.length === 0 ? (
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No documents found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            currentDocuments.map((document) => (
              <Card
                key={document.id}
                className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        {getFileIcon(document.fileType)}
                        <h3 className="text-lg font-semibold text-foreground">
                          {document.name}
                        </h3>
                        {getStatusBadge(document.status)}
                      </div>
                      <div className="flex items-center gap-2 mb-4">
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
                        <Badge variant="outline" className="text-xs">
                          {document.fileSize}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Uploaded: {formatDate(document.uploadDate)}</span>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs font-medium"
                          onClick={() => handleViewDocument(document)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs font-medium text-muted-foreground hover:text-foreground"
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
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstDocument + 1} to{" "}
              {Math.min(indexOfLastDocument, filteredDocuments.length)} of{" "}
              {filteredDocuments.length} documents
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDocumentsPage;
