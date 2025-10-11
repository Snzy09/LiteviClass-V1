import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { students, findStudentBySlug } from "@/data/students"
import { Card } from "@/components/ui/card"
import { studentInstagram } from "@/data/student-socials"
import { Button } from "@/components/ui/button"
import { StudentCertificates } from "@/components/student-certificates"

export async function generateStaticParams() {
  return students.map((s) => ({ slug: s.slug }))
}

export default function StudentPortfolioPage({ params }: { params: { slug: string } }) {
  const student = findStudentBySlug(params.slug)
  if (!student) return notFound()

  const instagramUrl = studentInstagram[student.slug]

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-3 pb-14 pt-8 sm:px-4 sm:pb-16 sm:pt-10">
        <nav className="mb-5 text-sm sm:mb-6">
          <Link href="/students" className="text-muted-foreground hover:text-foreground">
            ← Kembali ke daftar siswa
          </Link>
        </nav>

        {/* Add local horizontal menu with anchors */}
        <nav className="overflow-x-auto mb-3">
          <ul className="flex w-max items-center gap-2 text-sm">
            <li>
              <a
                href="#projects"
                className="rounded-full border px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
              >
                Projects
              </a>
            </li>
            {student.certificates?.length ? (
              <li>
                
              </li>
            ) : null}
            <li>
              <a
                href="#skills"
                className="rounded-full border px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#hobbies"
                className="rounded-full border px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
              >
                Hobi
              </a>
            </li>
          </ul>
        </nav>

        <header className="mb-7 sm:mb-8">
          <div className="mb-4 h-16 w-16 rounded-2xl bg-secondary sm:h-20 sm:w-20" aria-hidden="true" />
          <h1 className="text-3xl font-bold sm:text-4xl">{student.name}</h1>
          <p className="text-sm text-muted-foreground">Litevi Class By : Aden , Ikhsan , Hasbi</p>
          {instagramUrl && (
            <div className="mt-3">
              <Button asChild size="sm" variant="secondary" aria-label={`Instagram ${student.name}`}>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
            </div>
          )}
        </header>

        <section className="grid gap-5 sm:gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Add id for projects anchor */}
            <h2 id="projects" className="mb-3 text-xl font-semibold">
              Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {student.projects.map((p, i) => (
                <Card key={i} className="rounded-xl border border-border/60 bg-card/60 p-4">
                  <div className="mb-3 h-36 w-full rounded-lg bg-secondary sm:h-40" aria-hidden="true" />
                  
                  <p className="text-sm text-muted-foreground mx-3 py-8 px-0 my-0">{p.description}</p>
                  {p.link && (
                    <a
                      href={p.link}
                      className="inline-block rounded-md bg-accent text-sm font-medium text-accent-foreground mt-3 py-1 px-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  )}
                </Card>
              ))}
            </div>

            {/* Render certificates section if available */}
            {student.certificates?.length ? (
              <div id="certificates" className="mt-8">
                <StudentCertificates certificates={student.certificates} />
              </div>
            ) : null}
          </div>

          <aside className="md:col-span-1">
            <Card className="rounded-xl border border-border/60 bg-card/60 p-4">
              {/* Add ids for menu anchors */}
              <h2 id="skills" className="mb-3 text-lg font-semibold mt-2 mr-4">
                Skills
              </h2>
              <div className="mb-5 flex flex-wrap gap-2 mt-2">
                {student.skills.map((s) => (
                  <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {s}
                  </span>
                ))}
              </div>

              <h2 id="hobbies" className="mb-3 text-lg font-semibold mt-2 mr-4 ml-5">
                Hobi
              </h2>
              <div className="flex flex-wrap gap-2 mx-2 my-3">
                {student.hobbies.map((h) => (
                  <span key={h} className="rounded-full bg-secondary px-3 py-1 text-xs">
                    {h}
                  </span>
                ))}
              </div>
            </Card>
          </aside>
        </section>
      </main>
    </>
  )
}
