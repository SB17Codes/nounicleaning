"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-hero py-12 md:py-24" id="home">
      <div className="container mx-auto px-6 flex justify-center flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Faites briller votre Airbnb avec notre abonnement de nettoyage !
          </h1>
          <p className="text-xl mb-8">
            Services de nettoyage professionnels et sans tracas adaptés aux hôtes Airbnb. Gardez votre espace impeccable et vos invités heureux !
          </p>
          <Link
            href="#pricing"
            className="bg-[#56CA00] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#37B7C0] transition duration-300 inline-block"
          >
            Choisissez votre plan
          </Link>
        </div>
        <div className="lg:w-1/2">
          <DotLottieReact 
            src="/animation.lottie"
            background="transparent"
            speed={1}
            style={{ width: "600px", height: "400px" }}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}