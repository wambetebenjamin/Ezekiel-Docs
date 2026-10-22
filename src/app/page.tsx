import { Hero } from '@/components/Hero';
import { FeaturedDocuments } from '@/components/FeaturedDocuments';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDocuments />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}