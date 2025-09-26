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
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  ChevronRight as ChevronRightIcon,
  Calendar,
  User,
} from "lucide-react";
import { mockReportingData, getFilteredReports } from "../data/mockData";
// Define inline types to avoid import issues
type SubmittedReport = {
  id: string;
  name: string;
  type:
    | "Financial"
    | "Regulatory"
    | "Environmental"
    | "Compliance"
    | "Operational";
  status: "Approved" | "Pending Review" | "Rejected" | "Under Review";
  submittedDate: string;
  reviewer: string;
  fileUrl: string;
  fileSize?: string;
  version?: string;
  comments?: string;
};

// type ReportStatus = "Approved" | "Pending Review" | "Rejected" | "Under Review";

export const AllSubmittedReportsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<SubmittedReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<SubmittedReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setReports(mockReportingData.submittedReports);
        setFilteredReports(mockReportingData.submittedReports);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching submitted reports:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter reports
  useEffect(() => {
    const filtered = getFilteredReports(reports, {
      searchQuery,
      statusFilter,
      typeFilter,
    });
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [reports, searchQuery, statusFilter, typeFilter]);

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

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

  const handleViewReport = (report: SubmittedReport) => {
    console.log("View report:", report.id);
  };

  const handleDownloadReport = (report: SubmittedReport) => {
    console.log("Download report:", report.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submitted reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Home className="h-4 w-4" />
        <ChevronRightIcon className="h-4 w-4" />
        <span>Dashboard</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span>Reporting Obligations</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="text-foreground font-medium">Submitted Reports</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Submitted Reports
          </h1>
          <p className="text-muted-foreground">
            Track the status of your submitted reports and reviews
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {filteredReports.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Reports</div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {currentReports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No reports found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {currentReports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {report.name}
                      </h3>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
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
                      {report.fileSize && (
                        <Badge variant="outline" className="text-xs">
                          {report.fileSize}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Submitted: {formatDate(report.submittedDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        <span>Reviewer: {report.reviewer}</span>
                      </div>
                    </div>
                    {report.comments && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-md">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Comments: </span>
                          {report.comments}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="ml-6 flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs font-medium"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs font-medium text-muted-foreground hover:text-foreground"
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstReport + 1} to{" "}
                {Math.min(indexOfLastReport, filteredReports.length)} of{" "}
                {filteredReports.length} reports
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllSubmittedReportsPage;
