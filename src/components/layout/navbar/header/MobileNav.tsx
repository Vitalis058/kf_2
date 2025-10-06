"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import {
  Home,
  Building2,
  Users,
  MessageSquare,
  BarChart3,
  FileText,
  User,
  Settings,
  Phone,
  Menu,
  CreditCard,
  Newspaper,
  GraduationCap,
  TrendingUp,
  Calendar,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Explore dropdown items - matching MainNav
const exploreItems = [
  {
    id: "non-financial",
    name: "Non-Financial Marketplace",
    description:
      "Business registration, legal advisory, tax, compliance, and SME support services",
    icon: Building2,
    href: "/marketplace/non-financial-services",
  },
  {
    id: "finance",
    name: "Finance Marketplace",
    description:
      "Funding options, grants, and financial services to help SMEs manage and grow",
    icon: CreditCard,
    href: "/marketplace/financial-services",
  },
  {
    id: "media",
    name: "Media Marketplace",
    description:
      "News, articles, and updates on Abu Dhabi's business landscape with industry insights",
    icon: Newspaper,
    href: "/marketplace/media",
  },
  {
    id: "community",
    name: "Community Marketplace",
    description:
      "Industry communities for networking, collaboration, and sharing best practices",
    icon: Users,
    href: "/marketplace/communities",
  },
  {
    id: "course",
    name: "Course Marketplace",
    description:
      "Training and educational modules to build entrepreneurship skills and enhance businesses",
    icon: GraduationCap,
    href: "/marketplace/courses",
  },
  {
    id: "investment",
    name: "Investment Marketplace",
    description:
      "Access to venture capital, crowdfunding, and grants for SME growth",
    icon: TrendingUp,
    href: "/marketplace/investment",
  },
  {
    id: "calendar",
    name: "Calendar Marketplace",
    description:
      "Event management, matchmaking, and notifications for upcoming business events",
    icon: Calendar,
    href: "/marketplace/calendar",
  },
  {
    id: "opportunity",
    name: "Opportunity Marketplace",
    description:
      "Business opportunities, partnerships, and growth prospects for SMEs",
    icon: Sparkles,
    href: "/marketplace/opportunities",
  },
];

export function MobileNav() {
  const { isAuthenticated, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "top-4 px-4" : "top-4 px-4"
      }`}
    >
      <div className="container mx-auto">
        <div
          className={`flex h-16 items-center justify-between px-6 transition-all duration-300 rounded-full ${
            scrolled
              ? "bg-gradient-to-r from-teal-500/80 via-blue-500/80 to-purple-600/80 backdrop-blur-md shadow-lg"
              : "bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-white">
              <Home className="h-4 w-4 transition-colors text-primary" />
            </div>
            <span className="text-lg font-semibold text-white">
              Khalifa Fund
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-9 w-9 transition-all rounded-full text-white hover:text-white hover:bg-white/20"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-background">
              <ScrollArea className="h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Home className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">
                          Khalifa Fund
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          Business Ecosystem
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 p-4">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                      <Link
                        href="/"
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Home</span>
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">About</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Contact</span>
                      </Link>
                    </div>

                    {/* Explore Marketplaces */}
                    <Collapsible
                      open={showExploreDropdown}
                      onOpenChange={setShowExploreDropdown}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-2.5 h-auto hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Explore Marketplaces
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {exploreItems.length}
                            </Badge>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform ${
                              showExploreDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-1">
                        {exploreItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center gap-3 p-2.5 ml-6 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium truncate">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Dashboard Section */}
                    {isAuthenticated && (
                      <Collapsible
                        open={showDashboardDropdown}
                        onOpenChange={setShowDashboardDropdown}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-2.5 h-auto hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                Dashboard
                              </span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-muted-foreground transition-transform ${
                                showDashboardDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 mt-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 p-2.5 ml-6 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Overview
                            </span>
                          </Link>
                          <Link
                            href="/dashboard/documents"
                            className="flex items-center gap-3 p-2.5 ml-6 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Documents
                            </span>
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 p-2.5 ml-6 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Profile</span>
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 p-2.5 ml-6 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Settings
                            </span>
                          </Link>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-border">
                    <div className="space-y-3">
                      {/* Theme Toggle */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-3 p-2.5 h-auto hover:bg-muted/50"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        {theme === "dark" ? (
                          <Sun className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Moon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                      </Button>

                      <div className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            Contact
                          </p>
                          <p className="text-xs text-muted-foreground">
                            +971 2 401 0000
                          </p>
                        </div>
                      </div>

                      {isAuthenticated ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign Out
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <Link
                              href="/login"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Sign In
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <Link
                              href="/register"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Sign Up
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
