"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zenDots } from "@/lib/fonts";
import ThemeToogle from "./ThemeToggle";

export function Navigation2() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/aboutus", label: "ABOUT US" },
    { href: "/events", label: "EVENTS" },
    // Route all registration traffic through the events list,
    // where users can pick a specific event and register.
    { href: "/sponsors", label: "SPONSORS" },
    { href: "/contactus", label: "CONTACT US" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    window.location.href = path;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-muted px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2"
          >
            <span className={`font-mono text-xl ${zenDots.className}`}>
              INFUSION AI
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(link.href)}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <ThemeToogle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 w-full bg-background/95 backdrop-blur-sm border-b border-muted overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  whileHover={{ x: 10 }}
                  onClick={() => handleNavigation(link.href)}
                  className="block w-full text-left text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <ThemeToogle className="w-fit" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
