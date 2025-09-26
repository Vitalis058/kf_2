"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PiggyBank,
  GraduationCap,
  Building2,
  Calendar,
  Lightbulb,
  TrendingUp,
  Handshake,
  Shield,
} from "lucide-react";
import FinancialMarketplace from "./FinancialMarketplace";
import NonFinancialMarketplace from "./NonFinancialMarketplace";

const marketplaceTabs = [
  {
    value: "financial",
    label: "Financial",
    icon: PiggyBank,
    description: "Funding & Investment",
    badge: "Live",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    value: "non-financial",
    label: "Non-Financial",
    icon: GraduationCap,
    description: "Business Development",
    badge: "Live",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    value: "communities",
    label: "Communities",
    icon: Building2,
    description: "Networking & Support",
    badge: "Coming Soon",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    value: "calendar",
    label: "Calendar",
    icon: Calendar,
    description: "Events & Workshops",
    badge: "Coming Soon",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    value: "courses",
    label: "Courses",
    icon: Lightbulb,
    description: "Learning & Training",
    badge: "Coming Soon",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    value: "investment",
    label: "Investment",
    icon: TrendingUp,
    description: "Equity & Capital",
    badge: "Coming Soon",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    value: "opportunities",
    label: "Opportunities",
    icon: Handshake,
    description: "Partnerships & Deals",
    badge: "Coming Soon",
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
  },
  {
    value: "legal",
    label: "Legal Services",
    icon: Shield,
    description: "Compliance & Support",
    badge: "Coming Soon",
    color: "text-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-950/20",
  },
];

export default function MarketplaceTabs() {
  const [activeTab, setActiveTab] = useState("financial");

  const renderTabContent = (tabValue: string) => {
    switch (tabValue) {
      case "financial":
        return <FinancialMarketplace />;
      case "non-financial":
        return <NonFinancialMarketplace />;
      default:
        return (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                {marketplaceTabs.find((tab) => tab.value === tabValue)?.icon &&
                  React.createElement(
                    marketplaceTabs.find((tab) => tab.value === tabValue)!.icon,
                    { className: "h-12 w-12 text-muted-foreground" }
                  )}
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {marketplaceTabs.find((tab) => tab.value === tabValue)?.label}{" "}
                Marketplace
              </h3>
              <p className="text-muted-foreground mb-6">
                This marketplace is currently under development. We&apos;re
                working hard to bring you the best experience.
              </p>
              <Badge variant="secondary" className="text-sm">
                Coming Soon
              </Badge>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/50">
              {marketplaceTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;
                const isComingSoon = tab.badge === "Coming Soon";

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`
                      flex flex-col items-center gap-2 p-4 h-auto min-h-[80px] 
                      data-[state=active]:bg-background data-[state=active]:shadow-sm
                      ${
                        isComingSoon
                          ? "opacity-60 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                      transition-all duration-200
                    `}
                    disabled={isComingSoon}
                  >
                    <div className="relative">
                      <div
                        className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${isActive ? tab.bgColor : "bg-muted"}
                        transition-colors duration-200
                      `}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? tab.color : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      {isComingSoon && (
                        <Badge
                          variant="secondary"
                          className="absolute -top-1 -right-1 text-xs px-1 py-0"
                        >
                          Soon
                        </Badge>
                      )}
                    </div>
                    <div className="text-center">
                      <div
                        className={`
                        text-xs font-medium leading-tight
                        ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }
                      `}
                      >
                        {tab.label}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight mt-1">
                        {tab.description}
                      </div>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {marketplaceTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {renderTabContent(tab.value)}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
