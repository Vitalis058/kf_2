"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FinancialService,
  FilterState,
  SearchFilters,
  PaginationState,
  Facet,
  FINANCIAL_SERVICE_CATEGORIES,
  INDUSTRY_OPTIONS,
} from "../types";
import {
  FinancialServicesAPI,
  getMockFinancialServices,
} from "../services/api";

interface UseFinancialServicesReturn {
  // Data
  services: FinancialService[];
  filteredServices: FinancialService[];
  facets: Facet[];
  currentServices: FinancialService[];

  // State
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  filterStates: FilterState;
  pagination: PaginationState;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedIndustry: (industry: string) => void;
  setSelectedPricing: (pricing: string) => void;
  setShowNewOnly: (show: boolean) => void;
  handleFilterChange: (
    facetCode: string,
    valueCode: string,
    checked?: boolean
  ) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
  refreshServices: () => Promise<void>;
}

export const useFinancialServices = (): UseFinancialServicesReturn => {
  // Data state
  const [services, setServices] = useState<FinancialService[]>([]);
  const [filteredServices, setFilteredServices] = useState<FinancialService[]>(
    []
  );
  const [facets, setFacets] = useState<Facet[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter state
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchQuery: "",
    selectedCategory: "all",
    selectedIndustry: "all",
    selectedPricing: "all",
    showNewOnly: false,
  });

  const [filterStates, setFilterStates] = useState<FilterState>({});

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0,
  });

  // Initialize filter states - simplified
  const initializeFilterStates = useCallback((): FilterState => {
    const initial: FilterState = {
      category: {},
      industry: {},
      newOnly: false,
      fastProcessing: false,
    };

    // Initialize category filters (exclude "all" option)
    FINANCIAL_SERVICE_CATEGORIES.forEach((category) => {
      if (category.value !== "all") {
        (initial.category as Record<string, boolean>)[category.value] = false;
      }
    });

    // Initialize industry filters (exclude "all" option) - only first 4
    INDUSTRY_OPTIONS.filter((ind) => ind.value !== "all")
      .slice(0, 4)
      .forEach((industry) => {
        (initial.industry as Record<string, boolean>)[industry.value] = false;
      });

    return initial;
  }, []);

  // Fetch services and facets
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first, fallback to mock data
      let servicesResponse;
      let facetsResponse;

      try {
        servicesResponse = await FinancialServicesAPI.getFinancialServices({
          take: 50,
        });
        facetsResponse = await FinancialServicesAPI.getFacets();
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        servicesResponse = await getMockFinancialServices();
        facetsResponse = { facets: { items: [] } };
      }

      setServices(servicesResponse.products.items);
      setFacets(facetsResponse.facets.items);

      // Initialize filter states
      setFilterStates(initializeFilterStates());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [initializeFilterStates]);

  // Filter services based on search and filters
  const applyFilters = useCallback(
    (
      services: FinancialService[],
      filters: SearchFilters,
      filterStates: FilterState
    ) => {
      console.log("ApplyFilters called with services:", services.length);
      let filtered = [...services];

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (service) =>
            service.name.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query) ||
            service.category.toLowerCase().includes(query) ||
            service.industry.toLowerCase().includes(query) ||
            service.features.some((feature) =>
              feature.toLowerCase().includes(query)
            )
        );
      }

      // Category filter - check if any categories are selected
      const selectedCategories = Object.keys(
        (filterStates.category as Record<string, boolean>) || {}
      ).filter(
        (key) => (filterStates.category as Record<string, boolean>)?.[key]
      );
      console.log(
        "Category filtering - Selected categories:",
        selectedCategories
      );
      console.log("Category filtering - Services before:", filtered.length);

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((service) =>
          selectedCategories.includes(service.category)
        );
        console.log("Category filtering - Services after:", filtered.length);
      }

      // Industry filter - check if any industries are selected
      const selectedIndustries = Object.keys(
        (filterStates.industry as Record<string, boolean>) || {}
      ).filter(
        (key) => (filterStates.industry as Record<string, boolean>)?.[key]
      );

      if (selectedIndustries.length > 0) {
        filtered = filtered.filter((service) =>
          selectedIndustries.some((industry) =>
            service.industry.toLowerCase().includes(industry.toLowerCase())
          )
        );
      }

      // New services filter
      if (filters.showNewOnly) {
        filtered = filtered.filter((service) => service.isNew);
      }

      // Fast processing filter
      if (filterStates.fastProcessing) {
        filtered = filtered.filter(
          (service) =>
            service.processingTime.includes("3-5") ||
            service.processingTime.includes("5-7")
        );
      }

      return filtered;
    },
    []
  );

  // Update filtered services when dependencies change
  useEffect(() => {
    console.log("Filtering - Input services:", services.length);
    console.log("Filtering - Search filters:", searchFilters);
    console.log("Filtering - Filter states:", filterStates);

    const filtered = applyFilters(services, searchFilters, filterStates);
    console.log("Filtering - Output filtered:", filtered.length);

    setFilteredServices(filtered);

    // Update pagination
    const totalPages = Math.ceil(filtered.length / pagination.itemsPerPage);
    setPagination((prev) => ({
      ...prev,
      totalItems: filtered.length,
      totalPages,
      currentPage: 1, // Reset to first page when filters change
    }));
  }, [
    services,
    searchFilters,
    filterStates,
    applyFilters,
    pagination.itemsPerPage,
  ]);

  // Get current page services
  const currentServices = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, pagination.currentPage, pagination.itemsPerPage]);

  // Action handlers
  const setSearchQuery = useCallback((query: string) => {
    setSearchFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedCategory = useCallback((category: string) => {
    setSearchFilters((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const setSelectedIndustry = useCallback((industry: string) => {
    setSearchFilters((prev) => ({ ...prev, selectedIndustry: industry }));
  }, []);

  const setSelectedPricing = useCallback((pricing: string) => {
    setSearchFilters((prev) => ({ ...prev, selectedPricing: pricing }));
  }, []);

  const setShowNewOnly = useCallback((show: boolean) => {
    setSearchFilters((prev) => ({ ...prev, showNewOnly: show }));
  }, []);

  const handleFilterChange = useCallback(
    (facetCode: string, valueCode: string, checked?: boolean) => {
      // Handle special filter cases
      if (facetCode === "category") {
        setFilterStates((prev) => ({
          ...prev,
          category: {
            ...(prev.category as Record<string, boolean>),
            [valueCode]:
              checked !== undefined
                ? checked
                : !(prev.category as Record<string, boolean>)?.[valueCode],
          },
        }));
        return;
      }

      if (facetCode === "industry") {
        setFilterStates((prev) => ({
          ...prev,
          industry: {
            ...(prev.industry as Record<string, boolean>),
            [valueCode]:
              checked !== undefined
                ? checked
                : !(prev.industry as Record<string, boolean>)?.[valueCode],
          },
        }));
        return;
      }

      if (facetCode === "newOnly") {
        setSearchFilters((prev) => ({
          ...prev,
          showNewOnly: checked || false,
        }));
        return;
      }

      if (facetCode === "fastProcessing") {
        setFilterStates((prev) => ({
          ...prev,
          fastProcessing: checked || false,
        }));
        return;
      }

      // Handle facet-based filters
      setFilterStates((prev) => ({
        ...prev,
        [facetCode]: {
          ...(prev as Record<string, any>)[facetCode],
          [valueCode]:
            checked !== undefined
              ? checked
              : !(prev as Record<string, any>)[facetCode]?.[valueCode],
        },
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setSearchFilters({
      searchQuery: "",
      selectedCategory: "all",
      selectedIndustry: "all",
      selectedPricing: "all",
      showNewOnly: false,
    });
    setFilterStates(initializeFilterStates());
  }, [initializeFilterStates]);

  const setCurrentPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const refreshServices = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    // Data
    services,
    filteredServices,
    facets,
    currentServices,

    // State
    loading,
    error,
    searchFilters,
    filterStates,
    pagination,

    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedIndustry,
    setSelectedPricing,
    setShowNewOnly,
    handleFilterChange,
    clearFilters,
    setCurrentPage,
    refreshServices,
  };
};
