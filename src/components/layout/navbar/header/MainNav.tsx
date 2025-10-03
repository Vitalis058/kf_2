"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  Building2,
  Home,
  Bell,
  User,
  Settings,
  LogOut,
  FileText,
  BarChart3,
  CreditCard,
  Newspaper,
  Users,
  GraduationCap,
  TrendingUp,
  Calendar,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const getNavLinkClass = () =>
  `group inline-flex h-9 text-white items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full hover:bg-white/20`;

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "critical" as const,
    message: "Document submission deadline approaching",
    time: "2 hours ago",
    read: false,
    actionUrl: "/dashboard/documents",
    category: "compliance",
  },
  {
    id: "2",
    type: "message" as const,
    message: "New funding opportunity available",
    time: "1 day ago",
    read: false,
    actionUrl: "/marketplace/financial-services",
    category: "opportunity",
  },
  {
    id: "3",
    type: "update" as const,
    message: "Profile verification completed",
    time: "3 days ago",
    read: true,
    actionUrl: "/dashboard/profile",
    category: "profile",
  },
];

// Explore dropdown items - matching MZN-EJP-v2 with all 8 marketplaces
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
    href: "/marketplace/community",
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

export function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // Count unread notifications
  const unreadCount = mockNotifications.filter((notif) => !notif.read).length;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showNotifications) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

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
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-white">
                <Home className="h-4 w-4 transition-colors text-primary" />
              </div>
              <span className="text-xl font-bold transition-colors text-white">
                Khalifa Fund
              </span>
            </Link>

            {/* Navigation Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(getNavLinkClass(), "bg-primary/30")}
                  >
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[520px] p-5">
                      <div className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900">
                          Explore Marketplaces
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Discover opportunities across Khalifa Fund&apos;s
                          ecosystem
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {exploreItems.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={item.href}
                              className="group relative flex flex-col p-4 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg focus:shadow-lg focus:outline-none transition-all duration-200 bg-card hover:bg-accent/50"
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center group-hover:bg-primary/10 transition-all duration-200">
                                  <item.icon
                                    size={16}
                                    className="text-primary"
                                  />
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className={getNavLinkClass()} asChild>
                    <Link href="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className={getNavLinkClass()} asChild>
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Contact & Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 transition-all rounded-full text-white hover:text-white hover:bg-white/20"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="h-9 w-9 transition-all relative rounded-full text-white hover:text-white hover:bg-white/20"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl backdrop-blur-md z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-card-foreground">
                          Notifications
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {unreadCount} unread
                        </Badge>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {mockNotifications.map((notification) => (
                          <Link
                            key={notification.id}
                            href={notification.actionUrl}
                            className={`block p-3 rounded-lg transition-all duration-200 ${
                              notification.read
                                ? "hover:bg-accent/40"
                                : "bg-primary/5 hover:bg-primary/10 border-l-2 border-primary"
                            }`}
                            onClick={() => setShowNotifications(false)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === "critical"
                                    ? "bg-red-500"
                                    : notification.type === "message"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                                }`}
                              />
                              <div className="flex-1">
                                <p
                                  className={`text-sm ${
                                    notification.read
                                      ? "text-muted-foreground"
                                      : "text-card-foreground font-medium"
                                  }`}
                                >
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full transition-all hover:bg-white/20"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.initials || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/documents"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Documents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  asChild
                  className="hidden sm:flex transition-all rounded-full text-white hover:text-white hover:bg-white/20"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="hidden sm:flex transition-all rounded-full bg-blue-500/20 text-primary dark:text-white hover:bg-white/90 border-white"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
