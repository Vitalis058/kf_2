"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, validateMsalConfig } from "@/lib/auth/config";
import { ReactNode, useEffect, useState } from "react";

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

interface MSALProviderWrapperProps {
  children: ReactNode;
}

/**
 * MSAL Provider wrapper that handles SSR compatibility and initialization
 */
export function MSALProviderWrapper({ children }: MSALProviderWrapperProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        // Validate configuration first
        const validation = validateMsalConfig();
        if (!validation.isValid) {
          throw new Error(
            `MSAL Configuration Error: ${validation.errors.join(", ")}`
          );
        }

        // Initialize MSAL instance
        await msalInstance.initialize();

        // Handle redirect result on app load
        await msalInstance.handleRedirectPromise();

        setIsInitialized(true);
      } catch (error) {
        console.error("MSAL initialization error:", error);
        setInitError(
          error instanceof Error
            ? error.message
            : "Unknown initialization error"
        );
      }
    };

    initializeMsal();
  }, []);

  // Show loading state during initialization
  if (!isInitialized) {
    if (initError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Authentication Configuration Error
            </h2>
            <p className="text-muted-foreground">{initError}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check your environment variables and try again.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Initializing authentication...
          </p>
        </div>
      </div>
    );
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}

export { msalInstance };
