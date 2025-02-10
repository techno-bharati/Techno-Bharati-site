"use client";

import { Button } from "../ui/button";
import Countdown from "./Countdown";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero2() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExplore = () => {
    window.location.href = "/events";
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.15), transparent 80%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center space-y-8 px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-transparent">
                Techno{" "}
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-block"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Bharati
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light"
          >
            28th February, 2025
          </motion.p>
        </motion.div>

        <div>
          <Countdown />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl md:text-3xl">
            <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent font-bold tracking-tighter">
              Events are Live Now!
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="pt-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={handleExplore}
              className="bg-gradient-to-b from-primary to-primary/50 text-primary-foreground hover:opacity-90 transition-all duration-300 px-8 py-6 text-lg rounded-lg text-white dark:text-foreground/90"
            >
              EXPLORE
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
