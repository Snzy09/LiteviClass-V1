"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Instagram, Bell } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
          <div className="flex flex-col">
            <span className="text-foreground font-medium">Litevi Class</span>
            <span>Wali Kelas: Maam Almi Ayu Anggraini • 32 Siswa</span>
            <span className="mt-1">© {new Date().getFullYear()} Litevi Class</span>
          </div>

          <nav className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            <Button asChild variant="link" className="p-0 h-auto gap-2">
              <a
                href="https://instagram.com/litevi.itclass"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Kelas Litevi Class"
                title="Instagram Kelas"
                className="inline-flex items-center"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
                <span className="inline-block">Instagram</span>
              </a>
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Changelog</span>
                  <Badge variant="secondary" className="h-5 px-1 text-[10px] leading-none">
                    NEW
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">Changelog</p>
                    <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-foreground">
                    <li>Menambahkan Dark / Light Mode toggle.</li>
                    <li>Menambahkan Class Gallery (carousel foto kelas).</li>
                    <li>Footer: tombol Instagram dengan ikon.</li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </nav>
        </div>
      </div>
    </footer>
  )
}
