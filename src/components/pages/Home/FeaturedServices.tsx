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
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, TrendingUp, Users, Award, Zap } from "lucide-react";

export default function FeaturedServices() {
  const featuredServices = [
    {
      title: "Business Operations Financing",
      description:
        "Working capital and operational funding solutions for daily business needs",
      category: "Financial Services",
      rating: 4.8,
      reviews: 124,
      icon: TrendingUp,
      gradient: "from-primary/10 via-primary/5 to-transparent",
      borderColor: "border-primary/20 dark:border-primary/30",
      categoryColor:
        "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
      trending: "+23%",
    },
    {
      title: "Growth & Expansion Financing",
      description:
        "Scale your business with our expansion and growth funding programs",
      category: "Financial Services",
      rating: 4.9,
      reviews: 89,
      icon: Zap,
      gradient: "from-accent/10 via-accent/5 to-transparent",
      borderColor: "border-accent/20 dark:border-accent/30",
      categoryColor:
        "bg-accent/10 text-accent-foreground dark:bg-accent/20 dark:text-accent-foreground",
      trending: "+31%",
    },
    {
      title: "Academy & Training",
      description: "Professional development and business training programs",
      category: "Non-Financial Services",
      rating: 4.7,
      reviews: 156,
      icon: Award,
      gradient: "from-secondary/10 via-secondary/5 to-transparent",
      borderColor: "border-secondary/20 dark:border-secondary/30",
      categoryColor:
        "bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-secondary-foreground",
      trending: "+18%",
    },
    {
      title: "Operational Advisory",
      description: "Expert business advisory and consulting services",
      category: "Non-Financial Services",
      rating: 4.6,
      reviews: 98,
      icon: Users,
      gradient: "from-muted/20 via-muted/10 to-transparent",
      borderColor: "border-muted-foreground/20 dark:border-muted-foreground/30",
      categoryColor:
        "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground",
      trending: "+15%",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-8 py-4 rounded-full border border-primary/15 mb-8 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide text-foreground/90 uppercase">
              Top Performers This Quarter
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Discover this quarter&apos;s{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              top-performing services
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Explore the most sought-after services driving business success
            across our ecosystem—
            <span className="text-foreground font-medium">
              {" "}
              backed by real results and SME demand
            </span>
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                +25% Growth
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                467+ Active Users
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Star className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">
                4.8 Avg Rating
              </span>
            </div>
          </div>

          <Button
            onClick={() =>
              (window.location.href = "/marketplace/financial-services")
            }
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Explore All Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${service.gradient} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${service.borderColor} border-2`}
            >
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative pb-4">
                {/* Icon and Trending Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-card to-muted rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200 text-xs font-semibold border border-emerald-200 dark:border-emerald-700">
                      {service.trending}
                    </Badge>
                  </div>
                </div>

                {/* Category and Rating */}
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs font-medium border-0`}>
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full border border-amber-200/50 dark:border-amber-700/50">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                      {service.rating}
                    </span>
                  </div>
                </div>

                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <CardDescription className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {service.reviews} reviews
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary hover:to-accent text-primary hover:text-primary-foreground border border-primary/20 hover:border-transparent text-xs font-semibold transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-muted/50 to-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50">
            <span className="text-sm text-muted-foreground">
              Want to see your service featured here?
            </span>
            <Button
              variant="link"
              className="text-primary font-semibold p-0 h-auto"
            >
              Partner with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
