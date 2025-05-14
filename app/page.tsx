import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactCTA from "@/components/contact-cta"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactCTA />
    </>
  )
}
