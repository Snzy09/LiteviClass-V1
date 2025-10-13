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

const namesList = [
  "Abdurrahman Bagas Al Hafidz",
  "Aden Fathul Fatona",
  "Andea Christiani Hutagalung", 
  "Anggun Anggraini",
  "Anjas Marcellino",
  "Azzahra Salsabila Meysiandrey",
  "Chalista Teresya Winata",
  "Dinda Sri Hartaty",
  "Fabian Dwitya Azzam Niscal Nasution", 
  "Fairuz Salwa",
  "Fiana Dwi Aprilia",
  "Gebran Satria Mandala", 
  "Khumairah Oktaviani",
  "Kiara Anaya Syiefanny",
  "M.Ikhsan Candra Putra", 
  "M Raffi Al Misky",
  "Masayu Nafisah Hamzah",
  "M.Ardiansya Pratama",
  "Muhammad Fatir Syaldhan",
  "Muhammad Hasbi Al-as'ariy",
  "Nadine Fissilmi Kaffah",
  "Naurah Clarisya Putri Arini",
  "Nova Rosmalinda",
  "Raisya Aurellia",
  "Ratie Meitasari",
  "Salman Al Faritzy",
  "Sekar Anggun Ramadhani",
  "Seril Meilia",
  "Sinta Pertiwi", 
  "Tri Satria Simbolon",
  "Valiant Athaya Molisky",
  "Yeyen Apriani"
]

export const students: Student[] = namesList.map((name, index) => {
  const slug = slugify(name)
  return {
    id: index + 1,
    name,
    slug,
    skills: [baseSkills[index % baseSkills.length], "Git", "Problem Solving"],
    hobbies: [baseHobbies[index % baseHobbies.length], "Sports"],
    projects: [
      {
        title: `Portfolio ${name.split(" ")[0]}`,
        description: "Website pribadi sederhana (landing page)."
      },
      {
        title: `App ${name.split(" ")[0]}`,
        description: "Aplikasi kecil menggunakan React dan Tailwind."
      }
    ]
  }
})

export const allStudents = students

export function findStudentBySlug(slug: string) {
  return students.find((s) => s.slug === slug)
}
