"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!isNavigating) {
      setIsNavigating(true);
      setIsOpen(false);
      router.push(path);
      // Reset navigation state after a delay
      setTimeout(() => setIsNavigating(false), 1000);
    }
  };

  const navLinks = [
    { path: "/aboutus", label: "ABOUT US" },
    { path: "/events", label: "EVENTS" },
    { path: "/register", label: "REGISTER" },
    { path: "/contactus", label: "CONTACT US" },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2"
            disabled={isNavigating}
          >
            <span className="font-mono text-xl">INFUSION AI</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className="text-sm hover:text-primary transition-colors"
                disabled={isNavigating}
              >
                {link.label}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isNavigating}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 w-full bg-background border-b border-muted">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className="block w-full text-left text-sm hover:text-primary transition-colors"
                disabled={isNavigating}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
