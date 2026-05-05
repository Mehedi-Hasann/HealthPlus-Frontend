"use client";

import { HeroSection } from "@/components/modules/home/HeroSection";
import { FeaturesSection } from "@/components/modules/home/FeaturesSection";
import { HowItWorksSection } from "@/components/modules/home/HowItWorksSection";
import { StatsSection } from "@/components/modules/home/StatsSection";
import { NewsletterSection } from "@/components/modules/home/NewsletterSection";
import { CategoriesSection } from "@/components/modules/home/CategoriesSection";
import { FAQSection } from "@/components/modules/home/FAQSection";

export default function ExplorePage() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksSection />
      <StatsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}