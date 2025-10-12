"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/#jadwal", label: "Jadwal" },
  { href: "/#piket", label: "Piket" },
  { href: "/students", label: "Siswa" },
  { href: "/chat", label: "Chat" },
  { href: "/assignments", label: "Tugas" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <Link href="/" className="font-mono text-sm text-muted-foreground hover:text-foreground">
            Litevi Class
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ul className="flex items-center gap-3 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2">
              <style jsx>{`
                ul::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
