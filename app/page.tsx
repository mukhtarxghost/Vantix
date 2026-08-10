import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Workflow from "@/components/sections/Workflow";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import Solutions from "@/components/sections/Solutions";
import ContactCTA from "@/components/sections/ContactCTA";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Workflow />
      <Services />
      <Solutions />
      <CaseStudies />
      <Process />
      <CTA />
      <ContactCTA />
      <Footer />
    </main>
  );
}