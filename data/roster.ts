import { students } from "./students"
import { days, type Day } from "./schedule"

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))
  return res
}

// 32 siswa -> 5 hari. Distribusi 6-7 siswa per hari.
const groups = chunk(students, Math.ceil(students.length / days.length))

// Optional: gunakan data manual alih-alih mengambil dari `students`
// Set `useManualDuty = true` untuk memakai `manualDutyByDay`.
export const useManualDuty = false

// Jika ingin memasukkan nama manual, edit `manualDutyByDay`.
// Tipe Partial<Record<Day,string[]>> supaya Anda hanya perlu mengisi hari yang ingin di-override.
export const manualDutyByDay: Partial<Record<Day, string[]>> = {
  // Contoh manual (uncomment dan sesuaikan jika diperlukan):
  Senin: ["Ahmad Fadli"],
  Selasa: ["Ahmad Fadli"],
}

// Bangun dutyByDay akhir berdasarkan `useManualDuty` atau fallback ke pembagian otomatis.
export const dutyByDay: Record<Day, string[]> = days.reduce((acc, day) => {
  const autoGroupsIndex = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].indexOf(day)
  const autoValue = autoGroupsIndex >= 0 ? groups[autoGroupsIndex]?.map((s) => s.name) ?? [] : []
  acc[day] = useManualDuty ? (manualDutyByDay[day] ?? []) : autoValue
  return acc
}, {} as Record<Day, string[]>)
