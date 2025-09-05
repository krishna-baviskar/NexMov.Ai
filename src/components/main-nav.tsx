"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, GitCommit, Briefcase, BarChart3 } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  {
    href: "/career-roadmap",
    label: "Career Roadmap",
    icon: GitCommit,
  },
  {
    href: "/skill-gap-analysis",
    label: "Skill Gap Analysis",
    icon: Compass,
  },
  {
    href: "/job-market-trends",
    label: "Job Market Trends",
    icon: BarChart3,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href}>
            <SidebarMenuButton
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <link.icon />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
