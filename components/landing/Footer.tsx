import { Facebook, Instagram, Linkedin, Twitter, Youtube, DiscIcon as Discord } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-muted bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-6">
          <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="https://youtube.com" className="text-muted-foreground hover:text-primary">
            <Youtube className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="https://discord.com" className="text-muted-foreground hover:text-primary">
            <Discord className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 flex justify-center space-x-8 text-sm text-muted-foreground">
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
  )
}

