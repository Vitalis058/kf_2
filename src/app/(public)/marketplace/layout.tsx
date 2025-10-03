import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | Khalifa Fund",
  description: "Discover services and connect with trusted providers",
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
}
