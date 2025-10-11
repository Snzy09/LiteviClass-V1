"use client"

import * as React from "react"
import { students as allStudents, type Student } from "@/data/students"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StudentGrid } from "@/components/student-grid"

export default function StudentBrowser() {
  const [query, setQuery] = React.useState("")
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allStudents
    return allStudents.filter((s: Student) => {
      const hay = [
        s.name,
        s.slug,
        ...(s.skills ?? []),
        ...(s.hobbies ?? []),
        ...(s.projects?.map((p) => p.title) ?? []),
      ]
        .join(" ")
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query])

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="student-search" className="text-muted-foreground">
          Cari Siswa
        </Label>
        <Input
          id="student-search"
          placeholder="Ketik nama, skill, atau hobi..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <p className="text-xs text-muted-foreground">Ditemukan {filtered.length} siswa</p>
      </div>
      <StudentGrid students={filtered} />
    </div>
  )
}

export { StudentBrowser }
