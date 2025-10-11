import { allStudents, type Student } from "@/data/students"
import { StudentCard } from "./student-card"
import { MotionStagger } from "@/components/motion"

export function StudentGrid({ limit, students }: { limit?: number; students?: Student[] }) {
  const source = students ?? allStudents
  const list = limit ? source.slice(0, limit) : source
  return (
    <MotionStagger className="grid auto-rows-fr gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {list.map((s) => (
        <StudentCard key={s.id} student={s} />
      ))}
    </MotionStagger>
  )
}
