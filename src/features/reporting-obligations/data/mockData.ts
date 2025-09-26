import {
  ReportingObligationsResponse,
  ReportingObligation,
  SubmittedReport,
  ReceivedReport,
} from '../types/index';

export const mockReportingData: ReportingObligationsResponse = {
  // Summary data for KPIs
  summaryData: {
    totalReports: 32,
    completed: 24,
    pending: 6,
    overdue: 2,
    complianceRate: 88,
  },

  // Upcoming obligations
  upcomingObligations: [
    {
      id: "1",
      name: "Quarterly Financial Statement",
      dueDate: "2024-12-15",
      status: "Due Soon",
      assignedTo: "John Smith",
      type: "Financial",
      description: "Q4 financial statement submission to ADGM",
      priority: "High",
    },
    {
      id: "2",
      name: "Annual Environmental Compliance Report",
      dueDate: "2024-12-31",
      status: "Upcoming",
      assignedTo: "Sarah Johnson",
      type: "Environmental",
      description: "Annual environmental impact assessment",
      priority: "Medium",
    },
    {
      id: "3",
      name: "Employee Health & Safety Assessment",
      dueDate: "2024-11-30",
      status: "Overdue",
      assignedTo: "Ahmed Al Mansoori",
      type: "Compliance",
      description: "Workplace safety compliance report",
      priority: "High",
    },
    {
      id: "4",
      name: "Regulatory Capital Adequacy Report",
      dueDate: "2024-12-20",
      status: "Upcoming",
      assignedTo: "Fatima Al Zaabi",
      type: "Regulatory",
      description: "Capital adequacy assessment for regulatory compliance",
      priority: "High",
    },
    {
      id: "5",
      name: "Data Protection Compliance Audit",
      dueDate: "2024-12-10",
      status: "Due Soon",
      assignedTo: "Michael Chen",
      type: "Compliance",
      description: "GDPR and data protection compliance audit",
      priority: "Medium",
    },
    {
      id: "6",
      name: "Anti-Money Laundering Report",
      dueDate: "2024-12-25",
      status: "Upcoming",
      assignedTo: "Lisa Wang",
      type: "Regulatory",
      description: "AML compliance and risk assessment report",
      priority: "High",
    },
  ],

  // Submitted reports
  submittedReports: [
    {
      id: "1",
      name: "Q3 Financial Statement",
      type: "Financial",
      status: "Approved",
      submittedDate: "2024-10-15",
      reviewer: "ADGM Financial Authority",
      fileUrl: "/documents/q3-financial-statement.pdf",
      fileSize: "2.4 MB",
      version: "1.0",
    },
    {
      id: "2",
      name: "Anti-Money Laundering Compliance",
      type: "Regulatory",
      status: "Approved",
      submittedDate: "2024-09-30",
      reviewer: "Financial Services Regulatory Authority",
      fileUrl: "/documents/aml-compliance.pdf",
      fileSize: "3.1 MB",
      version: "2.1",
    },
    {
      id: "3",
      name: "Employee Diversity Report",
      type: "Operational",
      status: "Pending Review",
      submittedDate: "2024-11-05",
      reviewer: "Ministry of Human Resources",
      fileUrl: "/documents/diversity-report.xlsx",
      fileSize: "1.8 MB",
      version: "1.0",
    },
    {
      id: "4",
      name: "Carbon Footprint Assessment",
      type: "Environmental",
      status: "Approved",
      submittedDate: "2024-08-22",
      reviewer: "Environment Agency Abu Dhabi",
      fileUrl: "/documents/carbon-footprint.pdf",
      fileSize: "4.2 MB",
      version: "1.2",
    },
    {
      id: "5",
      name: "Data Security Incident Report",
      type: "Compliance",
      status: "Rejected",
      submittedDate: "2024-10-28",
      reviewer: "ADGM Data Protection Commissioner",
      fileUrl: "/documents/security-incident.pdf",
      fileSize: "1.5 MB",
      version: "1.0",
      comments: "Incomplete documentation. Please resubmit with additional details.",
    },
    {
      id: "6",
      name: "Corporate Governance Statement",
      type: "Regulatory",
      status: "Approved",
      submittedDate: "2024-07-15",
      reviewer: "ADGM Registration Authority",
      fileUrl: "/documents/governance-statement.pdf",
      fileSize: "2.8 MB",
      version: "1.0",
    },
    {
      id: "7",
      name: "Q2 Financial Statement",
      type: "Financial",
      status: "Approved",
      submittedDate: "2024-07-15",
      reviewer: "ADGM Financial Authority",
      fileUrl: "/documents/q2-financial-statement.pdf",
      fileSize: "2.1 MB",
      version: "1.0",
    },
  ],

  // Received reports
  receivedReports: [
    {
      id: "1",
      title: "Industry Compliance Standards Update",
      source: "ADGM Financial Services Regulatory Authority",
      receivedDate: "2024-11-20",
      priority: "High",
      fileUrl: "/documents/industry-standards-update.pdf",
      fileSize: "1.2 MB",
      category: "Regulatory",
      description: "Updated compliance standards for financial services",
    },
    {
      id: "2",
      title: "Market Risk Assessment",
      source: "Central Bank of UAE",
      receivedDate: "2024-11-15",
      priority: "Medium",
      fileUrl: "/documents/market-risk-assessment.pdf",
      fileSize: "3.4 MB",
      category: "Financial",
      description: "Quarterly market risk assessment report",
    },
    {
      id: "3",
      title: "Quarterly Economic Outlook",
      source: "Abu Dhabi Department of Economic Development",
      receivedDate: "2024-11-10",
      priority: "Low",
      fileUrl: "/documents/economic-outlook-q4.pdf",
      fileSize: "2.1 MB",
      category: "Economic",
      description: "Q4 economic outlook and projections",
    },
    {
      id: "4",
      title: "Cybersecurity Threat Advisory",
      source: "UAE Computer Emergency Response Team",
      receivedDate: "2024-11-05",
      priority: "High",
      fileUrl: "/documents/cybersecurity-advisory.pdf",
      fileSize: "0.8 MB",
      category: "Security",
      description: "Critical cybersecurity threats and mitigation strategies",
    },
    {
      id: "5",
      title: "Environmental Regulations Update",
      source: "Environment Agency Abu Dhabi",
      receivedDate: "2024-10-28",
      priority: "Medium",
      fileUrl: "/documents/environmental-regulations.pdf",
      fileSize: "1.9 MB",
      category: "Environmental",
      description: "Updated environmental compliance regulations",
    },
  ],

  // Document wallet integration
  reportDocuments: [
    {
      id: "1",
      name: "Q3 Financial Statement.pdf",
      category: "Financial",
      fileType: "pdf",
      fileSize: "2.4 MB",
      uploadDate: "2024-10-15",
      fileUrl: "/documents/q3-financial-statement.pdf",
      version: "1.0",
      status: "Active",
    },
    {
      id: "2",
      name: "Anti-Money Laundering Compliance.pdf",
      category: "Regulatory",
      fileType: "pdf",
      fileSize: "3.1 MB",
      uploadDate: "2024-09-30",
      fileUrl: "/documents/aml-compliance.pdf",
      version: "2.1",
      status: "Active",
    },
    {
      id: "3",
      name: "Employee Diversity Report.xlsx",
      category: "Operational",
      fileType: "excel",
      fileSize: "1.8 MB",
      uploadDate: "2024-11-05",
      fileUrl: "/documents/diversity-report.xlsx",
      version: "1.0",
      status: "Active",
    },
    {
      id: "4",
      name: "Carbon Footprint Assessment.pdf",
      category: "Environmental",
      fileType: "pdf",
      fileSize: "4.2 MB",
      uploadDate: "2024-08-22",
      fileUrl: "/documents/carbon-footprint.pdf",
      version: "1.2",
      status: "Active",
    },
    {
      id: "5",
      name: "Data Security Incident Report.pdf",
      category: "Compliance",
      fileType: "pdf",
      fileSize: "1.5 MB",
      uploadDate: "2024-10-28",
      fileUrl: "/documents/security-incident.pdf",
      version: "1.0",
      status: "Draft",
    },
    {
      id: "6",
      name: "Corporate Governance Statement.pdf",
      category: "Regulatory",
      fileType: "pdf",
      fileSize: "2.8 MB",
      uploadDate: "2024-07-15",
      fileUrl: "/documents/governance-statement.pdf",
      version: "1.0",
      status: "Active",
    },
  ],
};

// Helper function to get filtered data
export const getFilteredObligations = (
  obligations: ReportingObligation[],
  filters: {
    searchQuery?: string;
    statusFilter?: string;
    typeFilter?: string;
    priorityFilter?: string;
  }
): ReportingObligation[] => {
  return obligations.filter((obligation) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !obligation.name.toLowerCase().includes(query) &&
        !obligation.assignedTo.toLowerCase().includes(query) &&
        !obligation.type.toLowerCase().includes(query) &&
        !(obligation.description?.toLowerCase().includes(query))
      ) {
        return false;
      }
    }

    // Status filter
    if (filters.statusFilter && filters.statusFilter !== 'all') {
      if (obligation.status !== filters.statusFilter) {
        return false;
      }
    }

    // Type filter
    if (filters.typeFilter && filters.typeFilter !== 'all') {
      if (obligation.type !== filters.typeFilter) {
        return false;
      }
    }

    // Priority filter
    if (filters.priorityFilter && filters.priorityFilter !== 'all') {
      if (obligation.priority !== filters.priorityFilter) {
        return false;
      }
    }

    return true;
  });
};

export const getFilteredReports = (
  reports: SubmittedReport[],
  filters: {
    searchQuery?: string;
    statusFilter?: string;
    typeFilter?: string;
  }
): SubmittedReport[] => {
  return reports.filter((report) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !report.name.toLowerCase().includes(query) &&
        !report.reviewer.toLowerCase().includes(query) &&
        !report.type.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (filters.statusFilter && filters.statusFilter !== 'all') {
      if (report.status !== filters.statusFilter) {
        return false;
      }
    }

    // Type filter
    if (filters.typeFilter && filters.typeFilter !== 'all') {
      if (report.type !== filters.typeFilter) {
        return false;
      }
    }

    return true;
  });
};

export const getFilteredReceivedReports = (
  reports: ReceivedReport[],
  filters: {
    searchQuery?: string;
    priorityFilter?: string;
    categoryFilter?: string;
  }
): ReceivedReport[] => {
  return reports.filter((report) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (
        !report.title.toLowerCase().includes(query) &&
        !report.source.toLowerCase().includes(query) &&
        !(report.description?.toLowerCase().includes(query))
      ) {
        return false;
      }
    }

    // Priority filter
    if (filters.priorityFilter && filters.priorityFilter !== 'all') {
      if (report.priority !== filters.priorityFilter) {
        return false;
      }
    }

    // Category filter
    if (filters.categoryFilter && filters.categoryFilter !== 'all') {
      if (report.category !== filters.categoryFilter) {
        return false;
      }
    }

    return true;
  });
};
