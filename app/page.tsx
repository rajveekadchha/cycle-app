import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PhoneProof from "@/components/PhoneProof";
import Founders from "@/components/Founders";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="container-x">
        <Nav />
        <Hero />
        <HowItWorks />
        <PhoneProof />
      </div>

      <Founders />

      <div className="container-x">
        <Trust />
        <FAQ />
        <FinalCTA />
      </div>
    </>
  );
}
