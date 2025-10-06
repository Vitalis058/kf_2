import { Discussion, PostType } from "../types/communityDetails";
import { mockMembers } from "./mockMembers";

export const mockDiscussions: Discussion[] = [
  {
    id: "disc_1",
    title: "Welcome to UAE Tech Innovators! 🚀",
    content:
      "Welcome everyone to our growing community of tech innovators in the UAE! This is a space where we can share ideas, collaborate on projects, and support each other's entrepreneurial journeys. Feel free to introduce yourself and let us know what you're working on!",
    excerpt:
      "Welcome everyone to our growing community of tech innovators in the UAE! This is a space where we can share ideas...",
    author: mockMembers[0], // Admin user
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
    replyCount: 23,
    likeCount: 45,
    viewCount: 156,
    type: "announcement" as PostType,
    tags: ["welcome", "introduction", "community"],
    isPinned: true,
    isLocked: false,
    communityId: "1",
  },
  {
    id: "disc_2",
    title: "AI Startup Funding Opportunities in UAE 2024",
    content:
      "I've been researching the latest AI startup funding opportunities available in the UAE for 2024. Here's what I've found so far:\n\n1. Mohammed bin Rashid Innovation Fund\n2. Abu Dhabi Investment Office (ADIO) grants\n3. Dubai Future Accelerators\n\nHas anyone here applied to these programs? Would love to hear about your experiences!",
    excerpt:
      "I've been researching the latest AI startup funding opportunities available in the UAE for 2024...",
    author: mockMembers[1],
    createdAt: new Date("2024-02-10T14:30:00Z"),
    updatedAt: new Date("2024-02-12T09:15:00Z"),
    replyCount: 12,
    likeCount: 28,
    viewCount: 89,
    type: "text" as PostType,
    tags: ["AI", "funding", "startups", "UAE", "2024"],
    isPinned: false,
    isLocked: false,
    communityId: "1",
  },
  {
    id: "disc_3",
    title: "Best Co-working Spaces for Tech Startups in Dubai",
    content:
      "Looking for recommendations on the best co-working spaces in Dubai for tech startups. I need somewhere with good internet, meeting rooms, and a vibrant community. Budget is around AED 2000/month. Any suggestions?",
    excerpt:
      "Looking for recommendations on the best co-working spaces in Dubai for tech startups...",
    author: mockMembers[2],
    createdAt: new Date("2024-02-08T16:45:00Z"),
    updatedAt: new Date("2024-02-08T16:45:00Z"),
    replyCount: 8,
    likeCount: 15,
    viewCount: 67,
    type: "text" as PostType,
    tags: ["coworking", "Dubai", "startups", "workspace"],
    isPinned: false,
    isLocked: false,
    communityId: "1",
  },
  {
    id: "disc_4",
    title: "Blockchain Development Meetup - February 25th",
    content:
      "Join us for our monthly blockchain development meetup on February 25th at 7 PM at Hub71 in Abu Dhabi. We'll be discussing the latest trends in DeFi and Web3 development. RSVP required!",
    excerpt:
      "Join us for our monthly blockchain development meetup on February 25th at 7 PM...",
    author: mockMembers[3],
    createdAt: new Date("2024-02-05T12:20:00Z"),
    updatedAt: new Date("2024-02-05T12:20:00Z"),
    replyCount: 18,
    likeCount: 32,
    viewCount: 124,
    type: "event" as PostType,
    tags: ["blockchain", "meetup", "DeFi", "Web3", "Abu Dhabi"],
    isPinned: false,
    isLocked: false,
    communityId: "1",
  },
  {
    id: "disc_5",
    title: "SME Financing Options: Traditional vs Islamic Banking",
    content:
      "As SMEs in the UAE, we have unique financing options including both conventional and Islamic banking products. I've compiled a comparison of the key differences and benefits of each approach. What has been your experience?",
    excerpt:
      "As SMEs in the UAE, we have unique financing options including both conventional and Islamic banking...",
    author: mockMembers[4],
    createdAt: new Date("2024-02-12T11:10:00Z"),
    updatedAt: new Date("2024-02-12T11:10:00Z"),
    replyCount: 15,
    likeCount: 22,
    viewCount: 78,
    type: "text" as PostType,
    tags: ["financing", "Islamic banking", "SME", "UAE"],
    isPinned: false,
    isLocked: false,
    communityId: "2", // SME Finance Network
  },
  {
    id: "disc_6",
    title: "Digital Marketing Trends for 2024: What's Working?",
    content:
      "The digital marketing landscape is constantly evolving. What strategies are working for your business in 2024? I'm particularly interested in:\n\n- Social media advertising ROI\n- Content marketing effectiveness\n- Email marketing automation\n- Influencer partnerships\n\nLet's share our wins and learnings!",
    excerpt:
      "The digital marketing landscape is constantly evolving. What strategies are working for your business in 2024?",
    author: mockMembers[5],
    createdAt: new Date("2024-02-14T09:30:00Z"),
    updatedAt: new Date("2024-02-14T09:30:00Z"),
    replyCount: 21,
    likeCount: 38,
    viewCount: 145,
    type: "text" as PostType,
    tags: ["digital marketing", "2024", "social media", "ROI", "trends"],
    isPinned: false,
    isLocked: false,
    communityId: "3", // Digital Marketing Masters
  },
];

// Helper function to get discussions by community ID
export const getDiscussionsByCommunityId = (
  communityId: string
): Discussion[] => {
  return mockDiscussions.filter(
    (discussion) => discussion.communityId === communityId
  );
};

// Helper function to get recent discussions (last 30 days)
export const getRecentDiscussions = (
  communityId: string,
  limit: number = 5
): Discussion[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return mockDiscussions
    .filter(
      (discussion) =>
        discussion.communityId === communityId &&
        discussion.createdAt >= thirtyDaysAgo
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

// Helper function to get popular discussions (by engagement)
export const getPopularDiscussions = (
  communityId: string,
  limit: number = 5
): Discussion[] => {
  return mockDiscussions
    .filter((discussion) => discussion.communityId === communityId)
    .sort((a, b) => {
      const aEngagement = a.likeCount + a.replyCount + a.viewCount * 0.1;
      const bEngagement = b.likeCount + b.replyCount + b.viewCount * 0.1;
      return bEngagement - aEngagement;
    })
    .slice(0, limit);
};

// Helper function to get pinned discussions
export const getPinnedDiscussions = (communityId: string): Discussion[] => {
  return mockDiscussions
    .filter(
      (discussion) =>
        discussion.communityId === communityId && discussion.isPinned
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
