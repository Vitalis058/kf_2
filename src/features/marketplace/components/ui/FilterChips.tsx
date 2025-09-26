"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SearchFilters, FilterState } from "../../types";
import {
  FINANCIAL_SERVICE_CATEGORIES,
  INDUSTRY_OPTIONS,
  PRICING_MODELS,
} from "../../types";

interface FilterChipsProps {
  searchFilters: SearchFilters;
  filterStates: FilterState;
  onRemoveFilter: (type: string, value?: string) => void;
  onClearAll: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  searchFilters,
  filterStates,
  onRemoveFilter,
  onClearAll,
}) => {
  const getActiveFilters = () => {
    const chips: Array<{ type: string; value: string; label: string }> = [];

    // Search query
    if (searchFilters.searchQuery) {
      chips.push({
        type: "search",
        value: searchFilters.searchQuery,
        label: `Search: "${searchFilters.searchQuery}"`,
      });
    }

    // Category filters (from filterStates)
    if (filterStates.category && typeof filterStates.category === "object") {
      Object.keys(filterStates.category).forEach((categoryValue) => {
        if (
          (filterStates.category as { [key: string]: boolean })[categoryValue]
        ) {
          const category = FINANCIAL_SERVICE_CATEGORIES.find(
            (c) => c.value === categoryValue
          );
          if (category) {
            chips.push({
              type: "category",
              value: categoryValue,
              label: `Category: ${category.label}`,
            });
          }
        }
      });
    }

    // Industry filter
    if (searchFilters.selectedIndustry !== "all") {
      const industry = INDUSTRY_OPTIONS.find(
        (i) => i.value === searchFilters.selectedIndustry
      );
      if (industry) {
        chips.push({
          type: "industry",
          value: searchFilters.selectedIndustry,
          label: `Industry: ${industry.label}`,
        });
      }
    }

    // Pricing filter
    if (searchFilters.selectedPricing !== "all") {
      const pricing = PRICING_MODELS.find(
        (p) => p.value === searchFilters.selectedPricing
      );
      if (pricing) {
        chips.push({
          type: "pricing",
          value: searchFilters.selectedPricing,
          label: `Pricing: ${pricing.label}`,
        });
      }
    }

    // New services filter
    if (searchFilters.showNewOnly) {
      chips.push({
        type: "newOnly",
        value: "newOnly",
        label: "New Services Only",
      });
    }

    // Fast processing filter
    if (filterStates.fastProcessing) {
      chips.push({
        type: "fastProcessing",
        value: "fastProcessing",
        label: "Fast Processing",
      });
    }

    // Facet-based filters
    Object.keys(filterStates).forEach((facetCode) => {
      if (
        facetCode === "category" ||
        facetCode === "industry" ||
        facetCode === "pricing" ||
        facetCode === "newOnly" ||
        facetCode === "fastProcessing"
      ) {
        return; // Skip already handled filters
      }

      const facetState = filterStates[facetCode];
      if (typeof facetState === "object" && facetState !== null) {
        const selectedValues = Object.keys(facetState).filter(
          (key) => facetState[key]
        );

        selectedValues.forEach((valueCode) => {
          chips.push({
            type: facetCode,
            value: valueCode,
            label: `${facetCode}: ${valueCode}`,
          });
        });
      }
    });

    return chips;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 rounded-lg border border-border/50">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Active Filters:
        </span>
        <Badge variant="secondary" className="text-xs">
          {activeFilters.length}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.type}-${filter.value}-${index}`}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-background/80 hover:bg-background transition-colors"
          >
            <span className="truncate max-w-32">{filter.label}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;
