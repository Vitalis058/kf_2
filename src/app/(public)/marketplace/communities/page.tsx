import { Metadata } from "next";
import { CommunityMarketplace } from "@/features/marketplace/community";

export const metadata: Metadata = {
  title: "Community Marketplace | Khalifa Fund",
  description:
    "Discover and request communities for knowledge sharing and collaboration among SMEs and vendors in the UAE.",
  keywords: [
    "community",
    "marketplace",
    "knowledge sharing",
    "collaboration",
    "SME",
    "vendors",
    "UAE",
    "networking",
    "business community",
  ],
  openGraph: {
    title: "Community Marketplace | Khalifa Fund",
    description:
      "Join vibrant communities of entrepreneurs, professionals, and business experts. Share knowledge, collaborate, and grow together.",
    type: "website",
  },
};

export default function CommunityMarketplacePage() {
  return <CommunityMarketplace />;
}
