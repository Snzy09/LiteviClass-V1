"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  "/gallery1.jpeg"
  "/gallery2.jpeg", 
  "/gallery3.jpeg",
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
                  src={src || "/gallery1.jpeg"}
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
