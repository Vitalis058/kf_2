import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format");

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Firm profile schemas
export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export const contactInfoSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
  mobile: phoneSchema.optional(),
  fax: phoneSchema.optional(),
});

export const firmProfileSchema = z.object({
  tradeName: z.string().min(1, "Trade name is required"),
  legalName: z.string().min(1, "Legal name is required"),
  tradeNumber: z.string().min(1, "Trade number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  businessType: z.enum([
    "SOLE_PROPRIETORSHIP",
    "PARTNERSHIP", 
    "LLC",
    "CORPORATION",
    "NON_PROFIT"
  ]),
  industry: z.enum([
    "TECHNOLOGY",
    "HEALTHCARE",
    "EDUCATION",
    "FINANCE",
    "RETAIL",
    "MANUFACTURING",
    "SERVICES",
    "AGRICULTURE",
    "TOURISM",
    "OTHER"
  ]),
  establishmentDate: z.string().min(1, "Establishment date is required"),
  address: addressSchema,
  contactInfo: contactInfoSchema,
  numberOfEmployees: z.number().min(1, "Number of employees must be at least 1"),
  annualRevenue: z.number().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  description: z.string().optional(),
});

// File upload validation
export const fileUploadSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.string().min(1, "File type is required"),
});

// Utility functions
export type ValidationError = {
  field: string;
  message: string;
};

export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return { success: false, errors };
    }
    return {
      success: false,
      errors: [{ field: "unknown", message: "Validation failed" }],
    };
  }
}
