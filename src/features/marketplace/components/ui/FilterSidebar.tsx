"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  RotateCcw,
  TrendingUp,
  Building2,
  DollarSign,
  Filter,
  Sparkles,
  Target,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FilterSidebarProps } from "../../types";
import {
  FINANCIAL_SERVICE_CATEGORIES,
  INDUSTRY_OPTIONS,
  PRICING_MODELS,
} from "../../types";

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  facets,
  filterStates,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  totalItems,
  filteredItems,
}) => {
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({
    category: true,
    industry: true,
    pricing: true,
    special: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-3">
      {/* Results Summary */}
      <Card className="border-0 shadow-sm bg-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Search Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Services
              </span>
              <Badge variant="secondary" className="font-medium">
                {totalItems}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Showing</span>
              <Badge variant="default" className="font-medium">
                {filteredItems}
              </Badge>
            </div>
          </div>

          {hasActiveFilters && (
            <>
              <Separator className="my-3" />
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="w-full text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-2" />
                Clear All Filters
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Collapsible
        open={openSections.category}
        onOpenChange={() => toggleSection("category")}
      >
        <Card className="border-0 shadow-sm">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer transition-colors">
              <CardTitle className="text-sm flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Service Category
                </div>
                {openSections.category ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {FINANCIAL_SERVICE_CATEGORIES.map((category) => (
                    <div
                      key={category.value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-transparent"
                      onClick={() => {
                        const currentValue =
                          (
                            filterStates.category as {
                              [valueCode: string]: boolean;
                            }
                          )?.[category.value] || false;
                        onFilterChange(
                          "category",
                          category.value,
                          !currentValue
                        );
                      }}
                    >
                      <Checkbox
                        id={`category-${category.value}`}
                        checked={
                          (
                            filterStates.category as {
                              [valueCode: string]: boolean;
                            }
                          )?.[category.value] || false
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
                        className="text-sm cursor-pointer flex-1 transition-colors"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Industry Filter */}
      <Collapsible
        open={openSections.industry}
        onOpenChange={() => toggleSection("industry")}
      >
        <Card className="border-0 shadow-sm">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer transition-colors">
              <CardTitle className="text-sm flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Industry Focus
                </div>
                {openSections.industry ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <div
                      key={industry.value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-transparent"
                      onClick={() => {
                        const currentValue =
                          (filterStates.industry as string) === industry.value;
                        if (currentValue) {
                          onFilterChange("industry", "all");
                        } else {
                          onFilterChange("industry", industry.value);
                        }
                      }}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          id={`industry-${industry.value}`}
                          name="industry"
                          checked={
                            (filterStates.industry as string) === industry.value
                          }
                          onChange={() => {
                            onFilterChange("industry", industry.value);
                          }}
                          className="w-4 h-4 text-primary bg-background border-border rounded-full focus:ring-primary focus:ring-2"
                        />
                      </div>
                      <Label
                        htmlFor={`industry-${industry.value}`}
                        className="text-sm cursor-pointer flex-1 transition-colors"
                      >
                        {industry.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Pricing Filter */}
      <Collapsible
        open={openSections.pricing}
        onOpenChange={() => toggleSection("pricing")}
      >
        <Card className="border-0 shadow-sm">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer transition-colors">
              <CardTitle className="text-sm flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Pricing Model
                </div>
                {openSections.pricing ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {PRICING_MODELS.map((pricing) => (
                    <div
                      key={pricing.value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-transparent"
                      onClick={() => {
                        const currentValue =
                          (filterStates.pricing as string) === pricing.value;
                        if (currentValue) {
                          onFilterChange("pricing", "all");
                        } else {
                          onFilterChange("pricing", pricing.value);
                        }
                      }}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          id={`pricing-${pricing.value}`}
                          name="pricing"
                          checked={
                            (filterStates.pricing as string) === pricing.value
                          }
                          onChange={() => {
                            onFilterChange("pricing", pricing.value);
                          }}
                          className="w-4 h-4 text-primary bg-background border-border rounded-full focus:ring-primary focus:ring-2"
                        />
                      </div>
                      <Label
                        htmlFor={`pricing-${pricing.value}`}
                        className="text-sm cursor-pointer flex-1 transition-colors"
                      >
                        {pricing.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Facet-based Filters */}
      {facets.map((facet) => (
        <Collapsible
          key={facet.id}
          open={openSections[facet.code] || false}
          onOpenChange={() => toggleSection(facet.code)}
        >
          <Card className="border-0 shadow-sm">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer transition-colors">
                <CardTitle className="text-sm capitalize text-foreground flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    {facet.name}
                  </div>
                  {openSections[facet.code] ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {facet.values.map((value) => (
                      <div
                        key={value.id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-transparent"
                        onClick={() => {
                          const currentValue =
                            (
                              filterStates[facet.code] as {
                                [valueCode: string]: boolean;
                              }
                            )?.[value.code] || false;
                          onFilterChange(facet.code, value.code, !currentValue);
                        }}
                      >
                        <Checkbox
                          id={`facet-${facet.code}-${value.code}`}
                          checked={
                            (
                              filterStates[facet.code] as {
                                [valueCode: string]: boolean;
                              }
                            )?.[value.code] || false
                          }
                          onCheckedChange={(checked) =>
                            onFilterChange(
                              facet.code,
                              value.code,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={`facet-${facet.code}-${value.code}`}
                          className="text-sm cursor-pointer flex-1 transition-colors"
                        >
                          {value.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}

      {/* Special Filters */}
      <Collapsible
        open={openSections.special}
        onOpenChange={() => toggleSection("special")}
      >
        <Card className="border-0 shadow-sm">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer transition-colors">
              <CardTitle className="text-sm text-foreground flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Special Features
                </div>
                {openSections.special ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    const currentValue =
                      (filterStates.newOnly as boolean) || false;
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
                    className="text-sm cursor-pointer flex-1 hover:text-primary transition-colors"
                  >
                    New Services Only
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
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
                    className="text-sm cursor-pointer flex-1 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    Fast Processing
                  </Label>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default FilterSidebar;
