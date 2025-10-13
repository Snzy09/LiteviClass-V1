import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Student } from "@/data/students"

export function StudentCard({ student }: { student: Student }) {
  return (
    <Link href={`/students/${student.slug}`} className="block h-full">
      <Card className="group flex h-full flex-col rounded-lg border border-border/60 bg-card/60 p-3 transition-all hover:-translate-y-1 hover:shadow-md sm:rounded-xl sm:p-4">
        <div className="mb-2 overflow-hidden rounded-md bg-secondary/40 aspect-[3/2] sm:mb-3 sm:rounded-lg sm:aspect-[4/3]">
          <img src="/student-thumbnail.jpg" alt="" className="h-full w-full object-cover" crossOrigin="anonymous" />
        </div>
        <h3 className="text-base font-semibold leading-tight sm:text-lg">{student.name}</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">Portofolio</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2 sm:gap-2 sm:pt-3">
          {student.skills.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] sm:text-xs">
              {s}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  )
}
