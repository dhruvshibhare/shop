import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
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
      {/* Service image for mobile only */}
      <Image
        src="/service.png"
        alt="Service visual"
        width={400}
        height={300}
        className="block md:hidden w-full max-w-xs mx-auto my-8 rounded-xl shadow-lg"
      />
      <ProcessSection />
      <TestimonialsSection />
      <ContactCta />
    </>
  );
}
