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
      color: "from-blue-500 to-primary",
      bgColor:
        "from-blue-50/50 to-slate-50/50 dark:from-blue-950/20 dark:to-slate-800/50",
    },
    {
      icon: GraduationCap,
      label: "Non-Financial Marketplace",
      comingSoon: false,
      color: "from-accent to-primary",
      bgColor: "from-accent/5 to-card/50 dark:from-accent/10 dark:to-card/50",
    },
    {
      icon: Building2,
      label: "Communities Marketplace",
      comingSoon: false,
      color: "from-primary to-accent",
      bgColor:
        "from-primary/5 to-slate-50/50 dark:from-primary/10 dark:to-slate-800/50",
    },
    {
      icon: Calendar,
      label: "Calendar Marketplace",
      comingSoon: true,
      color: "from-secondary to-primary",
      bgColor:
        "from-secondary/5 to-card/50 dark:from-secondary/10 dark:to-card/50",
    },
    {
      icon: Lightbulb,
      label: "Courses Marketplace",
      comingSoon: true,
      color: "from-accent to-secondary",
      bgColor: "from-accent/5 to-card/50 dark:from-accent/10 dark:to-card/50",
    },
    {
      icon: TrendingUp,
      label: "Investment Marketplace",
      comingSoon: true,
      color: "from-primary to-accent",
      bgColor: "from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50",
    },
    {
      icon: Handshake,
      label: "Opportunities Marketplace",
      comingSoon: true,
      color: "from-secondary to-accent",
      bgColor:
        "from-secondary/5 to-card/50 dark:from-secondary/10 dark:to-card/50",
    },
    {
      icon: Shield,
      label: "Legal Services",
      comingSoon: true,
      color: "from-slate-500 to-gray-600",
      bgColor:
        "from-slate-50/50 to-slate-50/50 dark:from-slate-950/20 dark:to-slate-800/50",
    },
  ];

  return (
    <section>
      {/* Marketplace Icons Grid */}
      <div className="mt-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {marketplaceItems.map((item, index) => (
            <Link
              key={index}
              href={item.comingSoon ? "#" : "/marketplace"}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border border-border">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                {item.comingSoon && (
                  <Badge className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-secondary to-accent text-primary-foreground border-0 shadow-lg">
                    Coming Soon
                  </Badge>
                )}
              </div>
              <div className="text-xs font-medium text-muted-foreground leading-tight group-hover:text-foreground transition-colors">
                {item.label.split(" ").map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
