"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  DollarSign,
  Building2,
  ArrowRight,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Calculator,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { FinancialService } from "../../financial-services/types";

interface ServiceCardProps {
  service: FinancialService;
  viewMode: "grid" | "list";
  onViewDetails?: (serviceId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Operations":
      return <Building2 className="h-5 w-5" />;
    case "Growth":
      return <TrendingUp className="h-5 w-5" />;
    case "Projects":
      return <PiggyBank className="h-5 w-5" />;
    case "Assets":
      return <CreditCard className="h-5 w-5" />;
    case "Equity":
      return <Wallet className="h-5 w-5" />;
    case "Management":
      return <Calculator className="h-5 w-5" />;
    default:
      return <PiggyBank className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Operations":
      return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
    case "Growth":
      return "text-green-600 bg-green-50 dark:bg-green-950/20";
    case "Projects":
      return "text-purple-600 bg-purple-50 dark:bg-purple-950/20";
    case "Assets":
      return "text-orange-600 bg-orange-50 dark:bg-orange-950/20";
    case "Equity":
      return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20";
    case "Management":
      return "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-950/20";
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  viewMode,
}) => {
  const categoryIcon = getCategoryIcon(service.category);
  const categoryColor = getCategoryColor(service.category);

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-start gap-6 p-6">
            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ${categoryColor}`}
            >
              {categoryIcon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {service.name}
                    </h3>
                    {service.isNew && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 border-green-200"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {service.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4 flex-shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{service.rating}</span>
                  <span>({service.reviews})</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{service.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.processingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{service.cost}</span>
                </div>
              </div>

              {/* Features and Action */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {service.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.features.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button size="sm" className="ml-4" asChild>
                  <Link href={`/marketplace/financial-services/${service.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background h-full overflow-hidden">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${categoryColor}`}
          >
            {categoryIcon}
          </div>
          {service.isNew && (
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-700 border-green-200"
            >
              New
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {service.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="truncate">{service.industry}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.processingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{service.cost}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted-foreground">({service.reviews})</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {service.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{service.features.length - 2}
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button className="w-full mt-auto" asChild>
          <Link
            href={`/marketplace/financial-services/${service.id}`}
            className="flex items-center justify-center gap-1"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
