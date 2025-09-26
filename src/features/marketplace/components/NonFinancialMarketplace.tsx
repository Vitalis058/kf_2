"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  ChartBar,
  GraduationCap,
  Handshake,
  Lightbulb,
  Rocket,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Mock data for non-financial services
const mockNonFinancialServices = [
  {
    id: "1",
    name: "Academy & Training Programs",
    description:
      "Professional development and business training programs to enhance your entrepreneurial skills and business knowledge.",
    category: "Training",
    industry: "All Industries",
    duration: "2-6 months",
    cost: "Free - Premium",
    rating: 4.9,
    reviews: 234,
    isNew: true,
    features: [
      "Business Management Training",
      "Leadership Development",
      "Digital Skills Programs",
      "Industry Workshops",
    ],
    provider: "Khalifa Academy",
    location: "Dubai, Abu Dhabi",
    image: "/images/training-academy.jpg",
  },
  {
    id: "2",
    name: "Operational Advisory Services",
    description:
      "Expert business advisory and consulting services to optimize your operations, strategy, and overall business performance.",
    category: "Advisory",
    industry: "All Industries",
    duration: "3-12 months",
    cost: "Consultation-based",
    rating: 4.8,
    reviews: 156,
    isNew: false,
    features: [
      "Business Strategy Consulting",
      "Operational Efficiency",
      "Market Analysis",
      "Performance Optimization",
    ],
    provider: "Khalifa Advisory",
    location: "UAE-wide",
    image: "/images/advisory-services.jpg",
  },
  {
    id: "3",
    name: "Proximity Incubators",
    description:
      "Business incubation and acceleration programs to nurture innovative startups and growing companies with mentorship and resources.",
    category: "Incubation",
    industry: "Technology, Innovation",
    duration: "6-24 months",
    cost: "Equity-based",
    rating: 4.7,
    reviews: 89,
    isNew: false,
    features: [
      "Startup Incubation",
      "Mentorship Programs",
      "Co-working Spaces",
      "Acceleration Support",
    ],
    provider: "Khalifa Innovation Hub",
    location: "Dubai, Abu Dhabi, Sharjah",
    image: "/images/incubator-program.jpg",
  },
  {
    id: "4",
    name: "Partnerships & Opportunities",
    description:
      "Business networking and partnership opportunities to expand your reach, capabilities, and market presence.",
    category: "Partnerships",
    industry: "All Industries",
    duration: "Ongoing",
    cost: "Free",
    rating: 4.6,
    reviews: 178,
    isNew: true,
    features: [
      "Business Matching",
      "Strategic Partnerships",
      "Collaboration Opportunities",
      "Joint Ventures",
    ],
    provider: "Khalifa Connect",
    location: "UAE-wide",
    image: "/images/partnerships.jpg",
  },
  {
    id: "5",
    name: "Events & Networking",
    description:
      "Business events, conferences, and networking opportunities to connect with the entrepreneurial community and industry leaders.",
    category: "Events",
    industry: "All Industries",
    duration: "1-3 days",
    cost: "Free - Premium",
    rating: 4.8,
    reviews: 312,
    isNew: false,
    features: [
      "Industry Conferences",
      "Networking Events",
      "Business Forums",
      "Trade Shows",
    ],
    provider: "Khalifa Events",
    location: "Various UAE locations",
    image: "/images/networking-events.jpg",
  },
  {
    id: "6",
    name: "Legal, Compliance & Licensing",
    description:
      "Legal support and regulatory compliance assistance to ensure your business operates smoothly within UAE regulations.",
    category: "Legal",
    industry: "All Industries",
    duration: "1-4 weeks",
    cost: "Service-based",
    rating: 4.5,
    reviews: 145,
    isNew: false,
    features: [
      "Legal Advisory",
      "Compliance Support",
      "Licensing Assistance",
      "Regulatory Guidance",
    ],
    provider: "Khalifa Legal",
    location: "UAE-wide",
    image: "/images/legal-services.jpg",
  },
  {
    id: "7",
    name: "Digital Solutions",
    description:
      "Technology solutions and digital transformation services to modernize your business operations and enhance efficiency.",
    category: "Digital",
    industry: "All Industries",
    duration: "2-8 weeks",
    cost: "Project-based",
    rating: 4.7,
    reviews: 198,
    isNew: true,
    features: [
      "Digital Transformation",
      "Technology Solutions",
      "E-commerce Setup",
      "Digital Marketing",
    ],
    provider: "Khalifa Digital",
    location: "UAE-wide",
    image: "/images/digital-solutions.jpg",
  },
  {
    id: "8",
    name: "Export & Trade Facilitation",
    description:
      "International trade support and export facilitation to help you expand into global markets and increase revenue.",
    category: "Trade",
    industry: "Manufacturing, Services",
    duration: "4-12 weeks",
    cost: "Service-based",
    rating: 4.6,
    reviews: 87,
    isNew: false,
    features: [
      "Export Support",
      "Trade Finance",
      "Market Entry Assistance",
      "International Partnerships",
    ],
    provider: "Khalifa Trade",
    location: "UAE-wide",
    image: "/images/export-trade.jpg",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Training", label: "Training" },
  { value: "Advisory", label: "Advisory" },
  { value: "Incubation", label: "Incubation" },
  { value: "Partnerships", label: "Partnerships" },
  { value: "Events", label: "Events" },
  { value: "Legal", label: "Legal" },
  { value: "Digital", label: "Digital" },
  { value: "Trade", label: "Trade" },
];

const industries = [
  { value: "all", label: "All Industries" },
  { value: "Technology", label: "Technology" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Services", label: "Services" },
  { value: "Innovation", label: "Innovation" },
];

const pricingModels = [
  { value: "all", label: "All Pricing" },
  { value: "free", label: "Free" },
  { value: "premium", label: "Premium" },
  { value: "consultation", label: "Consultation-based" },
  { value: "equity", label: "Equity-based" },
  { value: "service", label: "Service-based" },
  { value: "project", label: "Project-based" },
];

interface NonFinancialServiceCardProps {
  service: (typeof mockNonFinancialServices)[0];
  viewMode: "grid" | "list";
}

function NonFinancialServiceCard({
  service,
  viewMode,
}: NonFinancialServiceCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Training":
        return <GraduationCap className="h-5 w-5" />;
      case "Advisory":
        return <Lightbulb className="h-5 w-5" />;
      case "Incubation":
        return <Rocket className="h-5 w-5" />;
      case "Partnerships":
        return <Handshake className="h-5 w-5" />;
      case "Events":
        return <Calendar className="h-5 w-5" />;
      case "Legal":
        return <Shield className="h-5 w-5" />;
      case "Digital":
        return <ChartBar className="h-5 w-5" />;
      case "Trade":
        return <MapPin className="h-5 w-5" />;
      default:
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              {getCategoryIcon(service.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {service.name}
                    </h3>
                    {service.isNew && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{service.rating}</span>
                  <span>({service.reviews})</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{service.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{service.location}</span>
                </div>
              </div>

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
                <Button size="sm" className="ml-4">
                  <Link
                    href={`/marketplace/non-financial-services/${service.id}`}
                    className="flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {getCategoryIcon(service.category)}
          </div>
          {service.isNew && (
            <Badge variant="secondary" className="text-xs">
              New
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {service.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {service.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{service.industry}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted-foreground">({service.reviews})</span>
          </div>
        </div>

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

        <Button className="w-full mt-auto">
          <Link
            href={`/marketplace/non-financial-services/${service.id}`}
            className="flex items-center justify-center gap-1"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function NonFinancialMarketplace() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [services, setServices] = useState(mockNonFinancialServices);
  const [filteredServices, setFilteredServices] = useState(
    mockNonFinancialServices
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12;

  // Filter services based on search and filters
  useEffect(() => {
    let filtered = services;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Industry filter
    if (selectedIndustry !== "all") {
      filtered = filtered.filter((service) =>
        service.industry.toLowerCase().includes(selectedIndustry.toLowerCase())
      );
    }

    // Pricing filter
    if (selectedPricing !== "all") {
      filtered = filtered.filter((service) => {
        switch (selectedPricing) {
          case "free":
            return service.cost.toLowerCase().includes("free");
          case "premium":
            return service.cost.toLowerCase().includes("premium");
          case "consultation":
            return service.cost.toLowerCase().includes("consultation");
          case "equity":
            return service.cost.toLowerCase().includes("equity");
          case "service":
            return service.cost.toLowerCase().includes("service");
          case "project":
            return service.cost.toLowerCase().includes("project");
          default:
            return true;
        }
      });
    }

    // New services filter
    if (showNewOnly) {
      filtered = filtered.filter((service) => service.isNew);
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [
    services,
    searchQuery,
    selectedCategory,
    selectedIndustry,
    selectedPricing,
    showNewOnly,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedIndustry("all");
    setSelectedPricing("all");
    setShowNewOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedIndustry !== "all" ||
    selectedPricing !== "all" ||
    showNewOnly;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 dark:from-blue-950 dark:via-blue-900/30 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            🎯 Business Development Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Business Development Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive business development services designed to help UAE
            entrepreneurs build capabilities, expand networks, and accelerate
            growth beyond just funding.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search business development services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden lg:block"
            } bg-muted/30 rounded-lg p-6 mb-6`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Industry
                </Label>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Pricing
                </Label>
                <Select
                  value={selectedPricing}
                  onValueChange={setSelectedPricing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingModels.map((pricing) => (
                      <SelectItem key={pricing.value} value={pricing.value}>
                        {pricing.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-only"
                  checked={showNewOnly}
                  onCheckedChange={(checked) =>
                    setShowNewOnly(checked as boolean)
                  }
                />
                <Label htmlFor="new-only" className="text-sm font-medium">
                  New Services Only
                </Label>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {filteredServices.length} services found
                </span>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Business Development Services ({filteredServices.length})
            </h2>
          </div>

          {currentServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No services found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {currentServices.map((service) => (
                <NonFinancialServiceCard
                  key={service.id}
                  service={service}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
