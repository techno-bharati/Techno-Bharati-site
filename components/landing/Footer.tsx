import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-muted bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-3">
            <div className="flex justify-center md:justify-start space-x-6">
              <Link
                href="https://www.instagram.com/bvcoek_aiml/"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
            <ThemeToggle className="relative w-fit " />
          </div>

          <div className="flex items-center justify-center md:justify-end space-x-4">
            <Image
              src="/bvcoek.png"
              alt="BVCOE Logo"
              width={100}
              height={100}
              className="h-full w-auto"
            />
            <div className="text-muted-foreground">
              <p className="font-semibold">
                Bharati Vidyapeeth&apos;s College of Engineering
              </p>
              <p className="text-sm">Kolhapur</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
          <Link href="/contactus" className="hover:text-primary font-semibold">
            CONTACT US
          </Link>
          <Link href="/sponsors" className="hover:text-primary font-semibold">
            SPONSORS
          </Link>
          <Link href="/aboutus" className="hover:text-primary font-semibold">
            ABOUT US
          </Link>
        </div>

        <div className="mt-2 flex justify-center space-x-8 text-sm text-muted-foreground">
          <span className="text-sm md:text-base tracking-tight">
            Developed & Managed by{" "}
            <Link href={"/"} className="hover:underline hover:text-primary">
              Team InfusionAI
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
