"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
    },
    {
      href: "/dashboard/registrations",
      label: "Registrations",
    },
    {
      href: "/dashboard/events",
      label: "Events",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
    },
  ];

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
