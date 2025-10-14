export type Student = { id: string; name: string }
export type Teacher = { id: string; name: string; subject?: string }

export type ClassConfig = {
  schoolName: string
  className: string
  footerText?: string
  instagramUrl?: string
  students?: Student[]
  teachers?: Teacher[]
  // you can extend this type later as needed
}

export const defaultClassConfig: ClassConfig = {
  schoolName: "SMAN 2 Sekayu",
  className: "Litevi Class",
  footerText: "Sponsored By : KT ( Komunitas Telentang )",
  instagramUrl: "https://instagram.com/litevi.itclass",
}
