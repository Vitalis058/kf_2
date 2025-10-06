import { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockCommunities } from "@/features/marketplace/community/mock-data/mockCommunities";
import { CommunityDetailsPage } from "@/features/marketplace/community/components/community-details/CommunityDetailsPage";

interface CommunityDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the community page
export async function generateMetadata({
  params,
}: CommunityDetailPageProps): Promise<Metadata> {
  // Find community by slug
  const community = mockCommunities.find((c) => c.slug === params.slug);

  if (!community) {
    return {
      title: "Community Not Found | Khalifa Fund",
      description: "The requested community could not be found.",
    };
  }

  return {
    title: `${community.name} | Community Marketplace | Khalifa Fund`,
    description: community.description,
    keywords: [
      community.name,
      community.category,
      ...community.tags,
      "community",
      "marketplace",
      "UAE",
      "SME",
    ],
    openGraph: {
      title: `${community.name} | Khalifa Fund`,
      description: community.description,
      type: "website",
    },
  };
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  // Find community by slug to validate it exists
  const community = mockCommunities.find((c) => c.slug === params.slug);

  if (!community) {
    notFound();
  }

  return <CommunityDetailsPage slug={params.slug} />;
}
