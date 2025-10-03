import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="p-8 animate-in fade-in-50 duration-500">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Sign In</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back
        </h1>
        <p className="text-muted-foreground text-base">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="h-12"
          />
        </div>

        {/* Forgot password link */}
        <div className="text-right">
          <Button variant="link" className="p-0 h-auto text-sm">
            Forgot password?
          </Button>
        </div>

        <Button
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 transition-all duration-200"
          type="submit"
        >
          Sign In
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-primary"
            asChild
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
