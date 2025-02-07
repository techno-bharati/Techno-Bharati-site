"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2"
          >
            <span className="font-mono text-xl">INFUSION AI</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/aboutus")}
              className="text-sm hover:text-primary transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavigation("/events")}
              className="text-sm hover:text-primary transition-colors"
            >
              EVENTS
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="text-sm hover:text-primary transition-colors"
            >
              REGISTER
            </button>
            <button
              onClick={() => handleNavigation("/contactus")}
              className="text-sm hover:text-primary transition-colors"
            >
              CONTACT US
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 w-full bg-background border-b border-muted">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => handleNavigation("/aboutus")}
              className="block w-full text-left text-sm hover:text-primary transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavigation("/events")}
              className="block w-full text-left text-sm hover:text-primary transition-colors"
            >
              EVENTS
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="block w-full text-left text-sm hover:text-primary transition-colors"
            >
              REGISTER
            </button>
            <button
              onClick={() => handleNavigation("/contactus")}
              className="block w-full text-left text-sm hover:text-primary transition-colors"
            >
              CONTACT US
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
