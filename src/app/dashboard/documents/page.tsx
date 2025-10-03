"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/data-table/data-table";
import {
  FileText,
  Upload,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Share,
  File,
  Image,
  FileSpreadsheet,
  FileArchive,
  ArrowUpDown,
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample documents data
  const documents: Document[] = useMemo(
    () => [
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
    ],
    []
  );

  const categories = [
    "all",
    "Legal",
    "Financial",
    "HR",
    "Marketing",
    "Technical",
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === "all" || doc.category === selectedCategory;
      return matchesCategory;
    });
  }, [documents, selectedCategory]);

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

  // Column definitions for all documents table
  const allDocumentsColumns: ColumnDef<Document>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const document = row.original;
          return (
            <div className="flex items-center space-x-3">
              {getFileIcon(document.type)}
              <div>
                <div className="font-medium">{document.name}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Type
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return <Badge variant="outline">{type}</Badge>;
        },
      },
      {
        accessorKey: "size",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Size
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("size")}
            </span>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const category = row.getValue("category") as string;
          return <Badge variant="secondary">{category}</Badge>;
        },
      },
      {
        accessorKey: "uploadedBy",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Uploaded By
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("uploadedBy")}
            </span>
          );
        },
      },
      {
        accessorKey: "uploadDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("uploadDate")}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return <Badge className={getStatusColor(status)}>{status}</Badge>;
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => {
          return (
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
          );
        },
      },
    ],
    []
  );

  // Column definitions for archived documents table
  const archivedDocumentsColumns: ColumnDef<Document>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const document = row.original;
          return (
            <div className="flex items-center space-x-3">
              {getFileIcon(document.type)}
              <div>
                <div className="font-medium">{document.name}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Type
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return <Badge variant="outline">{type}</Badge>;
        },
      },
      {
        accessorKey: "size",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Size
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("size")}
            </span>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const category = row.getValue("category") as string;
          return <Badge variant="secondary">{category}</Badge>;
        },
      },
      {
        accessorKey: "uploadDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Archived Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("uploadDate")}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => {
          return (
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
          );
        },
      },
    ],
    []
  );

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

        {/* Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>
                      Category:{" "}
                      {selectedCategory === "all" ? "All" : selectedCategory}
                    </span>
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
                <DataTable
                  columns={allDocumentsColumns}
                  data={filteredDocuments}
                  searchKey="name"
                  searchPlaceholder="Search documents by name..."
                />
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
                <DataTable
                  columns={archivedDocumentsColumns}
                  data={filteredDocuments.filter(
                    (doc) => doc.status === "Archived"
                  )}
                  searchKey="name"
                  searchPlaceholder="Search archived documents..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentsPage;
