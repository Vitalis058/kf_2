"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "./navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on dashboard routes
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return <MainNav />;
}
