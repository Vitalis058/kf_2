/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  getSession, 
  destroySession, 
  getUserEmail, 
  getUserInitials,
  type AuthSession 
} from "@/lib/auth/session";
import { loginRequest, signUpRequest } from "@/lib/auth/config";
import { InteractionStatus } from "@azure/msal-browser";

/**
 * Custom hook for authentication state and actions
 */
export function useAuth() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  // Initialize MSAL state
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);

  // Sync session state
  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, [isAuthenticated]);

  // Set active account if available
  useEffect(() => {
    if (!isMsalInitialized || !accounts.length) return;
    
    const activeAccount = instance.getActiveAccount();
    if (!activeAccount && accounts[0]) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [instance, accounts, isMsalInitialized]);

  /**
   * Sign in with popup (fallback to redirect)
   */
  const signIn = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }

    setIsLoading(true);
    try {
      const result = await instance.loginPopup(loginRequest);
      if (result?.account) {
        instance.setActiveAccount(result.account);
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message = `${error?.errorCode || ""} ${error?.message || ""}`.toLowerCase();
      
      // Fallback to redirect for popup issues
      if (message.includes("popup_window_error") || message.includes("monitor_window_timeout")) {
        await instance.loginRedirect(loginRequest);
        return;
      }
      
      console.error("Sign in failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up with popup (fallback to redirect)
   */
  const signUp = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }

    setIsLoading(true);
    try {
      const result = await instance.loginPopup(signUpRequest);
      if (result?.account) {
        instance.setActiveAccount(result.account);
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message = `${error?.errorCode || ""} ${error?.message || ""}`.toLowerCase();
      
      // Fallback to redirect for popup issues
      if (message.includes("popup_window_error") || message.includes("monitor_window_timeout")) {
        await instance.loginRedirect(signUpRequest);
        return;
      }
      
      console.error("Sign up failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out and redirect
   */
  const signOut = async () => {
    if (!isMsalInitialized) return;

    try {
      destroySession();
      
      const account = instance.getActiveAccount() ?? accounts[0];
      await instance.logoutRedirect({
        account,
        postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      // Still redirect even if logout fails
      router.push("/");
    }
  };

  /**
   * Force redirect to sign in
   */
  const signInRedirect = async () => {
    if (!isMsalInitialized) return;
    await instance.loginRedirect(loginRequest);
  };

  /**
   * Force redirect to sign up
   */
  const signUpRedirect = async () => {
    if (!isMsalInitialized) return;
    await instance.loginRedirect(signUpRequest);
  };

  return {
    // State
    isAuthenticated: isAuthenticated && !!session,
    isLoading,
    isMsalInitialized,
    session,
    
    // User info
    user: session ? {
      email: getUserEmail(),
      initials: getUserInitials(),
      ...session,
    } : null,
    
    
    // Actions
    signIn,
    signUp,
    signOut,
    signInRedirect,
    signUpRedirect,
  };
}
