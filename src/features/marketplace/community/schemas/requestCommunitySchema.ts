import { z } from "zod";
import { COMMUNITY_CATEGORIES, CommunityCategory } from "../types";

// Extract the category values for validation with proper typing
const categoryValues = COMMUNITY_CATEGORIES.map((cat) => cat.value) as [
  CommunityCategory,
  ...CommunityCategory[]
];

// Community request validation schema
export const requestCommunitySchema = z.object({
  name: z
    .string()
    .min(1, "Community name is required")
    .min(3, "Community name must be at least 3 characters")
    .max(100, "Community name must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9\s\-&().,!]+$/,
      "Community name can only contain letters, numbers, spaces, and basic punctuation"
    ),

  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters")
    .refine(
      (val) => val.trim().length >= 20,
      "Description must contain at least 20 meaningful characters"
    ),

  category: z
    .enum(categoryValues, {
      message: "Please select a valid category",
    })
    .refine(
      (val) => COMMUNITY_CATEGORIES.some((cat) => cat.value === val),
      "Selected category is not valid"
    ),
});

// Type inference from schema
export type RequestCommunityFormData = z.infer<typeof requestCommunitySchema>;

// Validation helper function
export function validateCommunityRequest(data: unknown) {
  try {
    const result = requestCommunitySchema.parse(data);
    return { success: true as const, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return { success: false as const, errors };
    }
    return {
      success: false as const,
      errors: [{ field: "unknown", message: "Validation failed" }],
    };
  }
}

// Individual field validation helpers for real-time validation
export const validateCommunityName = (name: string) => {
  try {
    requestCommunitySchema.shape.name.parse(name);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0]?.message || "Invalid name",
      };
    }
    return { isValid: false, error: "Invalid name" };
  }
};

export const validateCommunityDescription = (description: string) => {
  try {
    requestCommunitySchema.shape.description.parse(description);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0]?.message || "Invalid description",
      };
    }
    return { isValid: false, error: "Invalid description" };
  }
};

export const validateCommunityCategory = (category: string) => {
  try {
    requestCommunitySchema.shape.category.parse(category);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0]?.message || "Invalid category",
      };
    }
    return { isValid: false, error: "Invalid category" };
  }
};

// Form field constraints for UI components
export const FORM_CONSTRAINTS = {
  name: {
    minLength: 3,
    maxLength: 100,
    placeholder: "Enter community name (e.g., 'UAE Tech Innovators')",
  },
  description: {
    minLength: 20,
    maxLength: 500,
    placeholder: "Describe the purpose and goals of your community...",
  },
  category: {
    placeholder: "Select a category",
  },
} as const;
