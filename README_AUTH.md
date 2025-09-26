# Authentication Setup Guide

## Overview

This project uses Microsoft Entra External ID (formerly Azure AD B2C) for authentication through MSAL (Microsoft Authentication Library). The implementation supports both popup and redirect flows with automatic fallback.

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Required: Your Azure subdomain (e.g., "khalifafund" for khalifafund.ciamlogin.com)
NEXT_PUBLIC_CIAM_SUBDOMAIN=your-subdomain

# Required: Your Azure Application (client) ID
NEXT_PUBLIC_AAD_CLIENT_ID=your-client-id

# Required: Redirect URI after login (must match Azure app registration)
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback

# Required: Redirect URI after logout
NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000/

# Optional: API scopes (space-separated)
NEXT_PUBLIC_API_SCOPES=https://yourtenant.onmicrosoft.com/api/read

# Optional: Custom domain configuration
# NEXT_PUBLIC_CIAM_CUSTOM_DOMAIN=login.khalifafund.ae
# NEXT_PUBLIC_TENANT_ID=your-tenant-guid
```

## Azure Configuration

1. **Create an App Registration** in Azure Portal
2. **Set Redirect URIs**:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
3. **Configure Authentication**:
   - Enable public client flows
   - Allow implicit grant for ID tokens
4. **Set API Permissions**:
   - OpenID Connect scopes: `openid`, `profile`, `email`

## File Structure

```
src/lib/auth/
├── config.ts                 # MSAL configuration
├── session.ts               # Session management utilities
├── providers/
│   └── msal-provider.tsx    # MSAL provider wrapper
├── hooks/
│   ├── useAuth.ts          # Main authentication hook
│   └── useRequireAuth.ts   # Protected route hook
└── components/
    └── ProtectedRoute.tsx  # Protected route component
```

## Usage Examples

### 1. Using the Authentication Hook

```tsx
import { useAuth } from "@/lib/auth/hooks/useAuth";

function MyComponent() {
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={signIn}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### 2. Protecting Routes

```tsx
import { ProtectedRoute } from "@/lib/auth/components/ProtectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Protected Dashboard Content</h1>
    </ProtectedRoute>
  );
}
```

### 3. Using the Require Auth Hook

```tsx
import { useRequireAuth } from "@/lib/auth/hooks/useRequireAuth";

function ProfilePage() {
  const { isAuthenticated, isLoading } = useRequireAuth("/login");

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; // Will redirect

  return <div>Profile content</div>;
}
```

## Authentication Flow

1. **Sign In**: User clicks sign-in button
2. **Popup/Redirect**: Attempts popup flow, falls back to redirect
3. **Callback**: User is redirected to `/auth/callback`
4. **Token Exchange**: Authorization code is exchanged for tokens
5. **Session Storage**: JWT is decoded and stored in localStorage
6. **Redirect**: User is redirected to dashboard

## Security Features

- ✅ JWT token validation and expiration checking
- ✅ Automatic session cleanup on logout
- ✅ Protected routes with automatic redirects
- ✅ MSAL token caching and refresh
- ✅ Popup fallback to redirect for compatibility
- ✅ Environment variable validation

## Development

To test authentication locally:

1. Set up your Azure app registration
2. Configure environment variables
3. Run `npm run dev`
4. Click "Sign In" or "Get Started" in the navbar
5. Complete authentication in Azure
6. You'll be redirected to the dashboard

## Troubleshooting

### Common Issues

1. **"MSAL Configuration Error"**: Check your environment variables
2. **"Popup blocked"**: The system will automatically fallback to redirect
3. **"Invalid redirect URI"**: Ensure your Azure app registration matches your URLs
4. **"Token exchange failed"**: Check your client ID and authority URL

### Debug Mode

Add logging to see MSAL events:

```tsx
// In your component
useEffect(() => {
  const { instance } = useMsal();
  const callbackId = instance.addEventCallback((event) => {
    console.log("MSAL Event:", event);
  });
  return () => instance.removeEventCallback(callbackId);
}, []);
```

## Production Deployment

1. Update environment variables for production URLs
2. Update Azure app registration redirect URIs
3. Ensure HTTPS is used for all redirect URIs
4. Test the complete authentication flow
