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
    description: "Tugas Kelompok Membuat Proposal Makanan Lauk.",
    status: "belum",
    tags: ["kelompok", "proposal"],
    assignedBy: "Ma'am Sari",
  },
]
