export type Subject = { time: string; name: string; teacher?: string }

export const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] as const
export type Day = (typeof days)[number]

export const weeklySchedule: Record<Day, Subject[]> = {
  Senin: [
    { time: "Sesi 1", name: "PAI" },
    { time: "Sesi 2", name: "PAI" },
    { time: "Sesi 3", name: "Istirahat" },
    { time: "Sesi 4", name: "PAI" },
    { time: "Sesi 5", name: "MTK WAJIB" },
    { time: "Sesi 6", name: "MTK WAJIB" },
    { time: "Sesi 7", name: "Ishoma" },
    { time: "Sesi 8", name: "BIOLOGI" },
    { time: "Sesi 9", name: "B. INDONESIA" },
    { time: "Sesi 10", name: "B. INDONESIA" },
  ],
  Selasa: [
    { time: "Sesi 1", name: "MTK TL" },
    { time: "Sesi 2", name: "MTK TL" },
    { time: "Sesi 3", name: "Istirahat" },
    { time: "Sesi 4", name: "B. INDONESIA" },
    { time: "Sesi 5", name: "B. INDONESIA" },
    { time: "Sesi 6", name: "MULOK" },
    { time: "Sesi 7", name: "MULOK" },
    { time: "Sesi 8", name: "Ishoma" },
    { time: "Sesi 9", name: "SENBUD" },
    { time: "Sesi 10", name: "SENBUD" },
    { time: "Sesi 11", name: "PPKN" },
    { time: "Sesi 12", name: "PPKN" },
  ],
  Rabu: [
    { time: "Sesi 1", name: "PJOK" },
    { time: "Sesi 2", name: "PJOK" },
    { time: "Sesi 3", name: "Istirahat" },
    { time: "Sesi 4", name: "PJOK" },
    { time: "Sesi 5", name: "SEJARAH" },
    { time: "Sesi 6", name: "SEJARAH" },
    { time: "Sesi 7", name: "INFORMATIKA" },
    { time: "Sesi 8", name: "Ishoma" },
    { time: "Sesi 9", name: "INFORMATIKA" },
    { time: "Sesi 10", name: "INFORMATIKA" },
    { time: "Sesi 11", name: "FISIKA TL" },
    { time: "Sesi 12", name: "FISIKA TL" },
  ],
  Kamis: [
    { time: "Sesi 1", name: "MTK TL" },
    { time: "Sesi 2", name: "MTK TL" },
    { time: "Sesi 3", name: "Istirahat" },
    { time: "Sesi 4", name: "MTK TL" },
    { time: "Sesi 5", name: "FISIKA TL" },
    { time: "Sesi 6", name: "Ishoma" },
    { time: "Sesi 7", name: "BK" },
    { time: "Sesi 8", name: "B.INGGRIS" },
    { time: "Sesi 9", name: "B.INGGRIS" },
    { time: "Sesi 10", name: "B.INGGRIS" },
  ],
  Jumat: [
    { time: "Sesi 1", name: "MTK WAJIB" },
    { time: "Sesi 2", name: "MTK WAJIB" },
    { time: "Sesi 3", name: "Istirahat" },
    { time: "Sesi 4", name: "INFORMATIKA" },
    { time: "Sesi 5", name: "INFORMATIKA" },
    { time: "Sesi 6", name: "BIOLOGI" },
    { time: "Sesi 7", name: "Ishoma" },
    { time: "Sesi 8", name: "BIOLOGI" },
    { time: "Sesi 9", name: "BIOLOGI" },
    { time: "Sesi 10", name: "PKWU" },
    { time: "Sesi 11", name: "PKWU" },
  ],
}

export function getTodayDayName(date = new Date()): Day {
  const map = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] as const
  const d = map[date.getDay()]
  return (days.includes(d as Day) ? (d as Day) : "Senin") as Day
}
