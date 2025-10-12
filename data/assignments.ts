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
    title: "Kelompok PKWU Proposal",
    subject: "PKWU",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tugas Kelompok Membuat Proposal Penjualan Lauk.",
    status: "belum",
    tags: ["kelompok", "proposal"],
    assignedBy: "Ma'am Sari",
  },
  {
    id: "tgs-002",
    title: "Kelompok PPKN Swot",
    subject: "PPKN",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tugas Kelompok Tentang SWOT, Cek Di Buku PPKn.",
    status: "belum",
    tags: ["kelompok", "SWOT"],
    assignedBy: "Mis Amrilla",
  },
  {
    id: "tgs-003",
    title: "Kelompok Mulok",
    subject: "MULOK",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tugas Kelompok Tentang Pangan Lokal.",
    status: "belum",
    tags: ["kelompok", "Makalah"],
    assignedBy: "Sir Adi",
  },
]
