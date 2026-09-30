import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Problem from "@/components/sections/Problem";
import Acquire from "@/components/sections/Acquire";
import Convert from "@/components/sections/Convert";
import Manage from "@/components/sections/Manage";
import Automate from "@/components/sections/Automate";
import System from "@/components/sections/System";
import Results from "@/components/sections/Results";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Acquire />
      <Convert />
      <Manage />
      <Automate />
      <System />
      <Results />
      <CTA />
      <Footer />
    </main>
  );
}
