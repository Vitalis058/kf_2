import { jwtDecode } from "jwt-decode";

const SESSION_KEY = "kf_auth_session";

/**
 * Authentication session interface based on JWT token claims
 */
export interface AuthSession {
  exp: number;          // Expiration time
  nbf: number;          // Not before time
  ver: string;          // Version
  iss: string;          // Issuer
  sub: string;          // Subject (user ID)
  aud: string;          // Audience
  nonce: string;        // Nonce
  iat: number;          // Issued at
  auth_time: number;    // Authentication time
  idp: string;          // Identity provider
  name: string;         // Display name
  given_name: string;   // First name
  family_name: string;  // Last name
  emails: string[];     // Email addresses
  tfp: string;          // Trust framework policy
}

/**
 * Get the current authentication session from localStorage
 */
export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    
    const parsed = JSON.parse(session) as AuthSession;
    
    // Check if session is expired
    const now = Math.floor(Date.now() / 1000);
    if (parsed.exp && parsed.exp < now) {
      destroySession();
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error("Error parsing session:", error);
    destroySession();
    return null;
  }
}

/**
 * Store authentication session in localStorage
 */
export function storeSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Error storing session:", error);
  }
}

/**
 * Store session from JWT ID token
 */
export function storeSessionFromToken(idToken: string): AuthSession | null {
  try {
    const decoded = jwtDecode(idToken) as AuthSession;
    storeSession(decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding ID token:", error);
    return null;
  }
}

/**
 * Clear authentication session
 */
export function destroySession(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(SESSION_KEY);
    // Also clear any MSAL cache
    localStorage.removeItem(`msal.account.keys`);
    localStorage.removeItem(`msal.token.keys.${process.env.NEXT_PUBLIC_AAD_CLIENT_ID}`);
  } catch (error) {
    console.error("Error destroying session:", error);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Get user display name from session
 */
export function getDisplayName(): string {
  const session = getSession();
  return session?.name || session?.given_name || "User";
}

/**
 * Get user email from session
 */
export function getUserEmail(): string | null {
  const session = getSession();
  return session?.emails?.[0] || null;
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(): string {
  const session = getSession();
  if (!session) return "U";
  
  const firstName = session.given_name || "";
  const lastName = session.family_name || "";
  
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  
  if (session.name) {
    const parts = session.name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return session.name.substring(0, 2).toUpperCase();
  }
  
  return "U";
}

/**
 * Check if session will expire soon (within 5 minutes)
 */
export function isSessionExpiringSoon(): boolean {
  const session = getSession();
  if (!session?.exp) return false;
  
  const now = Math.floor(Date.now() / 1000);
  const fiveMinutes = 5 * 60;
  
  return session.exp - now < fiveMinutes;
}
