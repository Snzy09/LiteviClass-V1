import { SiteHeader } from "@/components/site-header"
import { Schedule } from "@/components/schedule"
import { DutyRoster } from "@/components/duty-roster"
import ClassGallery from "@/components/class-gallery"
import TextType from "@/components/text-type"
import { Card, CardContent } from "@/components/ui/card"
import StudentBrowser from "@/components/student-browser"

export default function HomePage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-3 pb-12 pt-6 sm:px-4 sm:pb-16 sm:pt-10" id="top">
        <section className="mb-8 grid grid-cols-1 gap-6 sm:mb-10 md:grid-cols-2 md:gap-8">
          <div>
            <p className="text-sm text-muted-foreground">SMAN 2 sekayu</p>
            <TextType
              as="h1"
              className="text-pretty text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
              text={["Litevi Class", "Meta V1"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Wali Kelas: <span className="font-semibold">Maam Almi Ayu Anggraini</span>
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">Jumlah Siswa: 32</p>

            <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href="#jadwal"
                className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
              >
                Lihat Jadwal
              </a>
              <a
                href="/students"
                className="rounded-md bg-secondary px-4 py-2 text-center text-sm font-medium text-secondary-foreground"
              >
                Portofolio Siswa
              </a>
              <a
                href="#galeri"
                className="rounded-md border border-border bg-background px-4 py-2 text-center text-sm font-medium text-foreground"
              >
                Class Gallery
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-secondary/40 p-4 sm:p-6">
            <p className="text-sm text-muted-foreground">Aturan Kelas</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Uang Kas 2K/Minggu</li>
              <li>Buang Sampah Pada Tempatnya</li>
              <li>Piket Harian Sapu , Pel , Buang Sampah</li>
              <li>Melanggar Denda Rp 64.000 Atau Traktir Es Teh Sekelas</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 sm:mb-12" id="galeri">
          <Card className="overflow-hidden border border-border/60">
            <div className="flex items-center justify-between p-4 sm:p-6">
            </div>
            <CardContent className="px-2 pb-4 sm:pb-6">
              <ClassGallery />
            </CardContent>
          </Card>
        </section>

        <div className="space-y-8 sm:space-y-12">
          <section id="jadwal">
            <Card className="border border-border/60">
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">Jadwal Pelajaran</h2>
                <Schedule />
              </CardContent>
            </Card>
          </section>

          <section id="piket">
            <Card className="border border-border/60">
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">Piket Kelas</h2>
                <DutyRoster />
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border border-border/60">
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">Siswa</h2>
                <StudentBrowser />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <footer className="border-t border-border/60 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-3 text-center text-xs text-muted-foreground sm:px-4 sm:text-left sm:text-sm">
          © {new Date().getFullYear()} Litevi Class — By Aden | Ikhsan | Hasbi
        </div>
      </footer>
    </div>
  )
}
