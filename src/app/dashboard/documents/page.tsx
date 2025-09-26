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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Share,
  File,
  Image,
  FileSpreadsheet,
  FileArchive,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  status: "Active" | "Archived" | "Pending";
  category: string;
}

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample documents data
  const documents: Document[] = [
    {
      id: "1",
      name: "Company Registration Certificate",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Ahmed Al Mansoori",
      uploadDate: "2024-01-15",
      status: "Active",
      category: "Legal",
    },
    {
      id: "2",
      name: "Financial Statements 2023",
      type: "Excel",
      size: "1.8 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2024-01-10",
      status: "Active",
      category: "Financial",
    },
    {
      id: "3",
      name: "Business License",
      type: "PDF",
      size: "856 KB",
      uploadedBy: "Ahmed Al Mansoori",
      uploadDate: "2024-01-05",
      status: "Active",
      category: "Legal",
    },
    {
      id: "4",
      name: "Employee Contracts",
      type: "Word",
      size: "3.2 MB",
      uploadedBy: "HR Department",
      uploadDate: "2024-01-01",
      status: "Active",
      category: "HR",
    },
    {
      id: "5",
      name: "Marketing Materials",
      type: "Image",
      size: "5.1 MB",
      uploadedBy: "Marketing Team",
      uploadDate: "2023-12-28",
      status: "Archived",
      category: "Marketing",
    },
  ];

  const categories = [
    "all",
    "Legal",
    "Financial",
    "HR",
    "Marketing",
    "Technical",
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileArchive className="h-5 w-5 text-red-500" />;
      case "excel":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "word":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "image":
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Archived":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">
              Manage your company documents and files
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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
                    <span>Category</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category ? "bg-accent" : ""
                      }
                    >
                      {category === "all" ? "All Categories" : category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Documents Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>
                  {filteredDocuments.length} documents found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getFileIcon(document.type)}
                            <div>
                              <div className="font-medium">{document.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.type}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {document.size}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{document.category}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {document.uploadedBy}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {document.uploadDate}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
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
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                  Documents uploaded in the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No recent documents found
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Documents</CardTitle>
                <CardDescription>
                  Documents shared with external parties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No shared documents found
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Archived Documents</CardTitle>
                <CardDescription>
                  Documents that have been archived
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Archived Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments
                      .filter((doc) => doc.status === "Archived")
                      .map((document) => (
                        <TableRow key={document.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {getFileIcon(document.type)}
                              <div>
                                <div className="font-medium">
                                  {document.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{document.type}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {document.size}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {document.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {document.uploadDate}
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
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Restore
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

export default DocumentsPage;
