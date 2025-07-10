"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Anchor,
  Store,
  AlertOctagon,
  Shield,
  FileText,
  Mail,
  Sliders,
  X,
  Palette,
  Clock,
  BarChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { logout } from "@/lib/auth"

// Define types for our items
type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

type FooterItem = NavItem & {
  description?: string;
  subItems?: Array<{
    name: string;
    href: string;
    description?: string;
  }>;
  onClick?: () => void;
}

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">Early Warning Signal</span>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={toggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2 no-scrollbar">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                  onClick={toggle}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="mt-6 px-3">
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">MASTER DATA</h3>
              <nav className="grid gap-1">
                {masterItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                    onClick={toggle}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 px-3">
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">MONITORING</h3>
              <nav className="grid gap-1">
                {monitoringItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                    onClick={toggle}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 px-3">
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">ADMINISTRATION</h3>
              <nav className="grid gap-1">
                {adminItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                    onClick={toggle}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-t p-2">
            <nav className="grid gap-1">
              {footerItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      toggle();
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.description && (
                      <span className="ml-auto text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </Link>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-md px-3 py-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
];

const masterItems: NavItem[] = [
  { name: "Anchor Master", href: "/anchor-master", icon: Anchor },
  { name: "Dealer Master", href: "/dealer-master", icon: Store },
];

const monitoringItems: NavItem[] = [
  { name: "Stop Supply", href: "/stop-supply", icon: AlertOctagon },
  { name: "FLDG View", href: "/fldg-view", icon: Shield },
  { name: "Credit Noting", href: "/dealer-status", icon: Store },
];

const adminItems: NavItem[] = [
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Configuration", href: "/configuration", icon: Sliders },
  { name: "Data Sync", href: "/data-sync", icon: Sliders },
];

const footerItems: FooterItem[] = [
  { 
    name: "Logout", 
    href: "#", 
    icon: LogOut, 
    description: "Exit the app",
    onClick: () => logout()
  },
];
