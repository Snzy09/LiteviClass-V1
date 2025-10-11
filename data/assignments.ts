export type AssignmentStatus = "belum" | "proses" | "selesai"

export type Assignment = {
  id: string
  title: string
  subject: string
  dueDate: string // ISO date
  description?: string
  status: AssignmentStatus
  tags?: string[]
  assignedBy?: string
}

export const assignments: Assignment[] = [
  {
    id: "tgs-001",
    title: "Ringkasan Bab 3",
    subject: "Bahasa Indonesia",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Buat ringkasan 1 halaman tentang struktur teks eksposisi.",
    status: "belum",
    tags: ["ringkasan", "eksposisi"],
    assignedBy: "Bu Sari",
  },
  {
    id: "tgs-002",
    title: "Latihan Persamaan Kuadrat",
    subject: "Matematika",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Kerjakan nomor 1-20 dari lembar latihan yang dibagikan.",
    status: "proses",
    tags: ["aljabar", "latihan"],
    assignedBy: "Pak Dimas",
  },
  {
    id: "tgs-003",
    title: "Poster Kampanye Lingkungan",
    subject: "Seni Budaya",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Desain poster bertema pengurangan sampah plastik.",
    status: "belum",
    tags: ["poster", "lingkungan"],
    assignedBy: "Bu Rina",
  },
  {
    id: "tgs-004",
    title: "Presentasi P5",
    subject: "Projek P5",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Siapkan presentasi 5-7 menit per kelompok.",
    status: "selesai",
    tags: ["presentasi", "kelompok"],
    assignedBy: "Wali Kelas",
  },
]
