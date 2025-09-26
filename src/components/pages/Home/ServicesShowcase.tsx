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
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  PiggyBank,
  Rocket,
} from "lucide-react";

export default function ServicesShowcase() {
  return (
    <section className="py-20 -mt-20 pt-40 relative overflow-hidden">
      {/* Background Pattern */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <Badge
              variant="outline"
              className="bg-transparent border-primary/30 text-primary font-medium"
            >
              OUR MARKETPLACE PORTFOLIO
            </Badge>
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
          <div className="group text-center p-8 bg-gradient-to-br from-card via-card/50 to-primary/5 dark:from-card dark:via-card/50 dark:to-primary/10 border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Services available
            </div>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-card via-card/50 to-accent/5 dark:from-card dark:via-card/50 dark:to-accent/10 border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl font-bold text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
              100+
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Verified partners
            </div>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-card via-card/50 to-primary/5 dark:from-card dark:via-card/50 dark:to-primary/10 border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              4
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Marketplaces
            </div>
          </div>
          <div className="group text-center p-8 bg-gradient-to-br from-card via-card/50 to-secondary/5 dark:from-card dark:via-card/50 dark:to-secondary/10 border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl font-bold text-secondary mb-3 group-hover:scale-110 transition-transform duration-300">
              6
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Phases of business growth
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Financial Services */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card/50 to-primary/5 dark:from-card dark:via-card/50 dark:to-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                <PiggyBank className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3 text-foreground">
                Financial Services
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Access diverse funding opportunities and comprehensive financial
                support for your business growth
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3 mb-6">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50 group-hover:from-primary/10 group-hover:to-card dark:group-hover:from-primary/20 dark:group-hover:to-card transition-all duration-300 border border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Business Operations Financing
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-accent/5 to-card/50 dark:from-accent/10 dark:to-card/50 group-hover:from-accent/10 group-hover:to-card dark:group-hover:from-accent/20 dark:group-hover:to-card transition-all duration-300 border border-accent/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Growth & Expansion Funding
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-secondary/5 to-card/50 dark:from-secondary/10 dark:to-card/50 group-hover:from-secondary/10 group-hover:to-card dark:group-hover:from-secondary/20 dark:group-hover:to-card transition-all duration-300 border border-secondary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Asset & Equipment Financing
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                onClick={() => (window.location.href = "/marketplace")}
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Financial Services
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Non-Financial Services */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card/50 to-accent/5 dark:from-card dark:via-card/50 dark:to-accent/10 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-2 border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent/25">
                <GraduationCap className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3 text-foreground">
                Business Development
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Comprehensive training, advisory, and business development
                services to accelerate your success
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3 mb-6">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-accent/5 to-card/50 dark:from-accent/10 dark:to-card/50 group-hover:from-accent/10 group-hover:to-card dark:group-hover:from-accent/20 dark:group-hover:to-card transition-all duration-300 border border-accent/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Academy & Training Programs
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-secondary/5 to-card/50 dark:from-secondary/10 dark:to-card/50 group-hover:from-secondary/10 group-hover:to-card dark:group-hover:from-secondary/20 dark:group-hover:to-card transition-all duration-300 border border-secondary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Business Incubation
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50 group-hover:from-primary/10 group-hover:to-card dark:group-hover:from-primary/20 dark:group-hover:to-card transition-all duration-300 border border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Expert Advisory Services
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                onClick={() => (window.location.href = "/marketplace")}
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Development Services
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Digital Platform */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card/50 to-primary/5 dark:from-card dark:via-card/50 dark:to-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                <Rocket className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3 text-foreground">
                Digital Marketplace
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Connect with verified service providers and discover new
                business partnership opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3 mb-6">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-primary/5 to-card/50 dark:from-primary/10 dark:to-card/50 group-hover:from-primary/10 group-hover:to-card dark:group-hover:from-primary/20 dark:group-hover:to-card transition-all duration-300 border border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Service Provider Network
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-accent/5 to-card/50 dark:from-accent/10 dark:to-card/50 group-hover:from-accent/10 group-hover:to-card dark:group-hover:from-accent/20 dark:group-hover:to-card transition-all duration-300 border border-accent/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Partnership Opportunities
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-secondary/5 to-card/50 dark:from-secondary/10 dark:to-card/50 group-hover:from-secondary/10 group-hover:to-card dark:group-hover:from-secondary/20 dark:group-hover:to-card transition-all duration-300 border border-secondary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Digital Solutions
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                onClick={() => (window.location.href = "/dashboard")}
              >
                <span className="flex items-center justify-center gap-2">
                  Access Platform
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
