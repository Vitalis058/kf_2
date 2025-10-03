"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RotateCcw, Target, Building2, Sparkles, Clock } from "lucide-react";
import {
  FilterSidebarProps,
  FINANCIAL_SERVICE_CATEGORIES,
  INDUSTRY_OPTIONS,
} from "../../financial-services/types";
import {
  NON_FINANCIAL_SERVICE_CATEGORIES,
  INDUSTRY_OPTIONS as NON_FINANCIAL_INDUSTRY_OPTIONS,
} from "../../non-financial-services/types";

interface ExtendedFilterSidebarProps extends FilterSidebarProps {
  serviceType?: "financial" | "non-financial";
}

export const FilterSidebar: React.FC<ExtendedFilterSidebarProps> = ({
  filterStates,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  totalItems,
  filteredItems,
  serviceType = "financial",
}) => {
  // Choose the right categories and industries based on service type
  const categories =
    serviceType === "financial"
      ? FINANCIAL_SERVICE_CATEGORIES
      : NON_FINANCIAL_SERVICE_CATEGORIES;

  const industries =
    serviceType === "financial"
      ? INDUSTRY_OPTIONS
      : NON_FINANCIAL_INDUSTRY_OPTIONS;
  return (
    <div className="space-y-4">
      {/* Results Summary */}
      <Card className="border-0 shadow-sm bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Results</h3>
            <Badge variant="outline" className="text-xs">
              {filteredItems} of {totalItems}
            </Badge>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full text-xs h-8"
            >
              <RotateCcw className="h-3 w-3 mr-2" />
              Clear Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Simple Category Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Category
          </h3>
          <div className="space-y-2">
            {categories
              .filter((cat) => cat.value !== "all")
              .map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
                  onClick={() => {
                    const currentValue =
                      (filterStates.category as { [key: string]: boolean })?.[
                        category.value
                      ] || false;
                    onFilterChange("category", category.value, !currentValue);
                  }}
                >
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={
                      (filterStates.category as { [key: string]: boolean })?.[
                        category.value
                      ] || false
                    }
                    onCheckedChange={(checked) => {
                      onFilterChange(
                        "category",
                        category.value,
                        checked as boolean
                      );
                    }}
                  />
                  <Label
                    htmlFor={`category-${category.value}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Simple Industry Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Industry
          </h3>
          <div className="space-y-2">
            {industries
              .filter((ind) => ind.value !== "all")
              .slice(0, 4)
              .map((industry) => (
                <div
                  key={industry.value}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
                  onClick={() => {
                    const currentValue =
                      (filterStates.industry as { [key: string]: boolean })?.[
                        industry.value
                      ] || false;
                    onFilterChange("industry", industry.value, !currentValue);
                  }}
                >
                  <Checkbox
                    id={`industry-${industry.value}`}
                    checked={
                      (filterStates.industry as { [key: string]: boolean })?.[
                        industry.value
                      ] || false
                    }
                    onCheckedChange={(checked) => {
                      onFilterChange(
                        "industry",
                        industry.value,
                        checked as boolean
                      );
                    }}
                  />
                  <Label
                    htmlFor={`industry-${industry.value}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {industry.label}
                  </Label>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Quick Filters
          </h3>
          <div className="space-y-2">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
              onClick={() => {
                const currentValue = (filterStates.newOnly as boolean) || false;
                onFilterChange("newOnly", "newOnly", !currentValue);
              }}
            >
              <Checkbox
                id="new-services"
                checked={(filterStates.newOnly as boolean) || false}
                onCheckedChange={(checked) =>
                  onFilterChange("newOnly", "newOnly", checked as boolean)
                }
              />
              <Label
                htmlFor="new-services"
                className="text-sm cursor-pointer flex-1"
              >
                New Services
              </Label>
            </div>

            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
              onClick={() => {
                const currentValue =
                  (filterStates.fastProcessing as boolean) || false;
                onFilterChange(
                  "fastProcessing",
                  "fastProcessing",
                  !currentValue
                );
              }}
            >
              <Checkbox
                id="fast-processing"
                checked={(filterStates.fastProcessing as boolean) || false}
                onCheckedChange={(checked) =>
                  onFilterChange(
                    "fastProcessing",
                    "fastProcessing",
                    checked as boolean
                  )
                }
              />
              <Label
                htmlFor="fast-processing"
                className="text-sm cursor-pointer flex-1 flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                Fast Processing
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;
