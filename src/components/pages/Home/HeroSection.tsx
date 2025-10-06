"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image.png"
          alt="Khalifa Fund Hero Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-end justify-center min-h-screen px-4 pb-32 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-none">
            Empowering UAE
            <span
              className="block text-primary"
              style={{
                textShadow:
                  "2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 2px 0 0 white, 0 -2px 0 white, -2px 0 0 white",
              }}
            >
              Entrepreneurs
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your gateway to funding, training, and business support for UAE
            entrepreneurs.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white text-sm font-medium">
            Discover our marketplace
          </span>
          <ChevronDown className="h-8 w-8 text-white animate-bounce drop-shadow-lg" />
        </div>
      </div>
    </main>
  );
}
