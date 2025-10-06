"use client";

import React from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const marketplaceLinks = [
    { name: "Financial Services", href: "/marketplace/financial-services" },
    {
      name: "Non-Financial Services",
      href: "/marketplace/non-financial-services",
    },
    { name: "Course Marketplace", href: "/marketplace/courses" },
    { name: "Investment Opportunities", href: "/marketplace/investment" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Mission", href: "/about#mission" },
    { name: "Leadership Team", href: "/about#team" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "News & Updates", href: "/news" },
    { name: "Careers", href: "/careers" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/support" },
    { name: "Application Guide", href: "/guide" },
    { name: "FAQs", href: "/faq" },
    { name: "Documentation", href: "/docs" },
    { name: "Community Forum", href: "/community" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Compliance", href: "/compliance" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/khalifafund",
      icon: Facebook,
    },
    { name: "Twitter", href: "https://twitter.com/khalifafund", icon: Twitter },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/khalifafund",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/khalifafund",
      icon: Instagram,
    },
    { name: "YouTube", href: "https://youtube.com/khalifafund", icon: Youtube },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Khalifa Fund
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise Development
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Supporting UAE entrepreneurs and SMEs with comprehensive funding,
              training, and business development services since 2007. Empowering
              innovation and driving economic growth across the Emirates.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  info@khalifafund.ae
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Khalifa Fund Headquarters
                  <br />
                  Dubai, United Arab Emirates
                </span>
              </div>
            </div>
          </div>

          {/* Marketplaces */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">
              Marketplaces
            </h4>
            <ul className="space-y-3">
              {marketplaceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Khalifa Fund for Enterprise Development. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-xs text-muted-foreground">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground mr-2">
              Follow us:
            </span>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <IconComponent className="h-4 w-4" />
                  <ExternalLink className="h-2 w-2 opacity-0 group-hover:opacity-100 absolute translate-x-2 -translate-y-2 transition-opacity duration-200" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* UAE Government Badge */}
      <div className="bg-primary/5 dark:bg-primary/10 border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">
                UAE Government Initiative
              </span>
            </div>
            <Separator orientation="vertical" className="hidden sm:block h-4" />
            <p className="text-xs text-muted-foreground">
              Proudly supporting the UAE Vision 2071 and economic
              diversification goals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
