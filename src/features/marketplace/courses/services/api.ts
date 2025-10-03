// Courses API

import { Course } from "../types";

// Mock data - replace with actual API calls
const mockCourses: Course[] = [
  // Add mock data here when needed
];

export const CoursesAPI = {
  async getCourses() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      courses: {
        items: mockCourses,
        totalItems: mockCourses.length,
      },
    };
  },

  async getCourseById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return mockCourses.find((course) => course.id === id);
  },
};

export const getMockCourses = async () => {
  return {
    courses: {
      items: mockCourses,
      totalItems: mockCourses.length,
    },
  };
};
