// scripts/generate-student-configs.js
// Script untuk generate template config untuk semua siswa

const fs = require('fs').promises
const path = require('path')

// List nama siswa (copy dari data/students.ts)
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

// Fungsi untuk slugify nama
function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

// Template config
function createConfigTemplate(name, slug) {
  const firstName = name.split(" ")[0]
  return {
    "$comment": `Config untuk ${name}. Edit file ini untuk customize profile.`,
    "profilePhoto": `${slug}.jpeg`,
    "bio": `Siswa kelas Litevi Class SMAN 2 Sekayu.`,
    "customSkills": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "customHobbies": [
      "Reading",
      "Sports"
    ],
    "customProjects": [
      {
        "title": `Portfolio ${firstName}`,
        "description": "Website portfolio pribadi sederhana.",
        "image": `${slug}-portfolio.jpeg`
      }
    ],
    "socialLinks": {
      "instagram": "",
      "github": "",
      "linkedin": "",
      "portfolio": ""
    }
  }
}

async function setupDirectories() {
  const dirs = [
    path.join(process.cwd(), 'public', 'config', 'students'),
    path.join(process.cwd(), 'public', 'profil'),
    path.join(process.cwd(), 'public', 'project')
  ]

  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true })
      console.log(`✅ Created directory: ${dir}`)
    } catch (error) {
      console.log(`⚠️  Directory already exists: ${dir}`)
    }
  }
}

async function generateConfigs() {
  console.log('🚀 Starting student config generation...\n')
  
  await setupDirectories()
  
  const configDir = path.join(process.cwd(), 'public', 'config', 'students')
  let created = 0
  let skipped = 0

  for (const name of namesList) {
    const slug = slugify(name)
    const configPath = path.join(configDir, `${slug}.json`)
    
    try {
      // Check if file already exists
      await fs.access(configPath)
      console.log(`⏭️  Skipped (exists): ${slug}.json`)
      skipped++
    } catch {
      // File doesn't exist, create it
      const config = createConfigTemplate(name, slug)
      await fs.writeFile(
        configPath, 
        JSON.stringify(config, null, 2),
        'utf-8'
      )
      console.log(`✨ Created: ${slug}.json`)
      created++
    }
  }

  console.log('\n📊 Summary:')
  console.log(`   ✅ Created: ${created} files`)
  console.log(`   ⏭️  Skipped: ${skipped} files`)
  console.log(`   📁 Total students: ${namesList.length}`)
  console.log('\n✅ Done! Check public/config/students/ for generated configs.')
  console.log('\n📝 Next steps:')
  console.log('   1. Edit JSON files to customize each student profile')
  console.log('   2. Add profile photos to public/profil/')
  console.log('   3. Add project photos to public/project/')
}

// Run the script
generateConfigs().catch(console.error)

// Export untuk bisa diimport
module.exports = { generateConfigs, slugify, createConfigTemplate }
