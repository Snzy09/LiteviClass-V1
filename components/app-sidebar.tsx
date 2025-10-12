// Uses the existing shadcn/ui Sidebar primitives and lucide-react icons
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, CalendarDays, Book as Broom, Users, MessageCircle, LogOut, Search, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/#jadwal", label: "Jadwal", icon: CalendarDays },
  { href: "/#piket", label: "Piket", icon: Broom },
  { href: "/students", label: "Siswa", icon: Users },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/assignments", label: "Tugas", icon: BookOpen },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader className="gap-3">
        {/* Logo area */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="size-7 rounded-md bg-primary/90 text-primary-foreground grid place-items-center font-bold">
            ./
          </div>
          <div className="text-sm font-medium">Litevi Class</div>
        </div>

        {/* Search */}
        <div className="relative">
          
          <SidebarInput placeholder="Search..." className="pl-9" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => {
                const Icon = it.icon
                const active =
                  it.href === "/"
                    ? pathname === "/"
                    : pathname === it.href || (it.href.startsWith("/#") && pathname === "/")
                return (
                  <SidebarMenuItem key={it.href}>
                    <Link href={it.href} className="block">
                      <SidebarMenuButton
                        isActive={active}
                        variant={active ? "outline" : "default"}
                        className={cn(
                          active ? "bg-primary/10 text-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]" : "",
                        )}
                      >
                        <Icon />
                        <span>{it.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="rounded-md bg-secondary/60 px-2 py-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">Mode</span>
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </>
  )
}

export default AppSidebar
