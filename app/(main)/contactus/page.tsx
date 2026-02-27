"use client";

import { motion } from "motion/react";
import { Braces, Mail, MapPin, Phone, School, User } from "lucide-react";
import Link from "next/link";
import { zenDots } from "@/lib/fonts";
import ContactDetailsCards from "./_components/ContactDetailsCards";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 uppercase ${zenDots.className}`}
            >
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for any queries about Techno Bharati 2026.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactDetailsCards cardTitle="Email" cardIcon={Mail}>
              <Link
                href="mailto:technobharati2025@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors break-all text-2xl"
              >
                technobharati2025@gmail.com
              </Link>
            </ContactDetailsCards>

            <ContactDetailsCards cardTitle="Address" cardIcon={MapPin}>
              <p className="text-muted-foreground">
                Bharati Vidyapeeth&apos;s College of Engineering
                <br />
                Kolhapur, Maharashtra
                <br />
                India - 416013
              </p>
            </ContactDetailsCards>

            <ContactDetailsCards cardTitle="Event Convenor" cardIcon={School}>
              <div className="space-y-2 text-muted-foreground text-2xl">
                <p>Dr. S. M. Mulla : +91 98601 51986</p>
              </div>
            </ContactDetailsCards>

            <ContactDetailsCards
              cardTitle="Event co-coordinator "
              cardIcon={User}
            >
              <div className="space-y-3 text-muted-foreground text-2xl">
                <p>Mr. Sajid Momin: +91 95616 65030</p>
              </div>
            </ContactDetailsCards>
          </div>
        </div>
      </section>
    </div>
  );
}
