export type Project = { title: string; description: string; link?: string }
export type Student = {
  id: number
  name: string
  slug: string
  skills: string[]
  hobbies: string[]
  projects: Project[]
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
  2: "Aden Fathul Fatona", 
  3: "Andea Christiani Hutagalung", 
  4: "Anggun Anggraini",
  5: "Anjas Marcellino",
  6: "Azzahra Salsabila Meysiandrey",
  7: "Chalista Teresya Winata", 
  8: "Dinda Sri Hartaty", 
  9: "Fabian Dwitya Azzam Niscal Nasution", 
  10: "Fairuz Salwa",
  11: "Fiana Dwi Aprilia",
  12: "Gebran Satria Mandala", 
  13: "Khumairah Oktaviani",
  14: "Kiara Anaya Syiefanny",
  15: "M.Ikhsan Candra Putra", 
  16: "M Raffi Al Misky", 
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
  28: "Seril meilia", 
  29: "Sinta Pertiwi", 
  30: "Tri Satria Simbolon",
  31: "Valiant Athaya Molisky",
  32: "Yeyen apriani",
}

export const students: Student[] = Array.from({ length: 32 }, (_, i) => {
  const n = i + 1
  const num = String(students)
  return {
    id: n,
    name: `${namesMap}`,
    slug: `${namesMap}`,
    skills: [baseSkills[i % baseSkills.length], "Git", "Problem Solving"],
    hobbies: [baseHobbies[i % baseHobbies.length], "Sports"],
    projects: [
      { title: `Portfolio ${num}`, description: "Website pribadi sederhana (landing page)." },
      { title: `App ${num}`, description: "Aplikasi kecil menggunakan React dan Tailwind." },
    ],
  }
})

export const allStudents = students

export function findStudentBySlug(slug: string) {
  return students.find((s) => s.slug === slug)
}
