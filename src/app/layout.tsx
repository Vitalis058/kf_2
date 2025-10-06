import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MSALProviderWrapper } from "@/lib/auth/providers/msal-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khalifa Fund | Supporting UAE Entrepreneurs",
  description:
    "Khalifa Fund for Enterprise Development supports UAE entrepreneurs and SMEs with funding, training, and business development services.",
  keywords: [
    "UAE",
    "entrepreneurs",
    "funding",
    "business development",
    "SME",
    "startup",
    "Khalifa Fund",
  ],
  authors: [{ name: "Khalifa Fund for Enterprise Development" }],
  creator: "Khalifa Fund for Enterprise Development",
  publisher: "Khalifa Fund for Enterprise Development",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://khalifafund.ae",
    title: "Khalifa Fund | Supporting UAE Entrepreneurs",
    description:
      "Supporting UAE entrepreneurs and SMEs with comprehensive funding, training, and business development services since 2007.",
    siteName: "Khalifa Fund",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalifa Fund | Supporting UAE Entrepreneurs",
    description:
      "Supporting UAE entrepreneurs and SMEs with comprehensive funding, training, and business development services since 2007.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MSALProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </MSALProviderWrapper>
      </body>
    </html>
  );
}
