"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay updated with Khalifa Fund
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get the latest news, funding opportunities, and business insights
            delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Subscribe
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 mt-4">
            By subscribing, you agree to our privacy policy and terms of
            service.
          </p>
        </div>
      </div>
    </section>
  );
}
