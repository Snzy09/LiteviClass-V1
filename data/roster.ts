import { students } from "./students"
import { days, type Day } from "./schedule"

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))
  return res
}

// 32 siswa -> 5 hari. Distribusi 6-7 siswa per hari.
const groups = chunk(students, Math.ceil(students.length / days.length))

export const dutyByDay: Record<Day, string[]> = {
  Senin: [{
    name: "Ahmad Fadli",
  }],
  Selasa: groups[1]?.map((s) => s.name) ?? [],
  Rabu: groups[2]?.map((s) => s.name) ?? [],
  Kamis: groups[3]?.map((s) => s.name) ?? [],
  Jumat: groups[4]?.map((s) => s.name) ?? [],
}
