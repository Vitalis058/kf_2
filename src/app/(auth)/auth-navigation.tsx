"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function AuthNavigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="p-6">
      <div className="flex items-center justify-between">
        {/* Left side - Back to home */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white hover:text-white hover:bg-white/20 transition-all rounded-full"
          >
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Center - Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">
            Khalifa Fund
          </span>
        </Link>

        {/* Right side - Theme toggle */}
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </nav>
  );
}
