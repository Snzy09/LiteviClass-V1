"use client"

import { useState } from "react"
import { days, type Day } from "@/data/schedule"
import { dutyByDay } from "@/data/roster"
import { Card } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion"
import { Book as Broom } from "lucide-react"

export function DutyRoster() {
  const dayMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] as const
  const todayName = dayMap[new Date().getDay()]
  const isWeekend = todayName === "Sabtu" || todayName === "Minggu"

  const [active, setActive] = useState<Day>(() => {
    return (["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].includes(todayName) ? (todayName as Day) : "Senin") as Day
  })

  return (
    <section id="piket" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-balance text-2xl font-semibold">Jadwal Piket</h2>
          <p className="text-sm text-muted-foreground">
            {isWeekend
              ? `Hari ini ${todayName}. Sedang libur.`
              : `Hari ini ${active}. Rotasi piket untuk kebersihan kelas`}
          </p>
        </div>
        
      </div>

      <Card className="rounded-xl border border-border/60 bg-card/60 p-3 sm:p-4">
        {isWeekend ? (
          <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
            Tidak ada piket karena hari libur.
          </div>
        ) : (
          <MotionStagger key={active}>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2 mx-0.5 my-0.5 px-0.5 py-0.5 border-0 shadow-sm">
              {dutyByDay[active].map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2 text-sm text-secondary-foreground"
                >
                  <Broom className="h-4 w-4 opacity-80" aria-hidden="true" />
                  <span className="truncate">{name}</span>
                </li>
              ))}
            </ul>
          </MotionStagger>
        )}
      </Card>
    </section>
  )
}
