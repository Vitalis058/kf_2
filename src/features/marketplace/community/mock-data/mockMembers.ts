import { CommunityMember, MemberRole } from "../types/communityDetails";

export const mockMembers: CommunityMember[] = [
  {
    id: "member_1",
    name: "Ahmed Al-Rashid",
    username: "ahmed_alrashid",
    avatar: "/avatars/ahmed.jpg",
    role: "owner" as MemberRole,
    joinedAt: new Date("2024-01-15T10:00:00Z"),
    postCount: 15,
    replyCount: 47,
    reputation: 950,
    isOnline: true,
    lastSeenAt: new Date(),
    bio: "Tech entrepreneur and founder of multiple startups in the UAE. Passionate about AI and blockchain technology.",
  },
  {
    id: "member_2",
    name: "Sarah Johnson",
    username: "sarah_j",
    avatar: "/avatars/sarah.jpg",
    role: "admin" as MemberRole,
    joinedAt: new Date("2024-01-16T14:30:00Z"),
    postCount: 23,
    replyCount: 89,
    reputation: 1200,
    isOnline: false,
    lastSeenAt: new Date("2024-02-20T18:45:00Z"),
    bio: "AI researcher and startup advisor. Former Google engineer now building the future of tech in Dubai.",
  },
  {
    id: "member_3",
    name: "Mohammed Hassan",
    username: "mo_hassan",
    avatar: "/avatars/mohammed.jpg",
    role: "moderator" as MemberRole,
    joinedAt: new Date("2024-01-18T09:15:00Z"),
    postCount: 12,
    replyCount: 34,
    reputation: 680,
    isOnline: true,
    lastSeenAt: new Date(),
    bio: "Full-stack developer and tech community organizer. Love connecting innovators across the UAE.",
  },
  {
    id: "member_4",
    name: "Fatima Al-Zahra",
    username: "fatima_az",
    avatar: "/avatars/fatima.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-01-20T11:45:00Z"),
    postCount: 8,
    replyCount: 25,
    reputation: 420,
    isOnline: false,
    lastSeenAt: new Date("2024-02-19T16:20:00Z"),
    bio: "Blockchain developer and DeFi enthusiast. Building the next generation of financial applications.",
  },
  {
    id: "member_5",
    name: "David Chen",
    username: "david_chen",
    avatar: "/avatars/david.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-01-22T16:30:00Z"),
    postCount: 18,
    replyCount: 52,
    reputation: 780,
    isOnline: true,
    lastSeenAt: new Date(),
    bio: "Fintech entrepreneur with 10+ years experience in banking and financial services.",
  },
  {
    id: "member_6",
    name: "Layla Mahmoud",
    username: "layla_m",
    avatar: "/avatars/layla.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-01-25T13:20:00Z"),
    postCount: 14,
    replyCount: 38,
    reputation: 590,
    isOnline: false,
    lastSeenAt: new Date("2024-02-20T10:15:00Z"),
    bio: "Digital marketing strategist helping startups grow their online presence and reach new customers.",
  },
  {
    id: "member_7",
    name: "Omar Khalil",
    username: "omar_k",
    avatar: "/avatars/omar.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-01-28T08:45:00Z"),
    postCount: 6,
    replyCount: 19,
    reputation: 280,
    isOnline: true,
    lastSeenAt: new Date(),
    bio: "Operations manager focused on process optimization and lean methodologies for growing businesses.",
  },
  {
    id: "member_8",
    name: "Aisha Rahman",
    username: "aisha_r",
    avatar: "/avatars/aisha.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-02-01T12:10:00Z"),
    postCount: 9,
    replyCount: 27,
    reputation: 380,
    isOnline: false,
    lastSeenAt: new Date("2024-02-19T14:30:00Z"),
    bio: "Legal advisor specializing in corporate law and startup legal frameworks in the UAE.",
  },
  {
    id: "member_9",
    name: "James Wilson",
    username: "james_w",
    avatar: "/avatars/james.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-02-03T15:25:00Z"),
    postCount: 11,
    replyCount: 31,
    reputation: 450,
    isOnline: true,
    lastSeenAt: new Date(),
    bio: "HR consultant helping startups build strong teams and positive company cultures.",
  },
  {
    id: "member_10",
    name: "Noor Al-Mansouri",
    username: "noor_am",
    avatar: "/avatars/noor.jpg",
    role: "member" as MemberRole,
    joinedAt: new Date("2024-02-05T10:40:00Z"),
    postCount: 7,
    replyCount: 22,
    reputation: 320,
    isOnline: false,
    lastSeenAt: new Date("2024-02-20T09:20:00Z"),
    bio: "Sustainability consultant working with businesses to implement eco-friendly practices and ESG frameworks.",
  },
];

// Helper function to get members by community ID (simulated)
export const getMembersByCommunityId = (
  communityId: string
): CommunityMember[] => {
  // In a real implementation, this would filter by actual community membership
  // For mock data, we'll return different subsets based on community ID
  switch (communityId) {
    case "1": // UAE Tech Innovators
      return mockMembers.slice(0, 8);
    case "2": // SME Finance Network
      return [mockMembers[4], mockMembers[0], mockMembers[2], mockMembers[6]];
    case "3": // Digital Marketing Masters
      return [mockMembers[5], mockMembers[1], mockMembers[3], mockMembers[8]];
    case "4": // Operations Excellence Hub
      return [mockMembers[6], mockMembers[2], mockMembers[9], mockMembers[0]];
    case "5": // Legal & Compliance Circle
      return [mockMembers[7], mockMembers[1], mockMembers[4]];
    case "6": // HR & Talent Development
      return [mockMembers[8], mockMembers[5], mockMembers[2], mockMembers[9]];
    default:
      return mockMembers.slice(0, 5);
  }
};

// Helper function to get top members by reputation
export const getTopMembers = (
  communityId: string,
  limit: number = 5
): CommunityMember[] => {
  return getMembersByCommunityId(communityId)
    .sort((a, b) => b.reputation - a.reputation)
    .slice(0, limit);
};

// Helper function to get online members
export const getOnlineMembers = (communityId: string): CommunityMember[] => {
  return getMembersByCommunityId(communityId).filter(
    (member) => member.isOnline
  );
};

// Helper function to get recent members (joined in last 30 days)
export const getRecentMembers = (
  communityId: string,
  limit: number = 5
): CommunityMember[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return getMembersByCommunityId(communityId)
    .filter((member) => member.joinedAt >= thirtyDaysAgo)
    .sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime())
    .slice(0, limit);
};
