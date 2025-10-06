"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommunityGrid } from "./CommunityGrid";
import { RequestCommunityModal } from "./RequestCommunityModal";
import { useCommunityData } from "../hooks/useCommunityData";
import { useRequestCommunity } from "../hooks/useRequestCommunity";
import { COMMUNITY_CATEGORIES, CommunityRequestData } from "../types";

export const CommunityMarketplace: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Custom hooks
  const { communities, loading, error, refetch } = useCommunityData({
    search: searchQuery,
    category: selectedCategory,
  });

  const { submitRequest } = useRequestCommunity();

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRequestSubmit = async (data: CommunityRequestData) => {
    await submitRequest(data);
    setShowRequestModal(false);
    // Optionally refetch communities to show updated list
    refetch();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "all";

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title and Description */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    Community Marketplace
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    Discover and request communities for knowledge sharing and
                    collaboration
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setShowRequestModal(true)}
              size="lg"
              className="flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline">Request a Community</span>
              <span className="xs:hidden">Request</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full"
                aria-label="Search communities"
                role="searchbox"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-shrink-0">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  className="w-full sm:w-[180px] min-w-[140px]"
                  aria-label="Filter by category"
                >
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {COMMUNITY_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>

              {searchQuery.trim() && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-destructive"
                    aria-label={`Remove search filter: ${searchQuery}`}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Category:{" "}
                  {
                    COMMUNITY_CATEGORIES.find(
                      (c) => c.value === selectedCategory
                    )?.label
                  }
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-destructive"
                    aria-label={`Remove category filter: ${
                      COMMUNITY_CATEGORIES.find(
                        (c) => c.value === selectedCategory
                      )?.label
                    }`}
                  >
                    ×
                  </button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-6 px-2 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main
        className="container mx-auto px-4 py-8"
        role="main"
        aria-label="Community marketplace content"
      >
        {/* Results Summary */}
        {!loading && communities && (
          <div className="mb-6" role="status" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              {communities.length === 0
                ? "No communities found"
                : `Showing ${communities.length} ${
                    communities.length === 1 ? "community" : "communities"
                  }`}
              {hasActiveFilters && " matching your criteria"}
            </p>
          </div>
        )}

        {/* Loading Summary */}
        {loading && (
          <div className="mb-6" role="status" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              Loading communities...
            </p>
          </div>
        )}

        {/* Communities Grid */}
        <section aria-label="Communities list">
          <CommunityGrid
            communities={communities}
            loading={loading}
            error={error}
          />
        </section>
      </main>

      {/* Request Community Modal */}
      <RequestCommunityModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default CommunityMarketplace;
