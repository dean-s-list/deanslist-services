import { perkData } from "@/app/data/perks-data"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DotButtons,
} from "@/components/ui/carousel-perk"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SectionHeader from "../ui/SectionHeader"

export default function Perks() {
  return (
    <div className="flex flex-col items-center relative">
      <div className="">
        <SectionHeader title="Perks" />
        <div className="md:text-center px-5 mt-16 my-12">
          <h2 className="text-4xl font-bold text-[#FFFFFF] ">
               <span className="font-editorial-new font-light">Perks </span>Collection!.
          </h2>
          <p className="text-[#FFFFFF] mt-4  mx-auto text-[20px]">
          Discover the 12 unique animals in the IslandDAO PERKS collection. Each animal grants specific <br />real-world benefits, from event access to governance boosts. Multiple NFTs stack for <br /> enhanced benefits.
          </p>
        </div>
      </div>

      <Card className="xl:w-[1275px] xl:max-w-[1275px]  md:max-w-[768px] sm:w-[768px] w-full    pt-0 border-none shadow-none relative mx-10 bg-transparent">
        <Carousel className="xl:w-[1275px] xl:max-w-[1275px]  md:max-w-[768px] sm:w-[768px] w-full     mx-auto border-none py-5">
          <CarouselContent>
            {perkData.map((perk, index) => (
              <CarouselItem key={index}>
                <Link href={perk.href}>
                  <PerksCard>

                    <div className="relative  flex items-center justify-center">
                      <div className="absolute w-28 top-0 left-1   h-40 rounded-full bg-white blur-xl  -rotate-45 opacity-5"></div>
                      <div className="absolute w-28 top-0 right-1   h-40 rounded-full bg-white blur-xl  rotate-45 opacity-5"></div>
                      <div className=" mx-auto w-fit ">
                        <Image src={perk.image} alt="Perk" width={116} height={116} />
                        <p className="text-center text-[#ABD6B3]">{perk.name}</p>
                      </div>
                    </div>
                    <div className="relative w-full  space-y-4 text-center  border-[#fff]  ">
                      <div className="bg-[#103E3E] blur-[2px] w-full absolute top-0 h-full"> </div>
                      <div className="absolute top-0 w-full  space-y-2">

                        <h2 className="text-preset-4 text-white">{perk.title}</h2>
                        <p className="max-w-[300px] text-wrap mx-auto text-[#C0C3CE] text-center text-preset-4-slim">{perk.descriptions}</p>
                      </div>
                    </div>
                  </PerksCard>
                </Link>

              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
          <DotButtons className="mt-4" />
        </Carousel>
      </Card>

      {/* ✅ Now automatically connected to carousel via context */}
    </div>
  )
}


export function PerksCard({ className, children, }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn("grid grid-rows-[60%_auto]", className, "  xl:h-[348.24px] md:h-[314.24px] h-[314.24px] w-full  xl:w-[421px] max-w-full rounded-xl bg-perkBg border border-perkBorder")}>
      {children}
    </div>
  )
}
