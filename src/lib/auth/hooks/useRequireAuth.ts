"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * Hook to require authentication on a page
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo: string = "/") {
  const { isAuthenticated, isMsalInitialized, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for MSAL to initialize
    if (!isMsalInitialized || isLoading) return;

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isMsalInitialized, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading: isLoading || !isMsalInitialized,
  };
}
