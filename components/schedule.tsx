"use client"

import { useState, useMemo, useEffect } from "react"
import { weeklySchedule, getTodayDayName, type Day } from "@/data/schedule"
import { Card } from "@/components/ui/card"
import { MotionStagger } from "@/components/motion"

export function Schedule() {
  const defaultDay = useMemo(() => getTodayDayName(), [])
  const [active, setActive] = useState<Day>(defaultDay)

  const isHoliday = useMemo(() => {
    const lower = String(active).toLowerCase()
    return lower === "sabtu" || lower === "minggu" || lower === "saturday" || lower === "sunday"
  }, [active])

  const todayLessons = weeklySchedule?.[active] ?? []

  useEffect(() => {
    const refresh = () => setActive(getTodayDayName() as Day)

    const onVisible = () => {
      if (document.visibilityState === "visible") refresh()
    }
    document.addEventListener("visibilitychange", onVisible)

    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
    const timeoutId = window.setTimeout(() => {
      refresh()
      // refresh every 24h thereafter
      const intervalId = window.setInterval(refresh, 24 * 60 * 60 * 1000)
      // store id on window to avoid extra refs; cleared on unmount by clearing all timeouts/intervals
      ;(window as any).__scheduleIntervalId = intervalId
    }, midnight.getTime() - now.getTime())

    return () => {
      document.removeEventListener("visibilitychange", onVisible)
      clearTimeout(timeoutId)
      if ((window as any).__scheduleIntervalId) {
        clearInterval((window as any).__scheduleIntervalId)
      }
    }
  }, [setActive])

  return (
    <section id="jadwal" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-balance text-2xl font-semibold">Jadwal Mata Pelajaran Hari Ini</h2>
          <p className="text-sm text-muted-foreground">hari : {active}</p>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mb-4 overflow-x-auto px-4">
        
      </div>

      {/* Body */}
      {isHoliday ? (
        <Card className="rounded-xl border border-border/60 bg-muted/40 p-6 text-center">
          <h3 className="text-lg font-medium">Sedang libur</h3>
          <p className="text-sm text-muted-foreground">Tidak ada jadwal mata pelajaran untuk hari ini.</p>
        </Card>
      ) : todayLessons.length === 0 ? (
        <Card className="rounded-xl border border-border/60 bg-muted/40 p-6 text-center">
          <h3 className="text-lg font-medium">Tidak ada jadwal</h3>
          <p className="text-sm text-muted-foreground">Belum ada jadwal yang terdaftar untuk hari ini.</p>
        </Card>
      ) : (
        <MotionStagger key={active} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {todayLessons.map((s) => {
            const isBreak = /istirahat|ishoma/i.test(s.name || "")
            return (
              <Card
                key={(s.time || "") + (s.name || "")}
                className={
                  "flex items-center justify-between rounded-xl border border-border/60 p-4 " +
                  (isBreak ? "bg-muted/60" : "bg-card/60")
                }
              >
                <div>
                  
                  <h3 className="text-lg font-medium">{s.name}</h3>
                </div>
                {s.teacher ? (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {s.teacher}
                  </span>
                ) : null}
              </Card>
            )
          })}
        </MotionStagger>
      )}
    </section>
  )
}
