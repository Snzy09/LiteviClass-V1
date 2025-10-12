"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  // Replace with direct image links if these fail
  "https://img.pixhost.to/images/9359/650313225_1000519542.jpg",
  "https://img.pixhost.to/images/9359/650313202_1000541094.jpg",
  "https://img.pixhost.to/images/9359/650313187_1000569890.jpg",
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
                  src={src}
                  alt={`Class photo ${idx + 1}`}
                  className="h-[200px] w-full object-cover sm:h-[260px] md:h-[300px]"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg"
                  }}
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
