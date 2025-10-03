"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      company: "TechStart UAE",
      content:
        "Khalifa Fund&apos;s financial support helped us scale from a small startup to a thriving business. The process was smooth and the team was incredibly supportive.",
      rating: 5,
      initials: "AR",
    },
    {
      name: "Sarah Johnson",
      company: "Green Solutions LLC",
      content:
        "The training programs and advisory services provided by Khalifa Fund were instrumental in our business growth. Highly recommended for any entrepreneur.",
      rating: 5,
      initials: "SJ",
    },
    {
      name: "Mohammed Hassan",
      company: "Innovation Hub",
      content:
        "The marketplace platform connected us with the right partners and service providers. It&apos;s a game-changer for business networking in the UAE.",
      rating: 5,
      initials: "MH",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            SUCCESS STORIES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What our entrepreneurs say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from businesses that have grown with Khalifa
            Fund&apos;s support
          </p>
        </div>

        {/* Simple Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="h-6 w-6 text-primary/30 mb-3" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </div>
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
