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
import { ArrowRight, Star } from "lucide-react";

export default function FeaturedServices() {
  const featuredServices = [
    {
      title: "Business Operations Financing",
      description:
        "Working capital and operational funding solutions for daily business needs",
      category: "Financial Services",
      rating: 4.8,
      reviews: 124,
    },
    {
      title: "Growth & Expansion Financing",
      description:
        "Scale your business with our expansion and growth funding programs",
      category: "Financial Services",
      rating: 4.9,
      reviews: 89,
    },
    {
      title: "Academy & Training",
      description: "Professional development and business training programs",
      category: "Non-Financial Services",
      rating: 4.7,
      reviews: 156,
    },
    {
      title: "Operational Advisory",
      description: "Expert business advisory and consulting services",
      category: "Non-Financial Services",
      rating: 4.6,
      reviews: 98,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            IN THE SPOTLIGHT
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Discover this quarter&apos;s top-performing services
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Featured Services
            </Badge>
            <button
              onClick={() => (window.location.href = "/marketplace")}
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
            >
              Explore more <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A quick look at the most active services this quarter—driven by SME
            demand and partner momentum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {service.rating}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {service.reviews} reviews
                  </span>
                  <Button size="sm" variant="outline" className="text-xs">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
