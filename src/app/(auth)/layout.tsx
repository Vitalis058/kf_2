import { Metadata } from "next";
import { AuthNavigation } from "./auth-navigation";

export const metadata: Metadata = {
  title: "Authentication | Khalifa Fund",
  description: "Sign in to your Khalifa Fund account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with theme-responsive gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 dark:from-teal-600 dark:via-blue-600 dark:to-purple-700" />

      {/* Overlay for better contrast */}
      <div className="fixed inset-0 bg-black/10 dark:bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <AuthNavigation />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Card with backdrop blur for glassmorphism effect */}
            <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-white/80 text-sm">
            © 2024 Khalifa Fund. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
