import { SiteHeader } from "@/components/site-header"
import { StudentGrid } from "@/components/student-grid"
import { StudentBrowser } from "@/components/student-browser"

export default function StudentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-3 pb-14 pt-8 sm:px-4 sm:pb-16 sm:pt-10">
        <header className="mb-5 sm:mb-6">
          <h1 className="text-balance text-3xl font-bold sm:text-4xl">Portofolio Siswa</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Kumpulan portofolio berisi skill, hobi, dan project masing-masing siswa.
          </p>
        </header>

        <section className="mb-5 sm:mb-6">
          <StudentBrowser />
        </section>

        <StudentGrid />
      </main>
    </>
  )
}
