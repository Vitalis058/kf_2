"use client";

import React from "react";
import HeroSection from "./HeroSection";
import ServicesShowcase from "./ServicesShowcase";
import MarketplaceGrid from "./MarketplaceGrid";
import FeaturedServices from "./FeaturedServices";
import TestimonialsSection from "./TestimonialsSection";
import NewsletterSection from "./NewsletterSection";
import CTASection from "./CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesShowcase />
      <MarketplaceGrid />
      <FeaturedServices />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </div>
  );
}
