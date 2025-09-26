import { Configuration, LogLevel } from "@azure/msal-browser";

// Environment variables for MSAL configuration
const SUBDOMAIN = process.env.NEXT_PUBLIC_CIAM_SUBDOMAIN!;           // e.g. "khalifafund"
const CLIENT_ID = process.env.NEXT_PUBLIC_AAD_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const POST_LOGOUT_REDIRECT_URI = process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI!;
const API_SCOPES = (process.env.NEXT_PUBLIC_API_SCOPES || "").split(/\s+/).filter(Boolean);

// Custom domain support (optional)
const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CIAM_CUSTOM_DOMAIN; // e.g., "login.khalifafund.ae"
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;              // GUID tenant id (only needed with custom domain)

// Authority URL construction
const authority = CUSTOM_DOMAIN && TENANT_ID
  ? `https://${CUSTOM_DOMAIN}/${TENANT_ID}`  // Custom domain pattern
  : `https://${SUBDOMAIN}.ciamlogin.com/`;   // Default External ID pattern

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority,
    knownAuthorities: [CUSTOM_DOMAIN ? CUSTOM_DOMAIN : `${SUBDOMAIN}.ciamlogin.com`],
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (level, message) => {
        if (level >= LogLevel.Error) {
          console.error("[MSAL Error]:", message);
        }
      },
    },
  },
};

// Login request configuration
export const loginRequest = { 
  scopes: API_SCOPES.length ? API_SCOPES : [] 
};

// Sign-up request configuration (forces sign-up UI)
export const signUpRequest = {
  ...loginRequest,
  extraQueryParameters: { prompt: "create" },
};

// Validation helper
export function validateMsalConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!CLIENT_ID) errors.push("NEXT_PUBLIC_AAD_CLIENT_ID is required");
  if (!SUBDOMAIN && !CUSTOM_DOMAIN) errors.push("Either NEXT_PUBLIC_CIAM_SUBDOMAIN or NEXT_PUBLIC_CIAM_CUSTOM_DOMAIN is required");
  if (!REDIRECT_URI) errors.push("NEXT_PUBLIC_REDIRECT_URI is required");
  if (!POST_LOGOUT_REDIRECT_URI) errors.push("NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI is required");
  if (CUSTOM_DOMAIN && !TENANT_ID) errors.push("NEXT_PUBLIC_TENANT_ID is required when using custom domain");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
