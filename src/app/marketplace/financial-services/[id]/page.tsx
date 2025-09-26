import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Building2,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

// Mock data - in a real app, this would come from an API
const mockServices = {
  "1": {
    id: "1",
    name: "Business Operations Financing",
    description:
      "Working capital and operational funding solutions for daily business needs and cash flow management. This comprehensive financing program is designed to support UAE entrepreneurs and SMEs with flexible funding options to maintain smooth business operations.",
    category: "Operations",
    industry: "All Industries",
    processingTime: "5-10 business days",
    cost: "Starting from 2.5% APR",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    features: [
      "Working Capital Loans up to AED 5M",
      "Trade Finance Solutions",
      "Invoice Factoring Services",
      "Flexible Line of Credit",
      "Quick Approval Process",
      "Competitive Interest Rates",
    ],
    provider: "Khalifa Fund",
    eligibility: [
      "UAE-registered business",
      "Minimum 2 years in operation",
      "Annual revenue between AED 500K - AED 50M",
      "Good credit history",
      "Valid trade license",
    ],
    requirements: [
      "Business registration documents",
      "Financial statements (last 2 years)",
      "Bank statements (last 6 months)",
      "Trade license copy",
      "Business plan",
      "Collateral documentation (if applicable)",
    ],
    benefits: [
      "Flexible repayment terms",
      "No prepayment penalties",
      "Dedicated relationship manager",
      "Access to business advisory services",
      "Priority processing for existing clients",
    ],
    contact: {
      phone: "+971 4 123 4567",
      email: "operations@khalifafund.ae",
      address: "Khalifa Fund Headquarters, Dubai, UAE",
    },
  },
};

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = mockServices[params.id as keyof typeof mockServices];

  if (!service) {
    notFound();
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Operations":
        return <Building2 className="h-6 w-6" />;
      default:
        return <Building2 className="h-6 w-6" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/marketplace" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                {getCategoryIcon(service.category)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{service.name}</h1>
                  {service.isNew && <Badge variant="secondary">New</Badge>}
                </div>
                <p className="text-muted-foreground">{service.provider}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{service.rating}</span>
                <span>({service.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{service.industry}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{service.processingTime}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>
                What makes this service stand out
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>
                What you&apos;ll gain from this service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility & Requirements */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>
                  Requirements to qualify for this service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.eligibility.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{criteria}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Documents needed for application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {service.cost}
                </div>
                <p className="text-sm text-muted-foreground">
                  Competitive rates with flexible terms
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Consultation
                </Button>
                <Button variant="ghost" className="w-full">
                  Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{service.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{service.contact.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{service.contact.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Service Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Success Rate
                </span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Average Processing
                </span>
                <span className="font-semibold">7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Client Satisfaction
                </span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
