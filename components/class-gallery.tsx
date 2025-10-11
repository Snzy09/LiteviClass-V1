"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const images = [
  "https://firebasestorage.googleapis.com/v0/b/project-web-kelas.appspot.com/o/GambarAman%2FWhatsApp%20Image%202023-06-22%20at%2009.18.12.jpeg?alt=media&token=301ac142-3335-49e3-833c-a56c1d9223ae",
  "https://firebasestorage.googleapis.com/v0/b/project-web-kelas.appspot.com/o/GambarAman%2FWhatsApp%20Image%202023-08-30%20at%2023.11.07.jpeg?alt=media&token=5aa1f61d-2271-49d7-950d-08955fdb03b2",
  "https://firebasestorage.googleapis.com/v0/b/project-web-kelas.appspot.com/o/GambarAman%2FWhatsApp%20Image%202023-10-19%20at%2008.47.55.jpeg?alt=media&token=4852929b-ea75-4281-a915-56f11f13ee49",
  "https://firebasestorage.googleapis.com/v0/b/project-web-kelas.appspot.com/o/GambarAman%2Fhari_guru.jpg?alt=media&token=0339961f-af42-49e9-af0b-aef090138d53",
]

export default function ClassGallery() {
  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="gap-3 sm:gap-6">
          {images.map((src, idx) => (
            <CarouselItem key={src} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-lg bg-muted/30 sm:rounded-xl">
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Class photo ${idx + 1}`}
                  className="h-[200px] w-full object-cover sm:h-[260px] md:h-[300px]"
                  crossOrigin="anonymous"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:-left-12" />
        <CarouselNext className="right-2 sm:-right-12" />
      </Carousel>
    </div>
  )
}
