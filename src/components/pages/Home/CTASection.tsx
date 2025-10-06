"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Ready to Get Started?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Transform Your Business with
              <span className="block text-primary">Khalifa Fund</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join over 10,000+ successful entrepreneurs who have grown their
              businesses with our comprehensive support, funding, and training
              programs.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-card rounded-xl border border-border shadow-sm">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">
                Entrepreneurs Supported
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-xl border border-border shadow-sm">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                AED 2B+
              </div>
              <div className="text-sm text-muted-foreground">
                Funding Provided
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-xl border border-border shadow-sm">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Services Available
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-xl border border-border shadow-sm">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                95%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base lg:text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => (window.location.href = "/register")}
            >
              Start Your Application Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base lg:text-lg px-8 py-6 h-auto border-primary/20 hover:bg-primary/5"
              onClick={() =>
                (window.location.href = "/marketplace/financial-services")
              }
            >
              Explore Our Services
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              • Free consultation • No hidden fees • Quick approval process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
