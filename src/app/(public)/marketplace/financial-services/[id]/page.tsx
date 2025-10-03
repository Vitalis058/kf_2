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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  Clock,
  Building2,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
  Shield,
  FileText,
  Calendar,
  TrendingUp,
  Zap,
  Target,
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
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;
  const service = mockServices[id as keyof typeof mockServices];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-background to-blue-50/30 dark:from-blue-950/20 dark:via-background dark:to-blue-950/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white">
        <div className="container mx-auto px-4 pt-32 pb-12">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-white/10"
            >
              <Link
                href="/marketplace/financial-services"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Financial Services
              </Link>
            </Button>
          </div>

          {/* Service Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  {getCategoryIcon(service.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{service.name}</h1>
                    {service.isNew && (
                      <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-blue-100 text-lg mb-4">
                    {service.provider}
                  </p>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-blue-200">
                        ({service.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{service.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{service.industry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Description */}
              <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>

            {/* CTA Card */}
            <div className="lg:mt-0 mt-8">
              <Card className="bg-background/95 dark:bg-background/90 backdrop-blur-sm border border-border/50 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {service.cost}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Competitive rates with flexible terms
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      size="lg"
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-background dark:bg-background/50 shadow-sm border border-border/50">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="requirements"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Requirements
                </TabsTrigger>
                <TabsTrigger
                  value="process"
                  className="flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Process
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Features Grid */}
                <Card className="border border-border/50 shadow-sm bg-background/50 dark:bg-background/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      Key Features & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                          Service Features
                        </h4>
                        <div className="space-y-3">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                          Your Benefits
                        </h4>
                        <div className="space-y-3">
                          {service.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center border border-border/50 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        94%
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Success Rate
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="text-center border border-border/50 shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        7 Days
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Avg. Processing
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="text-center border border-border/50 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                        4.8/5
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Client Rating
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">{feature}</h4>
                            <p className="text-sm text-muted-foreground">
                              Comprehensive feature designed to meet your
                              business needs.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Eligibility Criteria
                      </CardTitle>
                      <CardDescription>
                        Requirements to qualify for this service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.eligibility.map((criteria, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-sm">{criteria}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>
                        Documents needed for application
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.requirements.map((requirement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <FileText className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Application Process
                    </CardTitle>
                    <CardDescription>
                      Step-by-step guide to apply for this service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          step: 1,
                          title: "Submit Application",
                          desc: "Complete the online application form with required information",
                        },
                        {
                          step: 2,
                          title: "Document Review",
                          desc: "Our team reviews your submitted documents and eligibility",
                        },
                        {
                          step: 3,
                          title: "Assessment",
                          desc: "Detailed assessment of your business needs and requirements",
                        },
                        {
                          step: 4,
                          title: "Approval",
                          desc: "Final approval and terms confirmation",
                        },
                        {
                          step: 5,
                          title: "Service Delivery",
                          desc: "Implementation and ongoing support",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border border-border/50 shadow-sm sticky top-8 bg-background/50 dark:bg-background/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {service.contact.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {service.contact.email}
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm font-medium">
                    {service.contact.address}
                  </span>
                </div>

                <Separator />

                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Download Brochure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
