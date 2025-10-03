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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Users,
  Edit,
  Save,
  X,
  CheckCircle,
  Globe,
  User,
  Briefcase,
  Hash,
  Calendar as CalendarIcon,
  Shield,
} from "lucide-react";

const FirmProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "FutureTech LLC",
    licenseNumber: "F00123",
    licenseType: "Category 3C License",
    issueDate: "01/01/2021",
    expiryDate: "31/12/2025",
    businessType: "Technology Services",
    registrationNumber: "REG-2021-001",
    taxNumber: "TAX-123456789",
    address: "123 Business District, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "info@futuretech.ae",
    website: "www.futuretech.ae",
    description:
      "A leading technology company providing innovative solutions for businesses across the UAE.",
    employees: "50-100",
    establishedYear: "2021",
    authorizedSignatory: "Ahmed Al Mansoori",
    signatoryTitle: "CEO",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    console.log("Profile saved:", formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    const fields = Object.keys(formData);
    const filledFields = fields.filter(
      (field) =>
        formData[field as keyof typeof formData] &&
        formData[field as keyof typeof formData].trim() !== ""
    );
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Check if license is expiring soon
  const isLicenseExpiringSoon = () => {
    const expiryDate = new Date(formData.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isLicenseExpired = () => {
    const expiryDate = new Date(formData.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="min-h-screen bg-muted/20 space-y-5">
      <div className=" mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="bg-card b shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Icon + Title + Description */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary rounded-xl">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Firm Profile
                  </h1>
                </div>
              </div>
              <p className="text-muted-foreground text-lg font-medium">
                Manage your company information and compliance details
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">
                  Profile Completion
                </span>
              </div>
              <Badge
                variant={profileCompletion >= 80 ? "default" : "secondary"}
              >
                {profileCompletion}%
              </Badge>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              {profileCompletion >= 80
                ? "Profile is well completed"
                : "Complete more fields to improve your profile"}
            </p>
          </CardContent>
        </Card>

        {/* License Status */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">
                  License Status
                </span>
              </div>
              <Badge
                variant={
                  isLicenseExpired()
                    ? "destructive"
                    : isLicenseExpiringSoon()
                    ? "secondary"
                    : "default"
                }
              >
                {isLicenseExpired()
                  ? "Expired"
                  : isLicenseExpiringSoon()
                  ? "Expiring Soon"
                  : "Active"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {formData.licenseType}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Expires: {formData.expiryDate}
            </p>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">
                Company Info
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {formData.businessType}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Est. {formData.establishedYear} • {formData.employees} employees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Overview */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">
                  Company Overview
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Basic company information and licensing details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-5">
              <div className="space-y-3">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-semibold flex items-center gap-2 text-foreground"
                >
                  <Building2 className="h-4 w-4 text-primary" />
                  Company Name
                </Label>
                {isEditing ? (
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="h-10"
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground">
                      {formData.companyName}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="licenseNumber"
                    className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <Hash className="h-4 w-4 text-indigo-600" />
                    License Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        handleInputChange("licenseNumber", e.target.value)
                      }
                      className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    />
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-700/50 dark:to-indigo-950/20 rounded-xl border border-slate-200/50 dark:border-slate-600/30">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {formData.licenseNumber}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="businessType"
                    className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <Briefcase className="h-4 w-4 text-emerald-600" />
                    Business Type
                  </Label>
                  {isEditing ? (
                    <Input
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) =>
                        handleInputChange("businessType", e.target.value)
                      }
                      className="h-11 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 dark:from-slate-700/50 dark:to-emerald-950/20 rounded-xl border border-slate-200/50 dark:border-slate-600/30">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {formData.businessType}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="licenseType"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  License Type
                </Label>
                {isEditing ? (
                  <Select
                    value={formData.licenseType}
                    onValueChange={(value) =>
                      handleInputChange("licenseType", value)
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Category 3C License">
                        Category 3C License
                      </SelectItem>
                      <SelectItem value="Category 2B License">
                        Category 2B License
                      </SelectItem>
                      <SelectItem value="Category 1A License">
                        Category 1A License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">
                      {formData.licenseType}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="issueDate"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Issue Date
                  </Label>
                  {isEditing ? (
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) =>
                        handleInputChange("issueDate", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">
                        {formData.issueDate}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="expiryDate"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Expiry Date
                  </Label>
                  {isEditing ? (
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {formData.expiryDate}
                      </p>
                      <Badge
                        variant={
                          isLicenseExpired()
                            ? "destructive"
                            : isLicenseExpiringSoon()
                            ? "secondary"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {isLicenseExpired()
                          ? "Expired"
                          : isLicenseExpiringSoon()
                          ? "Expiring Soon"
                          : "Active"}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">
                  Business Details
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Registration and operational information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="registrationNumber"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Hash className="h-4 w-4" />
                    Registration Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        handleInputChange("registrationNumber", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">
                        {formData.registrationNumber}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="taxNumber"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Hash className="h-4 w-4" />
                    Tax Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="taxNumber"
                      value={formData.taxNumber}
                      onChange={(e) =>
                        handleInputChange("taxNumber", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">
                        {formData.taxNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="employees"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Number of Employees
                  </Label>
                  {isEditing ? (
                    <Select
                      value={formData.employees}
                      onValueChange={(value) =>
                        handleInputChange("employees", value)
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">
                        {formData.employees}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="establishedYear"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    Established Year
                  </Label>
                  {isEditing ? (
                    <Input
                      id="establishedYear"
                      value={formData.establishedYear}
                      onChange={(e) =>
                        handleInputChange("establishedYear", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">
                        {formData.establishedYear}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Company Description
                </Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      {formData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Business address and contact details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Business Address
                </Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={2}
                    className="resize-none"
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      {formData.address}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{formData.phone}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{formData.email}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="h-10"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{formData.website}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authorized Signatory */}
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">
                  Authorized Signatory
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Primary contact person for official matters
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="authorizedSignatory"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="authorizedSignatory"
                    value={formData.authorizedSignatory}
                    onChange={(e) =>
                      handleInputChange("authorizedSignatory", e.target.value)
                    }
                    className="h-10"
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">
                      {formData.authorizedSignatory}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="signatoryTitle"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Title/Position
                </Label>
                {isEditing ? (
                  <Input
                    id="signatoryTitle"
                    value={formData.signatoryTitle}
                    onChange={(e) =>
                      handleInputChange("signatoryTitle", e.target.value)
                    }
                    className="h-10"
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">
                      {formData.signatoryTitle}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirmProfilePage;
