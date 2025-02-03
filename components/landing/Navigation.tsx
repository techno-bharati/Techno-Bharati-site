"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/techfest-logo.png"
              alt="Techfest Logo"
              width={40}
              height={40}
              className="w-auto h-8"
            />
            <span className="font-mono text-xl">INFUSION AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/aboutus"
              className="text-sm hover:text-primary transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/events"
              className="text-sm hover:text-primary transition-colors"
            >
              EVENTS
            </Link>
            <Link
              href="/register"
              className="text-sm hover:text-primary transition-colors"
            >
              REGISTER
            </Link>
            <Link
              href="/contactus"
              className="text-sm hover:text-primary transition-colors"
            >
              CONTACT US
            </Link>
            <Link
              href="/profile"
              className="text-sm hover:text-primary transition-colors"
            >
              PROFILE
            </Link>
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              SIGN IN
            </Button>
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
            <Link
              href="/aboutus"
              className="block text-sm hover:text-primary transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/events"
              className="block text-sm hover:text-primary transition-colors"
            >
              EVENTS
            </Link>
            <Link
              href="/register"
              className="block text-sm hover:text-primary transition-colors"
            >
              REGISTER
            </Link>
            <Link
              href="/contactus"
              className="block text-sm hover:text-primary transition-colors"
            >
              CONTACT US
            </Link>
            <Link
              href="/profile"
              className="block text-sm hover:text-primary transition-colors"
            >
              PROFILE
            </Link>
            <Button
              variant="outline"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              SIGN IN
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
