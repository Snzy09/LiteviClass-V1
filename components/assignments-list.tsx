"use client"

import * as React from "react"
import { format, isPast, parseISO } from "date-fns"
import { id as localeID } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Assignment, AssignmentStatus } from "@/data/assignments"

type Props = {
  items: Assignment[]
  className?: string
}

export default function AssignmentsList({ items, className }: Props) {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<"semua" | AssignmentStatus>("semua")
  const [subject, setSubject] = React.useState<string>("semua")

  const subjects = React.useMemo(() => {
    const set = new Set(items.map((i) => i.subject))
    return ["semua", ...Array.from(set)]
  }, [items])

  const filtered = React.useMemo(() => {
    return items
      .filter((i) => (status === "semua" ? true : i.status === status))
      .filter((i) => (subject === "semua" ? true : i.subject === subject))
      .filter((i) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
          i.title.toLowerCase().includes(q) ||
          i.subject.toLowerCase().includes(q) ||
          (i.description?.toLowerCase().includes(q) ?? false) ||
          (i.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
          (i.assignedBy ?? "").toLowerCase().includes(q)
        )
      })
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
  }, [items, query, status, subject])

  return (
    <section className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Tugas / PR</CardTitle>
          <CardDescription>Filter, cari, dan pantau tenggat tugas kelas.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={status === "semua" ? "default" : "outline"} onClick={() => setStatus("semua")}>
                Semua
              </Button>
              <Button size="sm" variant={status === "belum" ? "default" : "outline"} onClick={() => setStatus("belum")}>
                Belum
              </Button>
              <Button
                size="sm"
                variant={status === "proses" ? "default" : "outline"}
                onClick={() => setStatus("proses")}
              >
                Proses
              </Button>
              <Button
                size="sm"
                variant={status === "selesai" ? "default" : "outline"}
                onClick={() => setStatus("selesai")}
              >
                Selesai
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Mata Pelajaran</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih mapel" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "semua" ? "Semua" : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const due = parseISO(i.dueDate)
          const overdue = i.status !== "selesai" && isPast(due)
          return (
            <Card key={i.id} className="flex flex-col">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-balance">{i.title}</CardTitle>
                  <StatusBadge status={i.status} />
                </div>
                <CardDescription className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{i.subject}</Badge>
                  <span aria-label="Jatuh tempo">{format(due, "EEEE, dd MMM yyyy", { locale: localeID })}</span>
                  {overdue && (
                    <Badge variant="destructive" className="ml-1">
                      Terlambat
                    </Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {i.description ? <p className="text-pretty text-sm text-muted-foreground">{i.description}</p> : null}
                {i.tags && i.tags.length ? (
                  <div className="flex flex-wrap gap-1">
                    {i.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                {i.assignedBy ? <p className="text-xs text-muted-foreground">Pengampu: {i.assignedBy}</p> : null}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: AssignmentStatus }) {
  if (status === "selesai") {
    return <Badge className="bg-green-600 text-white hover:bg-green-600/90">Selesai</Badge>
  }
  if (status === "proses") {
    return <Badge className="bg-amber-500 text-black hover:bg-amber-500/90">Proses</Badge>
  }
  return <Badge className="bg-red-600 text-white hover:bg-red-600/90">Belum</Badge>
}
