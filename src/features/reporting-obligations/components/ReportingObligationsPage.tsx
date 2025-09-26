"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertCircle } from "lucide-react";
import { SummaryHighlights } from "./SummaryHighlights";
import { UpcomingObligations } from "./UpcomingObligations";
import { SubmittedReports } from "./SubmittedReports";
import { ReceivedReports } from "./ReceivedReports";
import { DocumentWalletPanel } from "./DocumentWalletPanel";
import { mockReportingData } from "../data/mockData";

export const ReportingObligationsPage: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState(mockReportingData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setReportData(mockReportingData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setError("Failed to load reports data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAllObligations = () => {
    router.push("/dashboard/reporting-obligations/obligations");
  };

  const handleViewAllSubmittedReports = () => {
    router.push("/dashboard/reporting-obligations/submitted-reports");
  };

  const handleViewAllReceivedReports = () => {
    router.push("/dashboard/reporting-obligations/received-reports");
  };

  const handleViewAllDocuments = () => {
    router.push("/dashboard/reporting-obligations/documents");
  };

  const handleObligationAction = (
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
  ) => {
    console.log(`${action} action for obligation:`, obligation.id);
    // Handle different actions (submit, prepare, view)
  };

  const handleViewReport = (report: { id: string }) => {
    console.log("View report:", report.id);
    // Navigate to report details
  };

  const handleDownloadReport = (report: { id: string }) => {
    console.log("Download report:", report.id);
    // Handle download
  };

  const handleViewDocument = (document: { id: string }) => {
    console.log("View document:", document.id);
    // Navigate to document details
  };

  const handleDownloadDocument = (document: { id: string }) => {
    console.log("Download document:", document.id);
    // Handle download
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading reporting obligations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-red-600">
            Error Loading Reports
          </h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Reporting Obligations</h1>
        <p className="text-muted-foreground mb-6">
          Manage your regulatory compliance and reporting requirements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-primary mb-1">
            {reportData.summaryData.totalReports}
          </div>
          <div className="text-sm text-muted-foreground">Total Reports</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {reportData.summaryData.completed}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {reportData.summaryData.pending}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {reportData.summaryData.overdue}
          </div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reports, obligations, or documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Summary Highlights - Full Width */}
        <SummaryHighlights data={reportData.summaryData} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <UpcomingObligations
              obligations={reportData.upcomingObligations}
              onViewAll={handleViewAllObligations}
              onActionClick={handleObligationAction}
            />
            <SubmittedReports
              reports={reportData.submittedReports}
              onViewAll={handleViewAllSubmittedReports}
              onViewReport={handleViewReport}
              onDownloadReport={handleDownloadReport}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ReceivedReports
              reports={reportData.receivedReports}
              onViewAll={handleViewAllReceivedReports}
              onViewReport={handleViewReport}
              onDownloadReport={handleDownloadReport}
            />
            <DocumentWalletPanel
              documents={reportData.reportDocuments}
              onViewAll={handleViewAllDocuments}
              onViewDocument={handleViewDocument}
              onDownloadDocument={handleDownloadDocument}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingObligationsPage;
