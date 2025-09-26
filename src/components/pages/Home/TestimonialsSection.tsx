"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      company: "TechStart UAE",
      content:
        "Khalifa Fund's financial support helped us scale from a small startup to a thriving business. The process was smooth and the team was incredibly supportive.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      company: "Green Solutions LLC",
      content:
        "The training programs and advisory services provided by Khalifa Fund were instrumental in our business growth. Highly recommended for any entrepreneur.",
      rating: 5,
    },
    {
      name: "Mohammed Hassan",
      company: "Innovation Hub",
      content:
        "The marketplace platform connected us with the right partners and service providers. It's a game-changer for business networking in the UAE.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-accent/5 to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230065ff' fill-opacity='0.02'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-2 rounded-full border border-accent/20 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <Badge
              variant="outline"
              className="bg-transparent border-accent/30 text-accent-foreground font-medium"
            >
              SUCCESS STORIES
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            What our entrepreneurs say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real stories from real businesses that have grown with Khalifa
            Fund&apos;s support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
