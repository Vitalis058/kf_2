"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-3 py-1 rounded-full mb-4">
                <Mail className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  Newsletter
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-primary-foreground">
                Stay Updated with Khalifa Fund
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6 max-w-lg">
                Get exclusive access to funding opportunities, business
                insights, and success stories delivered directly to your inbox.
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="text-sm text-primary-foreground/90">
                    Weekly funding updates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="text-sm text-primary-foreground/90">
                    Business growth tips
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="text-sm text-primary-foreground/90">
                    Success stories
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="text-sm text-primary-foreground/90">
                    Event notifications
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary-foreground/20">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-2">
                    Full Name (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 h-12"
                  />
                </div>
                <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 font-semibold">
                  Subscribe to Newsletter
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-primary-foreground/70 text-center">
                  By subscribing, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-primary-foreground"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms"
                    className="underline hover:text-primary-foreground"
                  >
                    terms of service
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
