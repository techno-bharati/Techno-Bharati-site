"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for any queries about Techno Bharati 2025.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Email</h3>
                  <Link
                    href="mailto:technobharati2025@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    technobharati2025@gmail.com
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Address</h3>
                  <p className="text-muted-foreground">
                    Bharati Vidyapeeth's College of Engineering
                    <br />
                    Kolhapur, Maharashtra
                    <br />
                    India - 416013
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Phone className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Event Coordinators
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Prof. Mayuri Potdar: +91 99232 26932</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
