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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/shared/data-table/data-table";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Building2,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User" | "Viewer";
  department: string;
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
  joinDate: string;
  phone?: string;
  avatar?: string;
}

const UserManagementPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Sample users data
  const users: User[] = useMemo(
    () => [
      {
        id: "1",
        name: "Ahmed Al Mansoori",
        email: "ahmed@futuretech.ae",
        role: "Admin",
        department: "Executive",
        status: "Active",
        lastLogin: "2024-01-20",
        joinDate: "2021-01-15",
        phone: "+971 50 123 4567",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@futuretech.ae",
        role: "Manager",
        department: "Finance",
        status: "Active",
        lastLogin: "2024-01-19",
        joinDate: "2022-03-10",
        phone: "+971 50 234 5678",
      },
      {
        id: "3",
        name: "Mohammed Al Zahra",
        email: "mohammed@futuretech.ae",
        role: "User",
        department: "Operations",
        status: "Active",
        lastLogin: "2024-01-18",
        joinDate: "2023-06-01",
        phone: "+971 50 345 6789",
      },
      {
        id: "4",
        name: "Fatima Al Rashid",
        email: "fatima@futuretech.ae",
        role: "User",
        department: "HR",
        status: "Pending",
        lastLogin: "Never",
        joinDate: "2024-01-15",
        phone: "+971 50 456 7890",
      },
      {
        id: "5",
        name: "Omar Hassan",
        email: "omar@futuretech.ae",
        role: "Viewer",
        department: "Legal",
        status: "Inactive",
        lastLogin: "2023-12-15",
        joinDate: "2022-09-20",
        phone: "+971 50 567 8901",
      },
    ],
    []
  );

  const roles = ["all", "Admin", "Manager", "User", "Viewer"];
  const statuses = ["all", "Active", "Inactive", "Pending"];
  const departments = [
    "Executive",
    "Finance",
    "Operations",
    "HR",
    "Legal",
    "IT",
    "Marketing",
  ];

  // Filter users based on role and status
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === "all" || user.status === selectedStatus;
      return matchesRole && matchesStatus;
    });
  }, [users, selectedRole, selectedStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Inactive":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Inactive":
        return "bg-red-50 text-red-700 border-red-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "User":
        return "bg-green-100 text-green-800";
      case "Viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Column definitions for TanStack Table
  const columns: ColumnDef<User>[] = useMemo(
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
              User
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {getInitials(user.name)}
                </span>
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Role
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return <Badge className={getRoleColor(role)}>{role}</Badge>;
        },
      },
      {
        accessorKey: "department",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Department
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("department")}
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
          return (
            <div className="flex items-center space-x-2">
              {getStatusIcon(status)}
              <Badge className={getStatusColor(status)}>{status}</Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "lastLogin",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Last Login
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("lastLogin")}
            </span>
          );
        },
      },
      {
        accessorKey: "joinDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Join Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <span className="text-muted-foreground">
              {row.getValue("joinDate")}
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
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="h-4 w-4 mr-2" />
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
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
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with appropriate permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    placeholder="Full name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    placeholder="user@company.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddUserOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === "all" ? "All Roles" : role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (users.filter((u) => u.status === "Active").length /
                    users.length) *
                    100
                )}
                % of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.role === "Admin").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Administrative access
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.status === "Pending").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting activation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table with TanStack Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              {filteredUsers.length} users found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredUsers}
              searchKey="name"
              searchPlaceholder="Search users by name..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagementPage;
