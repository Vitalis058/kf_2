"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  // Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { SearchHeaderProps } from "../../types";

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onViewModeChange,
  viewMode,
  onShowFilters,
  showFilters,
}) => {
  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search financial services, funding options, or business solutions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 text-sm border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all bg-background/50 backdrop-blur-sm"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Filter Toggle - Mobile */}
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={onShowFilters}
            className="lg:hidden h-11 px-4 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            <span className="ml-1 text-xs text-muted-foreground">(Toggle)</span>
            {showFilters && (
              <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">
                •
              </Badge>
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-md overflow-hidden bg-background/50 backdrop-blur-sm">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="rounded-none border-0 h-11 px-3 text-sm"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-none border-0 h-11 px-3 text-sm"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Toggle - Desktop */}
      {/* <div className="hidden lg:block">
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={onShowFilters}
          className="h-9 px-4 text-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
          <span className="ml-2 text-xs text-muted-foreground">
            (Toggle filter sidebar)
          </span>
          {showFilters && (
            <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">
              •
            </Badge>
          )}
        </Button>
      </div> */}
    </div>
  );
};

export default SearchHeader;
