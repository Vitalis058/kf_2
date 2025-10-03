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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="bg-transparent border-primary/30 text-primary font-medium text-sm px-3 py-1 rounded-full border">
              OUR MARKETPLACE PORTFOLIO
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            A growing platform to power every stage of your business
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From funding to training, we provide everything you need to start,
            grow, and scale your business with confidence
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center p-8 bg-gradient-to-br from-card via-card/50 to-${stat.theme}/5 dark:from-card dark:via-card/50 dark:to-${stat.theme}/10 border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div
                className={`text-4xl font-bold text-${stat.theme} mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketplaces.map((marketplace) => {
            const IconComponent = marketplace.icon;
            return (
              <Card
                key={marketplace.id}
                className={`group relative overflow-hidden bg-gradient-to-br from-card via-card/50 to-${marketplace.theme}/5 dark:from-card dark:via-card/50 dark:to-${marketplace.theme}/10 hover:shadow-2xl hover:shadow-${marketplace.theme}/20 transition-all duration-500 hover:-translate-y-2 border border-border`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${marketplace.theme}/5 via-${marketplace.theme}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardHeader className="relative pb-6">
                  <div
                    className={`w-16 h-16 bg-${marketplace.theme} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${marketplace.theme}/25`}
                  >
                    <IconComponent
                      className={`h-8 w-8 text-${marketplace.theme}-foreground`}
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-foreground line-clamp-1">
                    {marketplace.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground line-clamp-2">
                    {marketplace.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3 mb-6">
                    {marketplace.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-xl bg-gradient-to-r from-${
                          index === 0 ? marketplace.theme : "accent"
                        }/5 to-card/50 dark:from-${
                          index === 0 ? marketplace.theme : "accent"
                        }/10 dark:to-card/50 group-hover:from-${
                          index === 0 ? marketplace.theme : "accent"
                        }/10 group-hover:to-card dark:group-hover:from-${
                          index === 0 ? marketplace.theme : "accent"
                        }/20 dark:group-hover:to-card transition-all duration-300 border border-${
                          index === 0 ? marketplace.theme : "accent"
                        }/20`}
                      >
                        <div
                          className={`w-8 h-8 bg-gradient-to-br from-${
                            index === 0 ? marketplace.theme : "accent"
                          } to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm`}
                        >
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r from-${
                      marketplace.theme
                    } to-${
                      marketplace.theme === "primary" ? "accent" : "primary"
                    } hover:from-${marketplace.theme}/90 hover:to-${
                      marketplace.theme === "primary" ? "accent" : "primary"
                    }/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                    onClick={() => (window.location.href = marketplace.href)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {marketplace.buttonText}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
