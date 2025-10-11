export type Project = { title: string; description: string; link?: string }
export type Student = {
  id: number
  name: string
  slug: string
  skills: string[]
  hobbies: string[]
  projects: Project[]
  certificates?: Certificate[]
}

export type Certificate = {
  title: string
  issuer?: string
  date?: string
  link?: string
}

const baseSkills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX"] as const

const baseHobbies = ["Gaming", "Coding", "Music", "Design", "Reading"] as const

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

const namesMap: Record<number, string> = {
  1: "Abdurrahman Bagas Al Hafidz",
  4: "Anggun Anggraini",
  5: "Anjas Marcellino",
  6: "Azzahra Salsabila Meysiandrey",
  10: "Fairuz Salwa",
  11: "Fiana Dwi Aprilia",
  13: "Khumairah Oktaviani",
  14: "Kiara Anaya Syiefanny",
  17: "Masayu Nafisah Hamzah",
  18: "M.Ardiansya Pratama",
  19: "Muhammad Fatir Syaldhan",
  20: "Muhammad Hasbi Al-as'ariy",
  21: "Nadine Fissilmi Kaffah",
  22: "Naurah Clarisya Putri Arini",
  23: "Nova Rosmalinda",
  24: "Raisya Aurellia",
  25: "Ratie Meitasari",
  26: "Salman Al Faritzy",
  27: "Sekar Anggun Ramadhani",
  30: "Tri Satria Simbolon",
  31: "Valiant Athaya Molisky",
  32: "Yeyen apriani",
}

export const students: Student[] = Array.from({ length: 32 }, (_, i) => {
  const n = i + 1
  const num = String(n).padStart(2, "0")
  return {
    id: n,
    name: `Siswa ${num}`,
    slug: `siswa-${num}`,
    skills: [baseSkills[i % baseSkills.length], "Git", "Problem Solving"],
    hobbies: [baseHobbies[i % baseHobbies.length], "Sports"],
    projects: [
      { title: `Portfolio ${num}`, description: "Website pribadi sederhana (landing page)." },
      { title: `App ${num}`, description: "Aplikasi kecil menggunakan React dan Tailwind." },
    ],
  }
})

for (const [idxStr, fullName] of Object.entries(namesMap)) {
  const idx = Number(idxStr) - 1
  if (students[idx]) {
    students[idx].name = fullName
    students[idx].slug = slugify(fullName)
  }
}

const ikhsan: Student & { certificates?: Certificate[] } = {
  id: students.length + 1,
  name: "M. Ikhsan C.P",
  slug: slugify("M. Ikhsan C.P"),
  skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
  hobbies: ["Coding", "Design", "Gaming"],
  projects: [
    {
      title: "Portfolio – Litevi Class",
      description: "Situs portofolio pribadi dengan landing page responsif dan dark mode.",
      link: "#",
    },
    {
      title: "Class App",
      description: "Aplikasi kelas sederhana (Next.js + Tailwind) untuk informasi siswa dan jadwal.",
      link: "#",
    },
  ],
  certificates: [
    {
      title: "Front-End Web Development",
      issuer: "Dicoding",
      date: "2024-08",
      link: "https://example.com/certificate/dicoding-frontend",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2024-05",
      link: "https://example.com/certificate/fcc-rwd",
    },
  ],
}

students.push(ikhsan)

export const allStudents = students

export function findStudentBySlug(slug: string) {
  return students.find((s) => s.slug === slug)
}
