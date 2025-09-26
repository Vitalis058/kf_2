// Application Constants

// API Configuration
export const API_ENDPOINTS = {
  GRAPHQL: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/api/graphql',
  UPLOAD: '/api/upload',
  HEALTH: '/api/health',
} as const;

// Authentication Constants
export const AUTH_CONFIG = {
  TOKEN_KEY: 'accessToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes in milliseconds
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
} as const;

// Business Rules
export const BUSINESS_RULES = {
  MIN_EMPLOYEES: 1,
  MAX_EMPLOYEES: 10000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'text/plain',
  ],
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
} as const;

// UI Constants
export const UI_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEBOUNCE_DELAY: 300, // milliseconds
  NOTIFICATION_DURATION: 5000, // milliseconds
  SIDEBAR_WIDTH: 256, // pixels
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  UAE_PHONE_REGEX: /^(\+971|0)[0-9]{8,9}$/,
  TRADE_LICENSE_REGEX: /^[A-Z]{2}[0-9]{6}$/,
} as const;

// Status Options
export const STATUS_OPTIONS = {
  OBLIGATION_STATUS: [
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'OVERDUE', label: 'Overdue' },
  ],
  OBLIGATION_PRIORITY: [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
    { value: 'URGENT', label: 'Urgent' },
  ],
  APPLICATION_STATUS: [
    { value: 'DRAFT', label: 'Draft' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'UNDER_REVIEW', label: 'Under Review' },
    { value: 'ADDITIONAL_INFO_REQUIRED', label: 'Additional Info Required' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'WITHDRAWN', label: 'Withdrawn' },
  ],
} as const;

// Business Types and Industries
export const BUSINESS_OPTIONS = {
  BUSINESS_TYPES: [
    { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
    { value: 'PARTNERSHIP', label: 'Partnership' },
    { value: 'LLC', label: 'Limited Liability Company (LLC)' },
    { value: 'CORPORATION', label: 'Corporation' },
    { value: 'NON_PROFIT', label: 'Non-Profit Organization' },
  ],
  INDUSTRIES: [
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'HEALTHCARE', label: 'Healthcare' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'FINANCE', label: 'Finance' },
    { value: 'RETAIL', label: 'Retail' },
    { value: 'MANUFACTURING', label: 'Manufacturing' },
    { value: 'SERVICES', label: 'Services' },
    { value: 'AGRICULTURE', label: 'Agriculture' },
    { value: 'TOURISM', label: 'Tourism' },
    { value: 'OTHER', label: 'Other' },
  ],
} as const;

// UAE Specific Constants
export const UAE_CONFIG = {
  EMIRATES: [
    { value: 'ABU_DHABI', label: 'Abu Dhabi' },
    { value: 'DUBAI', label: 'Dubai' },
    { value: 'SHARJAH', label: 'Sharjah' },
    { value: 'AJMAN', label: 'Ajman' },
    { value: 'UMM_AL_QUWAIN', label: 'Umm Al Quwain' },
    { value: 'RAS_AL_KHAIMAH', label: 'Ras Al Khaimah' },
    { value: 'FUJAIRAH', label: 'Fujairah' },
  ],
  COUNTRY_CODE: '+971',
  CURRENCY: 'AED',
  TIMEZONE: 'Asia/Dubai',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access to this resource is forbidden.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported file format.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
  DOCUMENT_UPLOADED: 'Document uploaded successfully!',
  OBLIGATION_UPDATED: 'Obligation status updated successfully!',
} as const;
