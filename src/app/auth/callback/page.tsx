"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { storeSessionFromToken } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

/**
 * Authentication callback page that handles the OAuth redirect
 * and exchanges the authorization code for tokens
 */
export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          throw new Error(errorDescription || error);
        }

        if (!code) {
          throw new Error("No authorization code received");
        }

        // Prepare token exchange request
        const tokenEndpoints = [
          `https://${process.env.NEXT_PUBLIC_CIAM_SUBDOMAIN}.ciamlogin.com/oauth2/v2.0/token`, // Sign-in
          `https://${process.env.NEXT_PUBLIC_CIAM_SUBDOMAIN}.ciamlogin.com/oauth2/v2.0/token`, // Sign-up
        ];

        const requestBody = new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_AAD_CLIENT_ID!,
          scope: "openid profile email",
          code,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
          grant_type: "authorization_code",
          ...(state && { state }),
        });

        let tokenResult = null;

        // Try token exchange
        for (const endpoint of tokenEndpoints) {
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: requestBody,
            });

            const result = await response.json();

            if (response.ok && result.id_token) {
              tokenResult = result;
              break;
            } else if (result.error !== "invalid_grant") {
              console.error("Token exchange error:", result);
            }
          } catch (fetchError) {
            console.error("Network error during token exchange:", fetchError);
          }
        }

        if (!tokenResult?.id_token) {
          throw new Error("Failed to exchange authorization code for tokens");
        }

        // Store session from ID token
        const session = storeSessionFromToken(tokenResult.id_token);
        if (!session) {
          throw new Error("Failed to parse authentication token");
        }

        setStatus("success");

        // Redirect to dashboard after successful authentication
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1500);
      } catch (err) {
        console.error("Authentication callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setStatus("error");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const handleRetry = () => {
    router.replace("/");
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <h2 className="text-xl font-semibold">Completing Authentication</h2>
          <p className="text-muted-foreground">
            Please wait while we sign you in...
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Authentication Successful!
          </h2>
          <p className="text-muted-foreground">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Authentication Failed</strong>
            <br />
            {error}
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button onClick={handleRetry} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
