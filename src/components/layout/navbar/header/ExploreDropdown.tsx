"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  BarChart3,
  FileText,
  HelpCircle,
  ChevronDown,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface ExploreItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

const exploreItems: ExploreItem[] = [
  {
    id: "marketplace",
    name: "Marketplace",
    description: "Financial and non-financial services",
    icon: Building2,
    href: "/marketplace",
    badge: "New",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Your business overview and tools",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    id: "documents",
    name: "Document Wallet",
    description: "Manage your business documents",
    icon: FileText,
    href: "/dashboard/documents",
  },
  {
    id: "support",
    name: "Support Center",
    description: "Get help and support",
    icon: HelpCircle,
    href: "/support",
  },
];

const quickActions: ExploreItem[] = [
  {
    id: "events",
    name: "Events & Workshops",
    description: "Upcoming business events",
    icon: Calendar,
    href: "/events",
  },
  {
    id: "insights",
    name: "Business Insights",
    description: "Market trends and analytics",
    icon: TrendingUp,
    href: "/insights",
  },
  {
    id: "community",
    name: "Community",
    description: "Connect with other entrepreneurs",
    icon: Users,
    href: "/community",
  },
  {
    id: "compliance",
    name: "Compliance Hub",
    description: "Regulatory requirements",
    icon: Shield,
    href: "/compliance",
  },
];

interface ExploreDropdownProps {
  isCompact?: boolean;
  className?: string;
}

export function ExploreDropdown({ className }: ExploreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-1 ${className || ""}`}
        >
          Explore
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2" align="start">
        <div className="space-y-4">
          {/* Main Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
              Main Navigation
            </h4>
            <div className="space-y-1">
              {exploreItems.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="bg-primary/15 rounded-lg p-2">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-card-foreground">
                          {item.name}
                        </h5>
                        {item.badge && (
                          <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
              Quick Actions
            </h4>
            <div className="space-y-1">
              {quickActions.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-card-foreground">
                        {item.name}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="border-t pt-3">
            <DropdownMenuItem asChild>
              <Link
                href="/contact"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors w-full"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-card-foreground">
                    Contact Support
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    Get help from our team
                  </p>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
