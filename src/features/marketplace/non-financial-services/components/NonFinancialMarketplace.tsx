"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Star } from "lucide-react";
import { useNonFinancialServices } from "../hooks/useNonFinancialServices";
import { SearchHeader } from "../../components/ui/SearchHeader";
import { FilterSidebar } from "../../components/ui/FilterSidebar";
import { FilterChips } from "../../components/ui/FilterChips";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { Pagination } from "../../components/ui/Pagination";
import { LoadingSpinner, EmptyState } from "../../components/ui/LoadingState";

export const NonFinancialMarketplace: React.FC = () => {
  const {
    // Data
    currentServices,
    filteredServices,
    facets,

    // State
    loading,
    error,
    searchFilters,
    filterStates,
    pagination,

    // Actions
    setSearchQuery,
    setShowNewOnly,
    handleFilterChange,
    clearFilters,
    setCurrentPage,
  } = useNonFinancialServices();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const handleViewDetails = (serviceId: string) => {
    window.location.href = `/marketplace/non-financial-services/${serviceId}`;
  };

  const handleRemoveFilter = (type: string, value?: string) => {
    switch (type) {
      case "search":
        setSearchQuery("");
        break;
      case "category":
        if (value) {
          handleFilterChange("category", value, false);
        }
        break;
      case "industry":
        if (value) {
          handleFilterChange("industry", value, false);
        }
        break;
      case "newOnly":
        setShowNewOnly(false);
        break;
      case "fastProcessing":
        handleFilterChange("fastProcessing", "fastProcessing", false);
        break;
      default:
        // Handle other filters
        if (value) {
          handleFilterChange(type, value, false);
        }
        break;
    }
  };

  const hasActiveFilters = Boolean(
    searchFilters.searchQuery ||
      searchFilters.showNewOnly ||
      filterStates.fastProcessing ||
      Object.values(filterStates.category || {}).some(Boolean) ||
      Object.values(filterStates.industry || {}).some(Boolean)
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-600">
              Error Loading Services
            </h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-green-100/60 to-transparent dark:from-transparent dark:via-green-900/30 dark:to-green-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-foreground mb-1">
                Non-Financial Services Marketplace
              </h1>
              <p className="text-sm text-muted-foreground mb-2">
                Business development services for UAE entrepreneurs and SMEs
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{filteredServices.length} services</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>4.7 rating</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>3 days avg. processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchHeader
            searchQuery={searchFilters.searchQuery}
            onSearchChange={setSearchQuery}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
            onShowFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />

          {/* Active Filter Chips */}
          <FilterChips
            searchFilters={searchFilters}
            filterStates={filterStates}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={clearFilters}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div
              className={`${
                showFilters ? "block" : "hidden lg:block"
              } transition-all duration-300`}
            >
              <div className="lg:sticky lg:top-16">
                <FilterSidebar
                  facets={facets}
                  filterStates={filterStates}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  totalItems={pagination.totalItems}
                  filteredItems={filteredServices.length}
                  serviceType="non-financial"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {filteredServices.length} services found
                  {hasActiveFilters && " (filtered)"}
                </p>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary border-primary/20 hover:bg-primary/5"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Services Grid/List */}
            {loading ? (
              <LoadingSpinner />
            ) : currentServices.length === 0 ? (
              <EmptyState
                title="No services found"
                description="Try adjusting your search criteria or filters to find what you're looking for."
                onClearFilters={hasActiveFilters ? clearFilters : undefined}
              />
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                      : "space-y-4"
                  }
                >
                  {currentServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      viewMode={viewMode}
                      onViewDetails={handleViewDetails}
                      serviceType="non-financial"
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonFinancialMarketplace;
