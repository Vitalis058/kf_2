"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
export const SummaryHighlights: React.FC<{
  data: {
    totalReports: number;
    completed: number;
    pending: number;
    overdue: number;
    complianceRate: number;
  };
  className?: string;
}> = ({ data, className = "" }) => {
  const kpiCards = [
    {
      title: "Total Reports",
      value: data.totalReports,
      icon: FileText,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: data.completed,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending",
      value: data.pending,
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: data.overdue,
      icon: AlertCircle,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getComplianceProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-green-600";
    if (rate >= 75) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Summary Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Overview of your reporting activity and compliance status
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => {
            const IconComponent = kpi.icon;
            return (
              <div
                key={kpi.title}
                className={`${kpi.bgColor} rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-full ${kpi.bgColor} flex items-center justify-center border border-white/20`}
                  >
                    <IconComponent className={`h-5 w-5 ${kpi.iconColor}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-white/60 text-muted-foreground"
                  >
                    {kpi.title}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Rate Section */}
        <div className="bg-white/60 rounded-xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Compliance Rate
              </h3>
              <p className="text-sm text-muted-foreground">
                Overall compliance performance
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-3xl font-bold ${getComplianceColor(
                  data.complianceRate
                )}`}
              >
                {data.complianceRate}%
              </div>
              <div className="text-sm text-muted-foreground">/ 100%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress value={data.complianceRate} className="h-3 bg-muted/50" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${getComplianceProgressColor(
                    data.complianceRate
                  )}`}
                ></div>
                <span>Current Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-dashed border-primary rounded-full"></div>
                <span>Target (100%)</span>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Status
              </span>
              <Badge
                variant={
                  data.complianceRate >= 90
                    ? "default"
                    : data.complianceRate >= 75
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs"
              >
                {data.complianceRate >= 90
                  ? "Excellent"
                  : data.complianceRate >= 75
                  ? "Good"
                  : "Needs Attention"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryHighlights;
