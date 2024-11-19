import Navbar from "@/components/landing/Navbar";
import Image from "next/image";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import RedirectToDashboard from "./redirect/page";

export default async function Home() {

  return (
    <div className="">
      <div className="min-h-screen flex flex-col bg-[#F4F4F4] text-[#191C1D]">
      <Navbar />
        <SignedIn>
        <RedirectToDashboard />
        </SignedIn>
        <SignedOut>
        <main className="flex-grow">
          <Hero />
          <Services />
          <Pricing />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        </SignedOut>

      </div>
    </div>
  );
}
