import { FinancialService } from "../types";

export const mockFinancialServices: FinancialService[] = [
  {
    id: "1",
    name: "Startup Capital Fund",
    slug: "startup-capital-fund",
    description: "Comprehensive funding solution for early-stage startups with flexible terms and mentorship support.",
    category: "Operations",
    industry: "Technology",
    processingTime: "5-7 business days",
    cost: "2.5% APR",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    features: [
      "Up to AED 500,000 funding",
      "Flexible repayment terms",
      "Business mentorship included",
      "No collateral required",
      "Fast approval process"
    ],
    provider: "Khalifa Fund",
    eligibility: [
      "UAE-based startup",
      "Less than 2 years in operation",
      "Innovative business model",
      "Minimum 2 founders"
    ],
    requirements: [
      "Business plan",
      "Financial projections",
      "Founder identification",
      "Company registration documents"
    ],
    benefits: [
      "Access to investor network",
      "Marketing support",
      "Technology assistance",
      "Legal advisory services"
    ],
    contact: {
      phone: "+971 2 123 4567",
      email: "startup@khalifafund.ae",
      address: "Khalifa Fund Tower, Abu Dhabi"
    },
    createdAt: "2024-01-15T10:00:00Z",
    facetValues: [],
    customFields: {
      Industry: "Technology",
      BusinessStage: "Early Stage",
      ProcessingTime: "5-7 business days",
      RegistrationValidity: "2 years",
      Cost: 2.5,
      Steps: "Application → Review → Approval → Disbursement",
      TermsOfService: "Standard Khalifa Fund terms apply",
      RequiredDocuments: "Business plan, financial projections, ID copies",
      RelatedServices: [
        { id: "2", name: "Business Mentorship", slug: "business-mentorship" },
        { id: "3", name: "Legal Advisory", slug: "legal-advisory" }
      ]
    }
  },
  {
    id: "2",
    name: "SME Growth Loan",
    slug: "sme-growth-loan",
    description: "Tailored financing for established SMEs looking to expand operations and increase market presence.",
    category: "Growth",
    industry: "Manufacturing",
    processingTime: "7-10 business days",
    cost: "3.2% APR",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    features: [
      "Up to AED 2,000,000 funding",
      "Extended repayment period",
      "Working capital support",
      "Equipment financing",
      "Export assistance"
    ],
    provider: "Abu Dhabi Commercial Bank",
    eligibility: [
      "UAE-registered SME",
      "Minimum 2 years in operation",
      "Positive cash flow",
      "Annual revenue AED 1M+"
    ],
    requirements: [
      "Audited financial statements",
      "Business license",
      "Bank statements (6 months)",
      "Collateral documentation"
    ],
    benefits: [
      "Competitive interest rates",
      "Flexible payment options",
      "Business advisory services",
      "International trade support"
    ],
    contact: {
      phone: "+971 2 234 5678",
      email: "sme@adcb.ae",
      address: "ADCB Tower, Abu Dhabi"
    },
    createdAt: "2024-01-10T14:30:00Z",
    facetValues: [],
    customFields: {
      Industry: "Manufacturing",
      BusinessStage: "Growth Stage",
      ProcessingTime: "7-10 business days",
      RegistrationValidity: "5 years",
      Cost: 3.2,
      Steps: "Application → Assessment → Approval → Documentation → Disbursement",
      TermsOfService: "Standard ADCB SME terms",
      RequiredDocuments: "Financial statements, business license, bank statements",
      RelatedServices: [
        { id: "4", name: "Export Finance", slug: "export-finance" },
        { id: "5", name: "Equipment Leasing", slug: "equipment-leasing" }
      ]
    }
  },
  {
    id: "3",
    name: "Innovation Grant Program",
    slug: "innovation-grant-program",
    description: "Non-repayable grants for innovative projects in technology, healthcare, and sustainability sectors.",
    category: "Projects",
    industry: "Innovation",
    processingTime: "14-21 business days",
    cost: "0% (Grant)",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    features: [
      "Up to AED 1,000,000 grant",
      "No repayment required",
      "Innovation support",
      "Research collaboration",
      "IP protection assistance"
    ],
    provider: "Abu Dhabi Investment Office",
    eligibility: [
      "Innovative project proposal",
      "UAE-based entity",
      "Technology focus",
      "Commercial viability"
    ],
    requirements: [
      "Detailed project proposal",
      "Technical specifications",
      "Market analysis",
      "Team credentials"
    ],
    benefits: [
      "100% grant funding",
      "Technical mentorship",
      "Market access support",
      "Patent assistance"
    ],
    contact: {
      phone: "+971 2 345 6789",
      email: "innovation@adio.ae",
      address: "ADIO Building, Abu Dhabi"
    },
    createdAt: "2024-01-20T09:15:00Z",
    facetValues: [],
    customFields: {
      Industry: "Innovation",
      BusinessStage: "Development",
      ProcessingTime: "14-21 business days",
      RegistrationValidity: "3 years",
      Cost: 0,
      Steps: "Proposal → Evaluation → Selection → Grant Agreement → Disbursement",
      TermsOfService: "ADIO Innovation Grant terms",
      RequiredDocuments: "Project proposal, technical specs, market analysis",
      RelatedServices: [
        { id: "6", name: "Patent Services", slug: "patent-services" },
        { id: "7", name: "R&D Support", slug: "rd-support" }
      ]
    }
  },
  {
    id: "4",
    name: "Export Finance Facility",
    slug: "export-finance-facility",
    description: "Specialized financing for UAE companies looking to expand internationally with export credit insurance.",
    category: "Growth",
    industry: "Services",
    processingTime: "10-14 business days",
    cost: "2.8% APR",
    rating: 4.7,
    reviews: 45,
    isNew: false,
    features: [
      "Up to AED 5,000,000 facility",
      "Export credit insurance",
      "Currency hedging",
      "International market access",
      "Trade documentation support"
    ],
    provider: "Emirates NBD",
    eligibility: [
      "UAE-registered company",
      "Export-oriented business",
      "Minimum 3 years operation",
      "Valid export contracts"
    ],
    requirements: [
      "Export contracts",
      "Financial statements",
      "Business plan",
      "Insurance documentation"
    ],
    benefits: [
      "Competitive rates",
      "Risk mitigation",
      "Global market access",
      "Expert trade support"
    ],
    contact: {
      phone: "+971 2 456 7890",
      email: "export@emiratesnbd.com",
      address: "Emirates NBD Tower, Dubai"
    },
    createdAt: "2024-01-05T11:45:00Z",
    facetValues: [],
    customFields: {
      Industry: "Services",
      BusinessStage: "Expansion",
      ProcessingTime: "10-14 business days",
      RegistrationValidity: "3 years",
      Cost: 2.8,
      Steps: "Application → Contract Review → Insurance → Approval → Disbursement",
      TermsOfService: "Emirates NBD Export Finance terms",
      RequiredDocuments: "Export contracts, financial statements, insurance docs",
      RelatedServices: [
        { id: "8", name: "Trade Insurance", slug: "trade-insurance" },
        { id: "9", name: "Currency Services", slug: "currency-services" }
      ]
    }
  },
  {
    id: "5",
    name: "Asset-Based Financing",
    slug: "asset-based-financing",
    description: "Flexible financing secured against business assets including equipment, inventory, and receivables.",
    category: "Assets",
    industry: "Infrastructure",
    processingTime: "5-8 business days",
    cost: "3.5% APR",
    rating: 4.5,
    reviews: 78,
    isNew: false,
    features: [
      "Up to AED 10,000,000 facility",
      "Asset-backed security",
      "Flexible drawdown",
      "Seasonal adjustments",
      "Asset management support"
    ],
    provider: "First Abu Dhabi Bank",
    eligibility: [
      "UAE-registered business",
      "Valuable business assets",
      "Stable cash flow",
      "Asset valuation report"
    ],
    requirements: [
      "Asset valuation",
      "Financial statements",
      "Asset documentation",
      "Insurance certificates"
    ],
    benefits: [
      "Higher loan amounts",
      "Flexible terms",
      "Asset optimization",
      "Professional management"
    ],
    contact: {
      phone: "+971 2 567 8901",
      email: "assets@fab.ae",
      address: "FAB Tower, Abu Dhabi"
    },
    createdAt: "2024-01-12T16:20:00Z",
    facetValues: [],
    customFields: {
      Industry: "Infrastructure",
      BusinessStage: "Established",
      ProcessingTime: "5-8 business days",
      RegistrationValidity: "5 years",
      Cost: 3.5,
      Steps: "Application → Asset Valuation → Assessment → Approval → Documentation",
      TermsOfService: "FAB Asset Financing terms",
      RequiredDocuments: "Asset valuation, financial statements, insurance",
      RelatedServices: [
        { id: "10", name: "Asset Valuation", slug: "asset-valuation" },
        { id: "11", name: "Insurance Services", slug: "insurance-services" }
      ]
    }
  },
  {
    id: "6",
    name: "Equity Investment Program",
    slug: "equity-investment-program",
    description: "Strategic equity investments in high-growth potential companies with value-added support.",
    category: "Equity",
    industry: "Technology",
    processingTime: "21-30 business days",
    cost: "Equity Stake",
    rating: 4.8,
    reviews: 34,
    isNew: true,
    features: [
      "Up to AED 15,000,000 investment",
      "Strategic partnership",
      "Board representation",
      "Growth acceleration",
      "Exit strategy support"
    ],
    provider: "Mubadala Investment Company",
    eligibility: [
      "High-growth potential",
      "Scalable business model",
      "Strong management team",
      "Market opportunity"
    ],
    requirements: [
      "Business plan",
      "Financial projections",
      "Management profiles",
      "Market analysis"
    ],
    benefits: [
      "Strategic partnership",
      "Growth acceleration",
      "Market access",
      "Exit support"
    ],
    contact: {
      phone: "+971 2 678 9012",
      email: "equity@mubadala.ae",
      address: "Mubadala Tower, Abu Dhabi"
    },
    createdAt: "2024-01-25T13:10:00Z",
    facetValues: [],
    customFields: {
      Industry: "Technology",
      BusinessStage: "Scale-up",
      ProcessingTime: "21-30 business days",
      RegistrationValidity: "7 years",
      Cost: 0,
      Steps: "Application → Due Diligence → Investment Committee → Agreement → Investment",
      TermsOfService: "Mubadala Equity Investment terms",
      RequiredDocuments: "Business plan, financial projections, management profiles",
      RelatedServices: [
        { id: "12", name: "Strategic Advisory", slug: "strategic-advisory" },
        { id: "13", name: "Exit Planning", slug: "exit-planning" }
      ]
    }
  },
  {
    id: "7",
    name: "Working Capital Line",
    slug: "working-capital-line",
    description: "Flexible credit line for daily business operations with easy access and competitive rates.",
    category: "Operations",
    industry: "Services",
    processingTime: "3-5 business days",
    cost: "2.1% APR",
    rating: 4.4,
    reviews: 123,
    isNew: false,
    features: [
      "Up to AED 1,500,000 limit",
      "Flexible drawdown",
      "Interest on used amount only",
      "Online access",
      "Quick approval"
    ],
    provider: "Abu Dhabi Islamic Bank",
    eligibility: [
      "UAE-registered business",
      "Minimum 1 year operation",
      "Regular cash flow",
      "Good credit history"
    ],
    requirements: [
      "Bank statements",
      "Business license",
      "Financial statements",
      "Credit check"
    ],
    benefits: [
      "Low interest rates",
      "Flexible usage",
      "Quick access",
      "Online management"
    ],
    contact: {
      phone: "+971 2 789 0123",
      email: "working@adib.ae",
      address: "ADIB Tower, Abu Dhabi"
    },
    createdAt: "2024-01-08T08:30:00Z",
    facetValues: [],
    customFields: {
      Industry: "Services",
      BusinessStage: "Operational",
      ProcessingTime: "3-5 business days",
      RegistrationValidity: "2 years",
      Cost: 2.1,
      Steps: "Application → Credit Check → Approval → Setup → Activation",
      TermsOfService: "ADIB Working Capital terms",
      RequiredDocuments: "Bank statements, business license, financial statements",
      RelatedServices: [
        { id: "14", name: "Cash Management", slug: "cash-management" },
        { id: "15", name: "Online Banking", slug: "online-banking" }
      ]
    }
  },
  {
    id: "8",
    name: "Project Finance Facility",
    slug: "project-finance-facility",
    description: "Specialized financing for large-scale infrastructure and development projects with long-term repayment.",
    category: "Projects",
    industry: "Infrastructure",
    processingTime: "30-45 business days",
    cost: "4.0% APR",
    rating: 4.6,
    reviews: 56,
    isNew: false,
    features: [
      "Up to AED 50,000,000 facility",
      "Long-term repayment",
      "Project-specific terms",
      "Risk assessment",
      "Technical support"
    ],
    provider: "Abu Dhabi Investment Authority",
    eligibility: [
      "Large-scale project",
      "Infrastructure focus",
      "Government support",
      "Feasibility study"
    ],
    requirements: [
      "Feasibility study",
      "Project documentation",
      "Environmental assessment",
      "Government approvals"
    ],
    benefits: [
      "Large funding amounts",
      "Long-term support",
      "Technical expertise",
      "Risk mitigation"
    ],
    contact: {
      phone: "+971 2 890 1234",
      email: "projects@adia.ae",
      address: "ADIA Building, Abu Dhabi"
    },
    createdAt: "2024-01-18T15:45:00Z",
    facetValues: [],
    customFields: {
      Industry: "Infrastructure",
      BusinessStage: "Project Development",
      ProcessingTime: "30-45 business days",
      RegistrationValidity: "10 years",
      Cost: 4.0,
      Steps: "Application → Feasibility → Assessment → Approval → Documentation → Disbursement",
      TermsOfService: "ADIA Project Finance terms",
      RequiredDocuments: "Feasibility study, project docs, environmental assessment",
      RelatedServices: [
        { id: "16", name: "Feasibility Studies", slug: "feasibility-studies" },
        { id: "17", name: "Environmental Assessment", slug: "environmental-assessment" }
      ]
    }
  },
  {
    id: "9",
    name: "Trade Finance Solutions",
    slug: "trade-finance-solutions",
    description: "Comprehensive trade finance solutions including letters of credit, guarantees, and supply chain financing.",
    category: "Operations",
    industry: "Manufacturing",
    processingTime: "7-12 business days",
    cost: "2.9% APR",
    rating: 4.7,
    reviews: 91,
    isNew: false,
    features: [
      "Letters of credit",
      "Bank guarantees",
      "Supply chain finance",
      "Documentary collections",
      "Trade advisory"
    ],
    provider: "Commercial Bank of Dubai",
    eligibility: [
      "Import/export business",
      "UAE registration",
      "Trade history",
      "Banking relationship"
    ],
    requirements: [
      "Trade contracts",
      "Banking documents",
      "Company registration",
      "Financial statements"
    ],
    benefits: [
      "Risk mitigation",
      "Cash flow optimization",
      "Global reach",
      "Expert support"
    ],
    contact: {
      phone: "+971 2 901 2345",
      email: "trade@cbd.ae",
      address: "CBD Tower, Dubai"
    },
    createdAt: "2024-01-14T12:00:00Z",
    facetValues: [],
    customFields: {
      Industry: "Manufacturing",
      BusinessStage: "Trading",
      ProcessingTime: "7-12 business days",
      RegistrationValidity: "3 years",
      Cost: 2.9,
      Steps: "Application → Contract Review → Documentation → Approval → Execution",
      TermsOfService: "CBD Trade Finance terms",
      RequiredDocuments: "Trade contracts, banking docs, company registration",
      RelatedServices: [
        { id: "18", name: "Documentary Collections", slug: "documentary-collections" },
        { id: "19", name: "Supply Chain Finance", slug: "supply-chain-finance" }
      ]
    }
  },
  {
    id: "10",
    name: "Green Energy Financing",
    slug: "green-energy-financing",
    description: "Specialized financing for renewable energy projects with favorable terms and environmental benefits.",
    category: "Projects",
    industry: "Energy",
    processingTime: "14-21 business days",
    cost: "2.3% APR",
    rating: 4.9,
    reviews: 42,
    isNew: true,
    features: [
      "Up to AED 20,000,000 funding",
      "Green energy focus",
      "Favorable terms",
      "Technical support",
      "Environmental benefits"
    ],
    provider: "Masdar",
    eligibility: [
      "Renewable energy project",
      "Environmental compliance",
      "Technical feasibility",
      "UAE-based entity"
    ],
    requirements: [
      "Technical specifications",
      "Environmental impact",
      "Energy production estimates",
      "Project timeline"
    ],
    benefits: [
      "Competitive rates",
      "Technical expertise",
      "Environmental impact",
      "Long-term support"
    ],
    contact: {
      phone: "+971 2 012 3456",
      email: "green@masdar.ae",
      address: "Masdar City, Abu Dhabi"
    },
    createdAt: "2024-01-22T10:30:00Z",
    facetValues: [],
    customFields: {
      Industry: "Energy",
      BusinessStage: "Development",
      ProcessingTime: "14-21 business days",
      RegistrationValidity: "5 years",
      Cost: 2.3,
      Steps: "Application → Technical Review → Environmental Assessment → Approval → Implementation",
      TermsOfService: "Masdar Green Energy terms",
      RequiredDocuments: "Technical specs, environmental impact, energy estimates",
      RelatedServices: [
        { id: "20", name: "Technical Consulting", slug: "technical-consulting" },
        { id: "21", name: "Environmental Services", slug: "environmental-services" }
      ]
    }
  },
  {
    id: "11",
    name: "Healthcare Innovation Fund",
    slug: "healthcare-innovation-fund",
    description: "Dedicated funding for healthcare technology and medical innovation projects with specialized support.",
    category: "Innovation",
    industry: "Healthcare",
    processingTime: "21-28 business days",
    cost: "3.0% APR",
    rating: 4.8,
    reviews: 28,
    isNew: true,
    features: [
      "Up to AED 8,000,000 funding",
      "Healthcare focus",
      "Regulatory support",
      "Clinical trials assistance",
      "Market access"
    ],
    provider: "Abu Dhabi Health Services",
    eligibility: [
      "Healthcare innovation",
      "Medical technology",
      "Regulatory compliance",
      "Clinical validation"
    ],
    requirements: [
      "Medical documentation",
      "Regulatory approvals",
      "Clinical trial data",
      "Market analysis"
    ],
    benefits: [
      "Healthcare expertise",
      "Regulatory guidance",
      "Clinical support",
      "Market access"
    ],
    contact: {
      phone: "+971 2 123 4567",
      email: "healthcare@seha.ae",
      address: "SEHA Headquarters, Abu Dhabi"
    },
    createdAt: "2024-01-28T14:15:00Z",
    facetValues: [],
    customFields: {
      Industry: "Healthcare",
      BusinessStage: "Innovation",
      ProcessingTime: "21-28 business days",
      RegistrationValidity: "5 years",
      Cost: 3.0,
      Steps: "Application → Medical Review → Regulatory Check → Approval → Implementation",
      TermsOfService: "SEHA Healthcare Innovation terms",
      RequiredDocuments: "Medical docs, regulatory approvals, clinical data",
      RelatedServices: [
        { id: "22", name: "Regulatory Consulting", slug: "regulatory-consulting" },
        { id: "23", name: "Clinical Trials", slug: "clinical-trials" }
      ]
    }
  },
  {
    id: "12",
    name: "Digital Transformation Loan",
    slug: "digital-transformation-loan",
    description: "Funding for digital transformation initiatives including technology adoption and process automation.",
    category: "Management",
    industry: "Technology",
    processingTime: "10-15 business days",
    cost: "2.7% APR",
    rating: 4.5,
    reviews: 73,
    isNew: false,
    features: [
      "Up to AED 3,000,000 funding",
      "Technology focus",
      "Implementation support",
      "Training programs",
      "Ongoing assistance"
    ],
    provider: "Dubai Islamic Bank",
    eligibility: [
      "Digital transformation project",
      "Technology adoption",
      "Process improvement",
      "UAE-based business"
    ],
    requirements: [
      "Project proposal",
      "Technology specifications",
      "Implementation plan",
      "ROI projections"
    ],
    benefits: [
      "Technology expertise",
      "Implementation support",
      "Training programs",
      "Ongoing assistance"
    ],
    contact: {
      phone: "+971 2 234 5678",
      email: "digital@dib.ae",
      address: "DIB Tower, Dubai"
    },
    createdAt: "2024-01-16T11:20:00Z",
    facetValues: [],
    customFields: {
      Industry: "Technology",
      BusinessStage: "Transformation",
      ProcessingTime: "10-15 business days",
      RegistrationValidity: "3 years",
      Cost: 2.7,
      Steps: "Application → Project Review → Technology Assessment → Approval → Implementation",
      TermsOfService: "DIB Digital Transformation terms",
      RequiredDocuments: "Project proposal, tech specs, implementation plan",
      RelatedServices: [
        { id: "24", name: "Technology Consulting", slug: "technology-consulting" },
        { id: "25", name: "Training Programs", slug: "training-programs" }
      ]
    }
  }
];

export const mockFacets = [
  {
    id: "1",
    name: "Business Stage",
    code: "businessStage",
    values: [
      { id: "1", code: "startup", name: "Startup" },
      { id: "2", code: "growth", name: "Growth Stage" },
      { id: "3", code: "established", name: "Established" },
      { id: "4", code: "expansion", name: "Expansion" }
    ]
  },
  {
    id: "2",
    name: "Funding Amount",
    code: "fundingAmount",
    values: [
      { id: "1", code: "small", name: "Up to AED 500K" },
      { id: "2", code: "medium", name: "AED 500K - 2M" },
      { id: "3", code: "large", name: "AED 2M - 10M" },
      { id: "4", code: "enterprise", name: "Above AED 10M" }
    ]
  },
  {
    id: "3",
    name: "Processing Speed",
    code: "processingSpeed",
    values: [
      { id: "1", code: "fast", name: "Fast (3-7 days)" },
      { id: "2", code: "standard", name: "Standard (7-14 days)" },
      { id: "3", code: "extended", name: "Extended (14+ days)" }
    ]
  }
];
