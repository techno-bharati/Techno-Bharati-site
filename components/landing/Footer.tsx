"use client";

import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { zenDots } from "@/lib/fonts";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, {
    once: true,
  });

  const animationVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      variants={animationVariants}
      initial={"initial"}
      animate={isFooterInView ? "animate" : "initial"}
      className="relative border-t border-muted bg-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className={`absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-[0.03] dark:opacity-[0.05] w-full text-center ${zenDots.className}`}
        >
          <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-foreground whitespace-nowrap tracking-tighter inline-block leading-[0.8]">
            TECHNO BHARATI
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-3">
            <div className="flex justify-start space-x-6">
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
            <div className="flex flex-col justify-start items-start md:items-start text-sm text-muted-foreground">
              <Link
                href="/contactus"
                className="hover:text-primary font-semibold"
              >
                CONTACT US
              </Link>
              <Link
                href="/sponsors"
                className="hover:text-primary font-semibold"
              >
                SPONSORS
              </Link>
              <Link
                href="/aboutus"
                className="hover:text-primary font-semibold"
              >
                ABOUT US
              </Link>
            </div>
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

        <div className="w-full mt-2 text-xs sm:text-sm flex justify-between text-muted-foreground/80 capitalize">
          <p className="text-muted-foreground/80 select-none pointer-events-none">
            &copy; copyright Techno Bharati 2k26
          </p>
          <p className="tracking-tight">
            Developed & Managed by{" "}
            <Link
              href={"/"}
              className="hover:underline underline-offset-4 hover:text-primary"
            >
              Team InfusionAI
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
