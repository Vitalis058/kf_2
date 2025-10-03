// Media API

import { MediaContent } from "../types";

// Mock data - replace with actual API calls
const mockMediaContent: MediaContent[] = [
  // Add mock data here when needed
];

export const MediaAPI = {
  async getContent() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      content: {
        items: mockMediaContent,
        totalItems: mockMediaContent.length,
      },
    };
  },

  async getContentById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return mockMediaContent.find((content) => content.id === id);
  },
};

export const getMockMediaContent = async () => {
  return {
    content: {
      items: mockMediaContent,
      totalItems: mockMediaContent.length,
    },
  };
};
