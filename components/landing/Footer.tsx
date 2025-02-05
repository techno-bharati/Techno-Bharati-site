import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  DiscIcon as Discord,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-muted bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6">
            <Link
              href="https://instagram.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://facebook.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://youtube.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Youtube className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://discord.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Discord className="h-6 w-6" />
            </Link>
          </div>

          {/* College Logo and Name */}
          <div className="flex items-center justify-center md:justify-end space-x-4">
            <Image
              src="/bvcoe_logo.png"
              alt="BVCOE Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <div className="text-muted-foreground">
              <p className="font-semibold">
                Bharati Vidyapeeth's College of Engineering
              </p>
              <p className="text-sm">New Delhi</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
          <Link href="/contact" className="hover:text-primary">
            CONTACT US
          </Link>
          <Link href="/sponsors" className="hover:text-primary">
            SPONSORS
          </Link>
          <Link href="/about" className="hover:text-primary">
            ABOUT US
          </Link>
        </div>
      </div>
    </footer>
  );
}
