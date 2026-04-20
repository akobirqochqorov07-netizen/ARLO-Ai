import Hero from "@/components/sections/Hero";
import RobotCatalog from "@/components/sections/RobotCatalog";
import Features from "@/components/sections/Features";
import Manifesto from "@/components/sections/Manifesto";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Outro from "@/components/sections/Outro";

export default function Home() {
  return (
    <main className="w-full bg-black relative">
      <Hero />
      <RobotCatalog />
      <Features />
      <Manifesto />
      <HowItWorks />
      <Pricing />
      <Outro />
    </main>
  );
}
