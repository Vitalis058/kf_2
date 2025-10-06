"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Building2,
  Calendar,
  GraduationCap,
  Handshake,
  Lightbulb,
  PiggyBank,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function MarketplaceGrid() {
  const marketplaceItems = [
    {
      icon: PiggyBank,
      label: "Financial Marketplace",
      comingSoon: false,
      iconColor: "text-primary",
      bgColor:
        "from-primary/10 to-card/50 dark:from-primary/20 dark:to-card/50",
    },
    {
      icon: GraduationCap,
      label: "Non-Financial Marketplace",
      comingSoon: false,
      iconColor: "text-primary",
      bgColor:
        "from-primary/10 to-card/50 dark:from-primary/20 dark:to-card/50",
    },
    {
      icon: Building2,
      label: "Communities Marketplace",
      comingSoon: false,
      iconColor: "text-primary",
      bgColor:
        "from-primary/10 to-card/50 dark:from-primary/20 dark:to-card/50",
    },
    {
      icon: Calendar,
      label: "Calendar Marketplace",
      comingSoon: true,
      iconColor: "text-primary/60",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
    {
      icon: Lightbulb,
      label: "Courses Marketplace",
      comingSoon: true,
      iconColor: "text-primary/60",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
    {
      icon: TrendingUp,
      label: "Investment Marketplace",
      comingSoon: true,
      iconColor: "text-primary/60",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
    {
      icon: Handshake,
      label: "Opportunities Marketplace",
      comingSoon: true,
      iconColor: "text-primary/60",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
    {
      icon: Shield,
      label: "Legal Services",
      comingSoon: true,
      iconColor: "text-primary/60",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <Badge
              variant="outline"
              className="bg-transparent border-primary/30 text-primary font-medium text-xs"
            >
              EXPLORE MARKETPLACES
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Discover Our Ecosystem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Access comprehensive services across multiple marketplaces designed
            to support your business journey
          </p>
        </div>

        {/* Marketplace Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {marketplaceItems.map((item, index) => (
            <Link
              key={index}
              href={item.comingSoon ? "#" : "/marketplace/financial-services"}
              className={`flex flex-col items-center text-center group ${
                item.comingSoon
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div className="relative mb-2 sm:mb-3">
                {/* Icon Container */}
                <div
                  className={`
                  w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-20 lg:h-20
                  bg-gradient-to-br ${item.bgColor} 
                  rounded-2xl flex items-center justify-center 
                  group-hover:scale-110 transition-all duration-300 
                  shadow-lg hover:shadow-xl border border-border/50
                  ${!item.comingSoon ? "group-hover:shadow-primary/20" : ""}
                `}
                >
                  <item.icon
                    className={`
                    h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-10 lg:w-10
                    ${item.iconColor}
                    ${!item.comingSoon ? "group-hover:scale-110" : ""}
                    transition-transform duration-300
                  `}
                  />
                </div>

                {/* Coming Soon Badge */}
                {item.comingSoon && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-[10px] sm:text-xs bg-primary text-primary-foreground border-0 shadow-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
                    Soon
                  </Badge>
                )}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm md:text-sm lg:text-xs font-medium text-muted-foreground leading-tight group-hover:text-foreground transition-colors duration-300 max-w-full">
                <div className="break-words text-center px-1">{item.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to explore our comprehensive marketplace ecosystem?
          </p>
          <Link
            href="/marketplace/financial-services"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Marketplaces
            <TrendingUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
