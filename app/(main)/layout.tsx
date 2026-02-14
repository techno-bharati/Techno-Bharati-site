"use client";

import { Footer } from "@/components/landing/Footer";
import { Navigation2 } from "@/components/landing/Navigation2";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <div className="w-full h-full mt-20">
      <Navigation2 />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
