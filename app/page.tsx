import AnnouncementBar from "@/src/components/layout/AnnouncementBar";
import Navbar from "@/src/components/layout/Navbar";
import HeroSection from "@/src/components/home/HeroSection";
import CategorySection from "@/src/components/home/CategorySection";
import NewArrivalsSection from "@/src/components/home/NewArrivalsSection";
import BestSellersSection from "@/src/components/home/BestSellersSection";
import FeaturedCollectionSection from "@/src/components/home/FeaturedCollectionSection";
import PromoBannerSection from "@/src/components/home/PromoBannerSection";
import WhyChooseSection from "@/src/components/home/WhyChooseSection";
import TrustAndReviewsSection from "@/src/components/home/TrustAndReviewsSection";
import Footer from "@/src/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation */}
      <Navbar />

      {/* 3. Premium Hero Section */}
      <HeroSection />

      {/* 4. Shop by Categories */}
      <CategorySection />

      {/* 5. New Arrivals */}
      <NewArrivalsSection />

      {/* 6. Best Sellers */}
      <BestSellersSection />

      {/* 7. Featured Collection */}
      <FeaturedCollectionSection />

      {/* 8. Promotional Lifestyle Banner */}
      <PromoBannerSection />

      {/* 9. Why Choose KLYRO */}
      <WhyChooseSection />

      {/* 10. Customer Trust & Service Highlights */}
      <TrustAndReviewsSection />

      {/* 11. Complete Footer */}
      <Footer />
    </main>
  );
}
