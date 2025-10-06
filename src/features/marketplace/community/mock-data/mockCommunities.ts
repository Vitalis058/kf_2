import { Community } from "../types";

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "UAE Tech Innovators",
    slug: "uae-tech-innovators",
    description:
      "A vibrant community of technology entrepreneurs, developers, and innovators sharing insights on emerging technologies, startup strategies, and digital transformation in the UAE.",
    category: "Technology",
    tags: ["AI", "Blockchain", "IoT", "Startups", "Innovation"],
    memberCount: 1247,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-02-20T14:30:00Z"),
    isActive: true,
    imageUrl: "/images/communities/tech-innovators.jpg",
    isPublic: true,
    createdBy: "admin",
    isVerified: true,
  },
  {
    id: "2",
    name: "SME Finance Network",
    slug: "sme-finance-network",
    description:
      "Connect with financial experts, share funding experiences, and discover financing opportunities tailored for small and medium enterprises in the UAE market.",
    category: "Finance",
    tags: ["Funding", "Investment", "Banking", "Financial Planning", "SME"],
    memberCount: 892,
    createdAt: new Date("2024-01-10T09:15:00Z"),
    updatedAt: new Date("2024-02-18T16:45:00Z"),
    isActive: true,
    imageUrl: "/images/communities/finance-network.jpg",
    isPublic: true,
    createdBy: "admin",
    isVerified: true,
  },
  {
    id: "3",
    name: "Digital Marketing Masters",
    slug: "digital-marketing-masters",
    description:
      "Learn from marketing professionals, share campaign strategies, and stay updated with the latest digital marketing trends and tools for business growth.",
    category: "Marketing",
    tags: ["Digital Marketing", "Social Media", "SEO", "Content", "Analytics"],
    memberCount: 1563,
    createdAt: new Date("2024-01-20T11:30:00Z"),
    updatedAt: new Date("2024-02-22T10:15:00Z"),
    isActive: true,
    imageUrl: "/images/communities/marketing-masters.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "4",
    name: "Operations Excellence Hub",
    slug: "operations-excellence-hub",
    description:
      "Optimize your business operations through shared experiences, best practices, and innovative solutions from operations managers and efficiency experts.",
    category: "Operations",
    tags: [
      "Process Improvement",
      "Efficiency",
      "Automation",
      "Quality",
      "Lean",
    ],
    memberCount: 734,
    createdAt: new Date("2024-01-25T14:20:00Z"),
    updatedAt: new Date("2024-02-19T13:40:00Z"),
    isActive: true,
    imageUrl: "/images/communities/operations-hub.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "5",
    name: "Legal & Compliance Circle",
    slug: "legal-compliance-circle",
    description:
      "Navigate UAE business regulations, share legal insights, and connect with legal professionals specializing in corporate law and compliance matters.",
    category: "Legal",
    tags: ["Corporate Law", "Compliance", "Regulations", "Contracts", "IP"],
    memberCount: 456,
    createdAt: new Date("2024-01-12T08:45:00Z"),
    updatedAt: new Date("2024-02-21T15:20:00Z"),
    isActive: true,
    imageUrl: "/images/communities/legal-circle.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "6",
    name: "HR & Talent Development",
    slug: "hr-talent-development",
    description:
      "Build stronger teams through shared HR strategies, talent acquisition insights, and employee development programs tailored for the UAE workforce.",
    category: "HR",
    tags: [
      "Recruitment",
      "Training",
      "Employee Engagement",
      "Culture",
      "Benefits",
    ],
    memberCount: 678,
    createdAt: new Date("2024-01-18T12:10:00Z"),
    updatedAt: new Date("2024-02-17T11:55:00Z"),
    isActive: true,
    imageUrl: "/images/communities/hr-talent.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "7",
    name: "Startup Founders Collective",
    slug: "startup-founders-collective",
    description:
      "A supportive community for startup founders to share challenges, celebrate wins, and learn from each other's entrepreneurial journeys in the UAE ecosystem.",
    category: "General",
    tags: ["Entrepreneurship", "Networking", "Mentorship", "Funding", "Growth"],
    memberCount: 2134,
    createdAt: new Date("2024-01-08T16:30:00Z"),
    updatedAt: new Date("2024-02-23T09:25:00Z"),
    isActive: true,
    imageUrl: "/images/communities/startup-founders.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "8",
    name: "E-commerce Entrepreneurs",
    slug: "ecommerce-entrepreneurs",
    description:
      "Connect with online business owners, share e-commerce strategies, and discover tools and platforms that drive online sales and customer engagement.",
    category: "Technology",
    tags: [
      "E-commerce",
      "Online Sales",
      "Customer Experience",
      "Platforms",
      "Analytics",
    ],
    memberCount: 987,
    createdAt: new Date("2024-01-22T13:45:00Z"),
    updatedAt: new Date("2024-02-20T12:30:00Z"),
    isActive: true,
    imageUrl: "/images/communities/ecommerce-entrepreneurs.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "9",
    name: "Sustainable Business Network",
    slug: "sustainable-business-network",
    description:
      "Promote sustainable business practices, share green initiatives, and connect with environmentally conscious entrepreneurs building a better future.",
    category: "General",
    tags: [
      "Sustainability",
      "Green Business",
      "ESG",
      "Environment",
      "Social Impact",
    ],
    memberCount: 543,
    createdAt: new Date("2024-01-14T10:20:00Z"),
    updatedAt: new Date("2024-02-16T14:10:00Z"),
    isActive: true,
    imageUrl: "/images/communities/sustainable-business.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "10",
    name: "Manufacturing Excellence",
    slug: "manufacturing-excellence",
    description:
      "Share manufacturing insights, discuss industry 4.0 technologies, and connect with production managers and engineers driving operational excellence.",
    category: "Operations",
    tags: [
      "Manufacturing",
      "Industry 4.0",
      "Quality Control",
      "Supply Chain",
      "Automation",
    ],
    memberCount: 612,
    createdAt: new Date("2024-01-16T15:15:00Z"),
    updatedAt: new Date("2024-02-18T08:50:00Z"),
    isActive: true,
    imageUrl: "/images/communities/manufacturing-excellence.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "11",
    name: "FinTech Innovators UAE",
    slug: "fintech-innovators-uae",
    description:
      "Explore the intersection of finance and technology, share FinTech solutions, and connect with professionals revolutionizing financial services.",
    category: "Finance",
    tags: ["FinTech", "Digital Banking", "Payments", "Blockchain", "RegTech"],
    memberCount: 789,
    createdAt: new Date("2024-01-28T11:40:00Z"),
    updatedAt: new Date("2024-02-22T16:20:00Z"),
    isActive: true,
    imageUrl: "/images/communities/fintech-innovators.jpg",
    isPublic: true,
    createdBy: "admin",
  },
  {
    id: "12",
    name: "Women in Business UAE",
    slug: "women-in-business-uae",
    description:
      "Empower women entrepreneurs and professionals through networking, mentorship, and sharing success stories in the UAE business landscape.",
    category: "General",
    tags: [
      "Women Entrepreneurs",
      "Leadership",
      "Networking",
      "Mentorship",
      "Empowerment",
    ],
    memberCount: 1456,
    createdAt: new Date("2024-01-05T09:30:00Z"),
    updatedAt: new Date("2024-02-21T13:15:00Z"),
    isActive: true,
    imageUrl: "/images/communities/women-in-business.jpg",
    isPublic: true,
    createdBy: "admin",
  },
];

// Helper function to get communities by category
export const getCommunitiesByCategory = (category: string): Community[] => {
  if (category === "all") return mockCommunities;
  return mockCommunities.filter((community) => community.category === category);
};

// Helper function to search communities
export const searchCommunities = (query: string): Community[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(lowercaseQuery) ||
      community.description.toLowerCase().includes(lowercaseQuery) ||
      community.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Helper function to get popular communities (by member count)
export const getPopularCommunities = (limit: number = 5): Community[] => {
  return [...mockCommunities]
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, limit);
};

// Helper function to get recent communities
export const getRecentCommunities = (limit: number = 5): Community[] => {
  return [...mockCommunities]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};
