"use client"
// import Autoplay from "embla-carousel-autoplay"
import * as React from "react"
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react"
import { cn } from "@/lib/utils"
import Image from "next/image"


import Autoplay from 'embla-carousel-autoplay';



// Context to share emblaApi
type CarouselContextType = {
  embla: UseEmblaCarouselType[1] | null
}
const CarouselContext = React.createContext<CarouselContextType | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within <Carousel>")
  }
  return context
}

// Root
export function Carousel({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
   const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }) // 3s delay
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 'auto', align: 'center' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [autoplay.current as any || Autoplay() as any]
  )
  return (
    <CarouselContext.Provider value={{ embla: emblaApi }}>
      <div className={cn("relative overflow-hidden", className)} ref={emblaRef}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

// Content wrapper
export function CarouselContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex", className)}>{children}</div>
}

// Item (fit 3 slides per view)
export function CarouselItem({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-w-[270px] shrink-0 grow-0 basis-2/3", " md:basis-1/2 xl:basis-1/3", className)}>
      {children}
    </div>
  )
}

// Previous button
export function CarouselPrevious({ className }: { className?: string }) {
  const { embla } = useCarousel()
  return (
    <button
      onClick={() => embla?.scrollPrev()}
      className={cn("absolute top-1/2 left-4 -translate-y-1/2  text-white  z-50", className)}
    >
      
     <Image src="/previousbtn.svg" alt="arrow-left" width={24} height={24}/>
    </button>
  )
}

// Next button
export function CarouselNext({ className }: { className?: string }) {
  const { embla } = useCarousel()
  return (
    <button
      onClick={() => embla?.scrollNext()}
      className={cn("absolute top-1/2 right-4 -translate-y-1/2", className)}
    >
          <Image src="/nextbtn.svg" alt="arrow-left" width={24} height={24}/>

    </button>
  )
}

// Dot buttons
export function DotButtons({ className }: { className?: string }) {
  const { embla } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!embla) return
    setScrollSnaps(embla.scrollSnapList())
    setSelectedIndex(embla.selectedScrollSnap())
    embla.on("select", () => setSelectedIndex(embla.selectedScrollSnap()))
  }, [embla])

  if (!embla) return null

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {scrollSnaps.map((_, idx) => (
        <button
          key={idx}
          onClick={() => embla.scrollTo(idx)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            idx === selectedIndex ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}
