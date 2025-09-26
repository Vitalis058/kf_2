"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  ChevronRight,
  Eye,
  LucideProps,
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// TypeScript interfaces for data
interface ReportingObligation {
  id: string;
  title: string;
  dueDate: string;
  status: "Due Soon" | "Overdue" | "Complete" | "Submitted";
  statusColor: string;
}

interface ServiceApplication {
  id: string;
  title: string;
  lastUpdated: string;
  status: "Submitted" | "In Review" | "Approved" | "Rejected";
  statusColor: string;
}

interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<LucideProps>;
}

interface FeeInfo {
  year: number;
  amount: number;
  currency: string;
  status: "Paid" | "Pending" | "Overdue";
  nextDueDate: string;
}

// Chart data
const profileCompletionData = [
  {
    name: "Completion",
    value: 60,
    fill: "hsl(var(--primary))",
  },
];

// const serviceTrendData = [
//   { month: "Jan", applications: 2, approvals: 1 },
//   { month: "Feb", applications: 3, approvals: 2 },
//   { month: "Mar", applications: 1, approvals: 1 },
//   { month: "Apr", applications: 4, approvals: 3 },
//   { month: "May", applications: 2, approvals: 2 },
//   { month: "Jun", applications: 3, approvals: 2 },
// ];

// const obligationStatusData = [
//   { name: "Submitted", value: 3, color: "hsl(var(--primary))" },
//   { name: "Due Soon", value: 2, color: "hsl(var(--destructive))" },
//   { name: "Overdue", value: 1, color: "hsl(var(--muted-foreground))" },
// ];

// StatCard Component
const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
}> = ({ title, value, subtitle, color = "hsl(var(--foreground))" }) => (
  <div className="bg-background border border-border rounded-lg p-6 text-center h-24 flex flex-col justify-center">
    <div className="text-2xl font-bold mb-2" style={{ color }}>
      {value}
    </div>
    <div className="text-sm font-medium text-muted-foreground mb-1">
      {title}
    </div>
    <div className="text-xs text-muted-foreground">{subtitle}</div>
  </div>
);

// CompanyInfoCard Component
const CompanyInfoCard: React.FC<{
  companyName: string;
  licenseNumber: string;
  licenseType: string;
  issueDate: string;
  expiryDate: string;
  reportingObligations: number;
  openApplications: number;
  profileCompletion: number;
  onViewProfile?: () => void;
}> = ({
  companyName,
  licenseNumber,
  licenseType,
  issueDate,
  expiryDate,
  reportingObligations,
  openApplications,
  profileCompletion,
  onViewProfile,
}) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {companyName}
            </h2>
            <p className="text-muted-foreground">{licenseNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            Active License
          </Badge>
          <Button
            variant="ghost"
            onClick={onViewProfile}
            className="text-primary hover:bg-primary/10"
          >
            View Profile
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Reporting Obligations"
          value={reportingObligations}
          subtitle="Due Soon"
          color="hsl(var(--destructive))"
        />
        <StatCard
          title="Open Applications"
          value={openApplications}
          subtitle="In Progress"
          color="hsl(var(--primary))"
        />
        <StatCard
          title="Profile Completion"
          value={`${profileCompletion}%`}
          subtitle="Complete"
          color="hsl(var(--primary))"
        />
      </div>

      {/* License Information */}
      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
        <div>
          <div className="text-xs text-muted-foreground mb-1">License Type</div>
          <div className="text-sm font-medium text-foreground">
            {licenseType}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">
            License Number
          </div>
          <div className="text-sm font-medium text-foreground">
            {licenseNumber}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Issue Date</div>
          <div className="text-sm font-medium text-foreground">{issueDate}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Expiry Date</div>
          <div className="text-sm font-medium text-foreground">
            {expiryDate}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// ProfileCompletionCard Component
const ProfileCompletionCard: React.FC<{
  completionPercentage: number;
  onCompleteProfile?: () => void;
}> = ({ completionPercentage, onCompleteProfile }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center space-x-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <span className="text-foreground">Profile Completion</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-center relative">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              barSize={8}
              data={profileCompletionData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                fill="hsl(var(--primary))"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {completionPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Profile Status</span>
          <span className="font-medium text-foreground">
            {completionPercentage >= 80 ? "Well Completed" : "Needs Attention"}
          </span>
        </div>
        <Button onClick={onCompleteProfile} className="w-full">
          {completionPercentage >= 80 ? "Update Profile" : "Complete Profile"}
        </Button>
      </div>
    </CardContent>
  </Card>
);

// ReportingObligationsCard Component
const ReportingObligationsCard: React.FC<{
  obligations: ReportingObligation[];
  onViewAll?: () => void;
  onObligationClick?: (obligationId: string) => void;
}> = ({ obligations, onViewAll, onObligationClick }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">Reporting Obligations</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-primary hover:bg-primary/10"
        >
          View All
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {obligations.map((obligation) => (
        <div
          key={obligation.id}
          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
          onClick={() => onObligationClick?.(obligation.id)}
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-medium text-foreground">
                {obligation.title}
              </span>
              <Badge
                variant={
                  obligation.status === "Submitted" ? "default" : "destructive"
                }
                className="text-xs"
              >
                {obligation.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {obligation.dueDate}
            </div>
          </div>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ChevronRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// ServiceApplicationsCard Component
const ServiceApplicationsCard: React.FC<{
  applications: ServiceApplication[];
  onViewAll?: () => void;
  onApplicationClick?: (applicationId: string) => void;
}> = ({ applications, onViewAll, onApplicationClick }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">Service Applications</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-primary hover:bg-primary/10"
        >
          View All
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
          onClick={() => onApplicationClick?.(application.id)}
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-medium text-foreground">
                {application.title}
              </span>
              <Badge variant="default" className="text-xs">
                {application.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {application.lastUpdated}
            </div>
          </div>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ChevronRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// QuickAccessCard Component
const QuickAccessCard: React.FC<{
  items: QuickAccessItem[];
  onItemClick?: (itemId: string) => void;
}> = ({ items, onItemClick }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4">
      <CardTitle className="text-foreground">Quick Access</CardTitle>
      <CardDescription className="text-muted-foreground">
        Essential Actions to Stay on Track
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group border border-border"
          onClick={() => onItemClick?.(item.id)}
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
            <item.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">
              {item.title}
            </div>
            <div className="text-xs text-muted-foreground">{item.subtitle}</div>
          </div>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ChevronRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// PenaltiesOverviewCard Component
const PenaltiesOverviewCard: React.FC<{
  hasOutstandingPenalties?: boolean;
  penaltyCount?: number;
  onViewHistory?: () => void;
}> = ({ hasOutstandingPenalties = false, penaltyCount = 0, onViewHistory }) => {
  const displayTitle = hasOutstandingPenalties
    ? `${penaltyCount} Outstanding Penalties`
    : "No Outstanding Penalties";

  const displaySubtitle = hasOutstandingPenalties
    ? "Please review and address outstanding issues"
    : "Your firm is in good regulatory standing";

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground">Penalties Overview</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewHistory}
            className="text-primary hover:bg-primary/10"
          >
            View History
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-center py-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            hasOutstandingPenalties
              ? "bg-destructive/10"
              : "bg-green-100 dark:bg-green-900/20"
          }`}
        >
          <CheckCircle
            className={`h-8 w-8 ${
              hasOutstandingPenalties
                ? "text-destructive"
                : "text-green-600 dark:text-green-400"
            }`}
          />
        </div>
        <div className="text-lg font-medium mb-2 text-foreground">
          {displayTitle}
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          {displaySubtitle}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewHistory}
          className="w-full"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

// AnnualFeesCard Component
const AnnualFeesCard: React.FC<{
  feeInfo: FeeInfo;
  onViewInvoice?: () => void;
}> = ({ feeInfo, onViewInvoice }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Pending":
        return "secondary";
      case "Overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">Annual Fees</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              License Fee {feeInfo.year}
            </div>
            <div className="text-lg font-semibold text-foreground">
              {feeInfo.currency} {feeInfo.amount.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Status</div>
            <Badge variant={getStatusVariant(feeInfo.status)}>
              {feeInfo.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Next Due</div>
            <div className="text-sm font-medium text-foreground">
              {feeInfo.nextDueDate}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onViewInvoice}
          className="w-full flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Invoice
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const OverviewPage: React.FC = () => {
  const router = useRouter();

  // Sample data - in real app, this would come from API/state management
  const companyInfo = {
    companyName: "FutureTech LLC",
    licenseNumber: "F00123",
    licenseType: "Category 3C License",
    issueDate: "01/01/2021",
    expiryDate: "31/12/2025",
    reportingObligations: 2,
    openApplications: 2,
    profileCompletion: 60,
  };

  const reportingObligations: ReportingObligation[] = [
    {
      id: "1",
      title: "Quarterly AML Report",
      dueDate: "Due 15/07/2025",
      status: "Due Soon",
      statusColor: "#FF5630",
    },
    {
      id: "2",
      title: "Annual Financial Statement",
      dueDate: "Due 31/05/2025",
      status: "Submitted",
      statusColor: "#0065FF",
    },
  ];

  const serviceApplications: ServiceApplication[] = [
    {
      id: "1",
      title: "Request for New Authorization",
      lastUpdated: "Last updated 10/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
    {
      id: "2",
      title: "Annual Compliance Review",
      lastUpdated: "Last updated 08/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
  ];

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: "1",
      title: "Apply for New Service",
      subtitle: "Browse available services",
      icon: TrendingUp,
    },
    {
      id: "2",
      title: "2 Reporting Obligations Due Soon",
      subtitle: "Due in next 7 days",
      icon: Calendar,
    },
  ];

  const feeInfo: FeeInfo = {
    year: 2024,
    amount: 2500,
    currency: "USD",
    status: "Paid",
    nextDueDate: "31/12/2025",
  };

  // Event handlers
  const handleViewAllReportingObligations = () => {
    router.push("/dashboard/reporting-obligations");
  };

  const handleReportingObligationClick = () => {
    router.push("/dashboard/reporting-obligations/");
  };

  const handleCompleteProfile = () => {
    router.push("/dashboard/firm-profile");
  };

  const handleViewProfile = () => {
    router.push("/dashboard/firm-profile");
  };

  const handleViewAllApplications = () => {
    router.push("/dashboard/non-financial-records");
  };

  const handleApplicationClick = () => {
    router.push("/dashboard/non-financial-records");
  };

  const handleQuickAccessItemClick = () => {
    router.push("/dashboard/non-financial-records");
  };

  const handleViewPenaltyHistory = () => {
    console.log("View penalty history clicked");
  };

  const handleViewInvoice = () => {
    console.log("View invoice clicked");
  };

  return (
    <div className="min-h-screen bg-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Heres your business summary.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {companyInfo.companyName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {companyInfo.licenseNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Info Card */}
            <CompanyInfoCard
              {...companyInfo}
              onViewProfile={handleViewProfile}
            />

            {/* Reporting Obligations Card */}
            <ReportingObligationsCard
              obligations={reportingObligations}
              onViewAll={handleViewAllReportingObligations}
              onObligationClick={handleReportingObligationClick}
            />

            {/* Profile Completion Card */}
            <ProfileCompletionCard
              completionPercentage={companyInfo.profileCompletion}
              onCompleteProfile={handleCompleteProfile}
            />

            {/* Service Applications Card */}
            <ServiceApplicationsCard
              applications={serviceApplications}
              onViewAll={handleViewAllApplications}
              onApplicationClick={handleApplicationClick}
            />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Quick Access Card */}
            <QuickAccessCard
              items={quickAccessItems}
              onItemClick={handleQuickAccessItemClick}
            />

            {/* Penalties Overview Card */}
            <PenaltiesOverviewCard
              hasOutstandingPenalties={false}
              penaltyCount={0}
              onViewHistory={handleViewPenaltyHistory}
            />

            {/* Annual Fees Card */}
            <AnnualFeesCard
              feeInfo={feeInfo}
              onViewInvoice={handleViewInvoice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
