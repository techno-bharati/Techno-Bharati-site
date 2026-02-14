import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

const ContactDetailsCards = ({
  cardTitle,
  cardIcon: Icon,
  children,
  className,
}: {
  cardTitle: string;
  cardIcon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className={cn("w-full", className)}
    >
      <Card className="text-center overflow-hidden relative rounded-xl min-h-[14rem] h-auto">
        <CardContent className="pt-6 pb-6 relative z-10">
          <Icon
            className="absolute text-primary/50 h-48 w-48 -top-6 -right-6 opacity-80 select-none pointer-events-none transform rotate-12"
            strokeWidth={1}
          />

          <h3 className="text-xl text-left uppercase tracking-wider font-semibold mb-4 relative z-20">
            {cardTitle}
          </h3>

          <div className="relative z-20 space-y-2 text-left">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactDetailsCards;
