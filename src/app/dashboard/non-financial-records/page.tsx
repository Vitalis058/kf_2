"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  GraduationCap,
  Lightbulb,
  Handshake,
  Shield,
  ChartBar,
  MapPin,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  type: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected";
  progress: number;
  submittedDate: string;
  lastUpdated: string;
  assignedTo: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: string;
}

const NonFinancialRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample service requests data
  const serviceRequests: ServiceRequest[] = [
    {
      id: "REQ-001",
      title: "Business Advisory Consultation",
      type: "Advisory Services",
      status: "Under Review",
      progress: 75,
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      assignedTo: "Sarah Johnson",
      priority: "High",
      category: "Advisory",
    },
    {
      id: "REQ-002",
      title: "Export Training Program Registration",
      type: "Training Program",
      status: "Approved",
      progress: 100,
      submittedDate: "2024-01-10",
      lastUpdated: "2024-01-18",
      assignedTo: "Ahmed Al Mansoori",
      priority: "Medium",
      category: "Training",
    },
    {
      id: "REQ-003",
      title: "Legal Compliance Review",
      type: "Legal Services",
      status: "Submitted",
      progress: 50,
      submittedDate: "2024-01-12",
      lastUpdated: "2024-01-19",
      assignedTo: "Legal Team",
      priority: "High",
      category: "Legal",
    },
    {
      id: "REQ-004",
      title: "Digital Solutions Consultation",
      type: "Digital Services",
      status: "Draft",
      progress: 25,
      submittedDate: "2024-01-08",
      lastUpdated: "2024-01-15",
      assignedTo: "Tech Team",
      priority: "Low",
      category: "Digital",
    },
    {
      id: "REQ-005",
      title: "Partnership Opportunity Discussion",
      type: "Partnership",
      status: "Rejected",
      progress: 0,
      submittedDate: "2024-01-05",
      lastUpdated: "2024-01-12",
      assignedTo: "Business Development",
      priority: "Medium",
      category: "Partnership",
    },
  ];

  const categories = [
    { name: "Advisory", icon: Lightbulb, color: "text-blue-500" },
    { name: "Training", icon: GraduationCap, color: "text-green-500" },
    { name: "Legal", icon: Shield, color: "text-purple-500" },
    { name: "Digital", icon: ChartBar, color: "text-orange-500" },
    { name: "Partnership", icon: Handshake, color: "text-pink-500" },
    { name: "Export", icon: MapPin, color: "text-cyan-500" },
  ];

  const filteredRequests = serviceRequests.filter((request) => {
    const matchesSearch = request.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || request.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Submitted":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "Draft":
        return <Edit className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Under Review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.name === category);
    if (categoryData) {
      const IconComponent = categoryData.icon;
      return <IconComponent className={`h-4 w-4 ${categoryData.color}`} />;
    }
    return <Building2 className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Non-Financial Records</h1>
            <p className="text-muted-foreground">
              Manage your service requests and applications
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("all")}
                    className={selectedStatus === "all" ? "bg-accent" : ""}
                  >
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("Draft")}
                    className={selectedStatus === "Draft" ? "bg-accent" : ""}
                  >
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("Submitted")}
                    className={
                      selectedStatus === "Submitted" ? "bg-accent" : ""
                    }
                  >
                    Submitted
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("Under Review")}
                    className={
                      selectedStatus === "Under Review" ? "bg-accent" : ""
                    }
                  >
                    Under Review
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("Approved")}
                    className={selectedStatus === "Approved" ? "bg-accent" : ""}
                  >
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("Rejected")}
                    className={selectedStatus === "Rejected" ? "bg-accent" : ""}
                  >
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Service Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const count = serviceRequests.filter(
              (req) => req.category === category.name
            ).length;
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color
                        .replace("text-", "bg-")
                        .replace("-500", "-100")}`}
                    >
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Requests Table */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Service Requests</CardTitle>
                <CardDescription>
                  {filteredRequests.length} requests found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{request.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.id} • {request.type}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(request.category)}
                            <span className="text-sm">{request.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.status)}
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={request.progress}
                              className="w-20"
                            />
                            <div className="text-xs text-muted-foreground">
                              {request.progress}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {request.assignedTo}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {request.lastUpdated}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Requests</CardTitle>
                <CardDescription>
                  Requests currently being processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((req) =>
                        ["Submitted", "Under Review"].includes(req.status)
                      )
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{request.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {request.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(request.status)}
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress
                                value={request.progress}
                                className="w-20"
                              />
                              <div className="text-xs text-muted-foreground">
                                {request.progress}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {request.assignedTo}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Requests</CardTitle>
                <CardDescription>
                  Requests that have been approved or rejected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completed Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((req) =>
                        ["Approved", "Rejected"].includes(req.status)
                      )
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{request.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {request.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(request.status)}
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {request.lastUpdated}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="draft" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Draft Requests</CardTitle>
                <CardDescription>
                  Requests that are still being prepared
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((req) => req.status === "Draft")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{request.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {request.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress
                                value={request.progress}
                                className="w-20"
                              />
                              <div className="text-xs text-muted-foreground">
                                {request.progress}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {request.lastUpdated}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Continue Editing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Submit
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NonFinancialRecordsPage;
