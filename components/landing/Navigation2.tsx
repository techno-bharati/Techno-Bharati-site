"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zenDots } from "@/lib/fonts";
import ThemeToogle from "./ThemeToggle";
import { useRouter } from "next/navigation";

export function Navigation2() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/aboutus", label: "ABOUT US" },
    { href: "/events", label: "EVENTS" },
    { href: "/sponsors", label: "SPONSORS" },
    { href: "/contactus", label: "CONTACT US" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
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
      viewport={{ once: true }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-muted px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2"
          >
            <span className={`font-mono text-xl ${zenDots.className}`}>
              BVCOEK
            </span>
          </motion.button>

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

          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

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
