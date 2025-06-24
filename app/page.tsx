import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactCta from '@/components/ContactCta';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectShowcase />
      <ProcessSection />
      <TestimonialsSection />
      <ContactCta />
    </>
  );
}