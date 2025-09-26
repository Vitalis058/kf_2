"use client";

import { useEffect } from "react";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
// import { useAuth } from "@/lib/auth/hooks/useAuth";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  // const [isSticky, setIsSticky] = useState(false);
  // const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // const scrollTop = window.scrollY;
      // setIsSticky(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full transition-all duration-300 ${className || ""}`}>
      <MainNav />
      <MobileNav />
    </header>
  );
}
