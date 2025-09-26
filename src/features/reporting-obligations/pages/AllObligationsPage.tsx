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
  Calendar,
  User,
  ArrowUpRight,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { mockReportingData, getFilteredObligations } from "../data/mockData";
import { ReportingObligation, ObligationStatus } from "../types/index";

export const AllObligationsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [obligations, setObligations] = useState<ReportingObligation[]>([]);
  const [filteredObligations, setFilteredObligations] = useState<
    ReportingObligation[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const obligationsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setObligations(mockReportingData.upcomingObligations);
        setFilteredObligations(mockReportingData.upcomingObligations);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching obligations:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter obligations
  useEffect(() => {
    const filtered = getFilteredObligations(obligations, {
      searchQuery,
      statusFilter,
      typeFilter,
      priorityFilter,
    });
    setFilteredObligations(filtered);
    setCurrentPage(1);
  }, [obligations, searchQuery, statusFilter, typeFilter, priorityFilter]);

  // Pagination
  const indexOfLastObligation = currentPage * obligationsPerPage;
  const indexOfFirstObligation = indexOfLastObligation - obligationsPerPage;
  const currentObligations = filteredObligations.slice(
    indexOfFirstObligation,
    indexOfLastObligation
  );
  const totalPages = Math.ceil(filteredObligations.length / obligationsPerPage);

  const getStatusBadge = (status: ObligationStatus) => {
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

  const getActionButton = (obligation: ReportingObligation) => {
    switch (obligation.status.toLowerCase()) {
      case "overdue":
        return (
          <Button
            size="sm"
            variant="destructive"
            className="text-xs font-medium"
          >
            Submit Now
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        );
      case "due soon":
        return (
          <Button size="sm" className="text-xs font-medium">
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
            className="text-xs font-medium text-primary border-primary/20 hover:bg-primary/5"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 dark:from-blue-950 dark:via-blue-900/30 dark:to-blue-950">
        <div className="w-full">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading obligations...</p>
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
          <span className="text-foreground font-medium">All Obligations</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Reporting Obligations
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your reporting requirements and deadlines
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-sm bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search obligations..."
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
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Due Soon">Due Soon</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
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
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Reporting Obligations
            </h2>
            <p className="text-muted-foreground">
              {filteredObligations.length} obligations found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Obligations List */}
        <div className="space-y-4">
          {currentObligations.length === 0 ? (
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No obligations found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            currentObligations.map((obligation) => {
              const daysUntilDue = getDaysUntilDue(obligation.dueDate);
              return (
                <Card
                  key={obligation.id}
                  className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {obligation.name}
                          </h3>
                          {getStatusBadge(obligation.status)}
                        </div>
                        {obligation.description && (
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {obligation.description}
                          </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
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
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-4 w-4 mr-2" />
                            <span>Assigned to: {obligation.assignedTo}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Type: {obligation.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col items-end gap-3">
                        {obligation.priority && (
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
                        )}
                        {getActionButton(obligation)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstObligation + 1} to{" "}
              {Math.min(indexOfLastObligation, filteredObligations.length)} of{" "}
              {filteredObligations.length} obligations
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

export default AllObligationsPage;
