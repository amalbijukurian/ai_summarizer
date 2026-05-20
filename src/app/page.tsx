import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import FAQSection from "@/components/home/faq-section";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </div>
  );
}
