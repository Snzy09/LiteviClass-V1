import { SiteHeader } from "@/components/site-header"
import AssignmentsList from "@/components/assignments-list"
import { assignments } from "@/data/assignments"

export const metadata = {
  title: "Tugas / PR",
  description: "Informasi tugas dan PR kelas—filter, cari, dan pantau tenggat.",
}

export default function AssignmentsPage() {
  return (
    <>
    <SiteHeader />
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight">Tugas / PR</h1>
      <AssignmentsList items={assignments} />
    </main>
    </>
  )
}
