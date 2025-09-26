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
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  ChevronRight as ChevronRightIcon,
  Calendar,
  Building,
} from "lucide-react";
import {
  mockReportingData,
  getFilteredReceivedReports,
} from "../data/mockData";
import { ReceivedReport, Priority } from "../types/index";

export const AllReceivedReportsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<ReceivedReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReceivedReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setReports(mockReportingData.receivedReports);
        setFilteredReports(mockReportingData.receivedReports);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching received reports:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter reports
  useEffect(() => {
    const filtered = getFilteredReceivedReports(reports, {
      searchQuery,
      priorityFilter,
      categoryFilter,
    });
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [reports, searchQuery, priorityFilter, categoryFilter]);

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const getPriorityBadge = (priority: Priority) => {
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

  const handleViewReport = (report: ReceivedReport) => {
    console.log("View report:", report.id);
  };

  const handleDownloadReport = (report: ReceivedReport) => {
    console.log("Download report:", report.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading received reports...</p>
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
        <span className="text-foreground font-medium">Received Reports</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Received Reports
          </h1>
          <p className="text-muted-foreground">
            Reports and documents received from regulatory authorities
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
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Economic">Economic</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
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
                        {report.title}
                      </h3>
                      {getPriorityBadge(report.priority)}
                    </div>
                    {report.description && (
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {report.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mb-4">
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
                      {report.fileSize && (
                        <Badge variant="outline" className="text-xs">
                          {report.fileSize}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Received: {formatDate(report.receivedDate)}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-2" />
                        <span>Source: {report.source}</span>
                      </div>
                    </div>
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
                    {report.priority === "High" && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
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

export default AllReceivedReportsPage;
