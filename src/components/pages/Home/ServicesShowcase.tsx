"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  TrendingUp,
  CreditCard,
  Building2,
} from "lucide-react";

// Marketplace data array
const marketplaces = [
  {
    id: "finance",
    title: "Finance Marketplace",
    description:
      "Funding options, grants, and financial services to help SMEs manage and grow",
    icon: CreditCard,
    href: "/marketplace/financial-services",
    theme: "primary",
    features: ["Business Loans", "Grants & Funding"],
    buttonText: "Explore Finance",
  },
  {
    id: "non-financial",
    title: "Non-Financial Marketplace",
    description:
      "Business registration, legal advisory, tax, compliance, and SME support services",
    icon: Building2,
    href: "/marketplace/non-financial-services",
    theme: "accent",
    features: ["Legal Advisory", "Business Registration"],
    buttonText: "Explore Services",
  },
  {
    id: "courses",
    title: "Course Marketplace",
    description:
      "Training and educational modules to build entrepreneurship skills and enhance businesses",
    icon: GraduationCap,
    href: "/marketplace/courses",
    theme: "secondary",
    features: ["Business Training", "Skill Development"],
    buttonText: "Explore Courses",
  },
  {
    id: "investment",
    title: "Investment Marketplace",
    description:
      "Access to venture capital, crowdfunding, and grants for SME growth",
    icon: TrendingUp,
    href: "/marketplace/investment",
    theme: "primary",
    features: ["Venture Capital", "Growth Funding"],
    buttonText: "Explore Investment",
  },
];

// Stats data array
const stats = [
  {
    value: "500+",
    label: "Services available",
    theme: "primary",
  },
  {
    value: "100+",
    label: "Verified partners",
    theme: "accent",
  },
  {
    value: "8",
    label: "Marketplaces",
    theme: "primary",
  },
  {
    value: "6",
    label: "Phases of business growth",
    theme: "secondary",
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-20 -mt-20 pt-40 relative overflow-hidden">
      {/* Background Pattern */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 sm:px-4 py-2 rounded-full border border-primary/20 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-primary/30">
              OUR MARKETPLACE PORTFOLIO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight px-4">
            A growing platform to power every stage of your business
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            From funding to training, we provide everything you need to start,
            grow, and scale your business with confidence
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20 px-2 sm:px-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-3 sm:p-4 lg:p-6 xl:p-8 bg-card border border-border rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-medium text-muted-foreground leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {marketplaces.map((marketplace) => {
            const IconComponent = marketplace.icon;
            return (
              <Card
                key={marketplace.id}
                className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border h-full flex flex-col min-h-[400px] sm:min-h-[450px]"
              >
                <CardHeader className="relative pb-3 sm:pb-4 lg:pb-6 flex-shrink-0 p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 text-foreground leading-tight">
                    {marketplace.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm lg:text-base leading-relaxed text-muted-foreground">
                    {marketplace.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex-1 flex flex-col p-4 sm:p-6 pt-0">
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                    {marketplace.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 sm:p-3 rounded-md sm:rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/10"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-primary rounded-sm sm:rounded-md flex items-center justify-center mr-2 sm:mr-3 shadow-sm flex-shrink-0">
                          <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-primary-foreground" />
                        </div>
                        <span className="text-xs sm:text-sm lg:text-base font-medium text-foreground leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 sm:py-3 lg:py-3.5 rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group/btn mt-auto"
                    onClick={() => (window.location.href = marketplace.href)}
                  >
                    <span className="flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base">
                      {marketplace.buttonText}
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
