# Khalifa Fund Project Structure

This document outlines the comprehensive folder structure for the Khalifa Fund application, organized using feature-based architecture with Next.js App Router.

## 📁 Directory Structure

### `/src/app/` - Next.js App Router
- **`api/`** - REST API endpoints
  - `auth/` - Authentication endpoints
  - `webhooks/` - Webhook handlers
  - `health/` - Health check endpoint ✅
- **`(auth)/`** - Authentication routes (route group)
  - `login/` - Login page ✅
  - `register/` - Registration page ✅
  - `layout.tsx` - Auth-specific layout ✅
- **`(public)/`** - Public marketing pages (route group)
  - `page.tsx` - Landing page ✅
  - `services/` - Services information
  - `about/` - About page
  - `layout.tsx` - Public layout ✅
- **`(marketplace)/`** - Marketplace features (route group)
  - `financial-services/` - Financial service listings
  - `non-financial-services/` - Non-financial service listings
  - `layout.tsx` - Marketplace layout ✅
- **`(dashboard)/`** - Protected dashboard (route group)
  - `overview/` - Dashboard overview ✅
  - `firm-profile/` - Company profile management
  - `reporting-obligations/` - Compliance reporting
  - `documents/` - Document management
  - `applications/` - Application tracking
  - `user-management/` - User administration
  - `settings/` - Account settings
  - `layout.tsx` - Dashboard layout with sidebar ✅
- **`layout.tsx`** - Root layout ✅
- **`page.tsx`** - Root page (redirects to public) ✅

### `/src/components/` - Reusable UI Components
- **`ui/`** - Pure UI components (shadcn/ui) ✅
  - Complete set of shadcn/ui components
  - `index.ts` - Centralized exports ✅
- **`layout/`** - Layout-specific components
  - `navbar/` - Navigation components
  - `sidebar/` - Sidebar components
  - `footer/` - Footer components
- **`shared/`** - Shared business components
  - `data-table/` - Reusable data table ✅
  - `file-upload/` - File upload components
  - `status-badge/` - Status indicator components

### `/src/features/` - Feature-based Organization
- **`authentication/`** ✅
  - `components/` - Auth-specific components
  - `hooks/` - Authentication hooks
  - `services/` - Auth API services
  - `graphql/` - Auth GraphQL operations ✅
  - `types.ts` - Authentication types ✅
- **`reporting-obligations/`** ✅
  - `components/` - Obligation components ✅
  - `hooks/` - Custom hooks for obligations
  - `services/` - API services
  - `graphql/` - GraphQL operations
  - `types.ts` - Type definitions ✅
- **`marketplace/`**
  - `components/` - Marketplace components
  - `hooks/` - Marketplace hooks
  - `services/` - Marketplace services
  - `graphql/` - Marketplace GraphQL
  - `types.ts` - Marketplace types
- **`firm-profile/`**
  - `components/` - Profile components
  - `hooks/` - Profile hooks
  - `services/` - Profile services
  - `graphql/` - Profile GraphQL
  - `types.ts` - Profile types
- **`documents/`**
  - `components/` - Document components
  - `hooks/` - Document hooks
  - `services/` - Document services
  - `graphql/` - Document GraphQL
  - `types.ts` - Document types

### `/src/lib/` - Shared Utilities
- **`graphql/`** - GraphQL configuration ✅
  - `client.ts` - Apollo Client setup ✅
  - `codegen.ts` - GraphQL Code Generator
  - `error-handler.ts` - Error handling
  - `cache.ts` - Apollo Cache config
  - `links/` - Apollo Links
    - `auth-link.ts` - Authentication link
    - `error-link.ts` - Error handling link
    - `retry-link.ts` - Retry logic link
- **`auth/`** - Authentication utilities
  - `config.ts` - Auth configuration
  - `providers.tsx` - Auth providers
  - `middleware.ts` - Auth middleware
- **`utils/`** - Utility functions ✅
  - `index.ts` - Re-exported from original utils ✅
  - `validation.ts` - Form validation schemas ✅
  - `format.ts` - Formatting utilities
  - `constants.ts` - Application constants ✅
- **`types/`** - Global types ✅
  - `api.ts` - API response types
  - `auth.ts` - Authentication types
  - `common.ts` - Common shared types ✅

### `/src/store/` - State Management
- **`app-store.ts`** - Global application state ✅
- **`auth-store.ts`** - Authentication state
- **`obligations-store.ts`** - Obligations state

### `/src/graphql/` - GraphQL Schema & Operations
- **`schema.graphql`** - GraphQL schema definition ✅
- **`operations/`** - Shared GraphQL operations
  - `queries/` - Shared queries
  - `mutations/` - Shared mutations
  - `subscriptions/` - Shared subscriptions
- **`generated/`** - Auto-generated types
  - `types.ts` - Generated TypeScript types
  - `hooks.ts` - Generated React hooks

### `/src/hooks/` - Global Custom Hooks
- **`use-mobile.ts`** - Mobile detection hook ✅

## 🏗️ Architecture Principles

### 1. Feature-Based Organization
- Each major feature has its own directory with components, hooks, services, and types
- Promotes modularity and maintainability
- Clear boundaries between different parts of the application

### 2. Next.js App Router with Route Groups
- `(auth)`, `(public)`, `(marketplace)`, `(dashboard)` for logical grouping
- Each group can have its own layout
- Clean URL structure without affecting routes

### 3. Separation of Concerns
- **Components**: Pure UI components and feature-specific components
- **Hooks**: Reusable logic and state management
- **Services**: API calls and external integrations
- **Types**: TypeScript definitions for type safety
- **Store**: Global state management with Zustand

### 4. GraphQL Integration
- Apollo Client for GraphQL operations
- Feature-specific GraphQL operations
- Centralized schema definition
- Code generation for type safety

### 5. Scalable Component Architecture
- shadcn/ui for base components
- Shared components for common business logic
- Feature-specific components within feature directories

## 🔧 Key Technologies

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Apollo Client** for GraphQL
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Tanstack Table** for data tables

## 📝 Development Guidelines

1. **File Naming**: Use kebab-case for files and folders
2. **Component Organization**: Keep components close to where they're used
3. **Type Safety**: Define types for all data structures
4. **Error Handling**: Implement proper error boundaries and handling
5. **Performance**: Use React.memo, useMemo, and useCallback where appropriate
6. **Accessibility**: Follow WCAG guidelines for all components

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run development server: `npm run dev`
4. Generate GraphQL types: `npm run codegen`
5. Run linting: `npm run lint`
6. Build for production: `npm run build`

This structure provides a solid foundation for a scalable, maintainable enterprise application while following modern React and Next.js best practices.
