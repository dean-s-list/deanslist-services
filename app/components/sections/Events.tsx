"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";

const Events = () => {
  return (
    <section className="py-20 relative text-white" id="events">
      <SectionHeader title="Events" isLeft={false} />

      {/* ===== Upcoming Event Section ===== */}
      <div className="md:text-center mb-12 px-5 md:px-0">
        <h2 className="text-4xl font-bold mb-4">
          Upcoming <span className="font-light font-editorial-new">Event</span>
        </h2>
        <p className="text-lg max-w-3xl mx-auto">
          Mark your calendars for the next big IslandDAO gathering!
        </p>
      </div>

      <div className="max-w-[1356px] mx-auto px-6 mb-20">
        <div className="border-[#FFC700] border-[2px] bg-gradient-to-br from-[#332600] via-[#FFDD6E] to-[#332600] rounded-lg p-6 shadow-lg flex flex-col gap-4 pb-5 md:pb-1">
          <div className="flex flex-col items-center">
            <h3 className="text-[20px] font-[600] md:mb-2">IslandDAOx 2025</h3>
            <p className="text-sm md:mb-4">A new wave of innovation is coming.</p>
          </div>

          <div className="relative w-full h-[214.11px] md:h-[308.41px] overflow-hidden rounded-md">
            <Image
              src="/images/events/islandevent2.png"
              alt="upcoming-event"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] md:gap-5 text-sm items-center">
            <p className="text-base md:mb-6 mb-2">
              This year&apos;s IslandDAOx will feature extended collaboration weeks, speaker sessions, and real-world DAO experiments — all on the beach! Happening Q4 2025.
            </p>
            <a
              href="https://x.com/islanddao/status/1932526787785089154"
              target="blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="bg-[#332600] px-3 py-2 rounded-full w-full md:w-fit h-fit hover:bg-yellow-600 transition shadow-2xl">
                Save the date!
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* ===== Past Events Section ===== */}
      <div className="md:text-center mb-12 px-5 md:px-0">
        <h2 className="text-4xl font-bold mb-4">
          Past <span className="font-light font-editorial-new">Events</span>
        </h2>
        <p className="text-lg max-w-3xl mx-auto">
          Stay informed on DAO events and relive past experiences from the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1356px] mx-auto px-6">
        {/* AthensDAOx Card */}
        <div className="border-[#3556F4] border-[2px] bg-gradient-to-br from-[#061295] to-[#9EA8D2] rounded-lg p-6 shadow-lg flex flex-col gap-4 pb-5 md:pb-1">
          <div className="flex flex-col items-center">
            <h3 className="text-[20px] font-[500] md:mb-2">AthensDAOx</h3>
            <p className="text-sm md:mb-4">Everything you need to know about the event.</p>
          </div>

          <Carousel className="w-full h-full">
            <CarouselContent>
              {["/images/events/athensevent0.png", "/images/events/athensevent1.png", "/images/events/athensevent2.png", "/images/events/athensevent3.png"].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative p-1 md:h-[308.41px] h-[214.11px] overflow-hidden rounded-md">
                    <Image src={src} alt={`athens-event-${index}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] text-sm items-center">
            <p className="text-base md:mb-6 mb-2">
              The community-run conference focused on DAOs and digital governance tools. Experience the highlights of AthensDAOx conference!
            </p>
            <a
              href="https://x.com/AthensDAOx?t=wzi42mLRmCfBXkTNOevt0w&s=08"
              className="w-full"
              target="blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#0A1494] px-3 py-2 rounded-full w-full md:w-fit hover:bg-blue-600 transition shadow-2xl shadow-[#1a2ad9]">
                Explore the fun!
              </button>
            </a>
          </div>
        </div>

        {/* IslandDAOx Past Card */}
        <div className="border-[#0B2223] border-[2px] bg-gradient-to-br from-[#061E1E] to-[#BFEAC5] rounded-lg p-6 shadow-lg flex flex-col gap-4 pb-5 md:pb-1">
          <div className="flex flex-col items-center">
            <h3 className="text-[20px] font-[500] md:mb-2">IslandDAOx</h3>
            <p className="text-sm md:mb-4">Everything you need to know about the event.</p>
          </div>

          <Carousel className="w-full h-full">
            <CarouselContent>
              {["/images/events/islandevent0.png", "/images/events/islandevent1.png", "/images/events/islandevent2.png", "/images/events/islandevent3.png", "/images/events/islandevent4.png"].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative p-1 md:h-[308.41px] h-[214.11px] overflow-hidden rounded-md">
                    <Image src={src} alt={`island-event-${index}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] md:gap-5 text-sm items-center">
            <p className="text-base md:mb-6 mb-2">
              A one-month co-working event on the Island. Experience the highlights of IslandDAOx live events!
            </p>
            <a href="https://x.com/islanddao?s=21" target="blank" rel="noopener noreferrer" className="w-full">
              <button className="bg-[#081E20] px-3 py-2 rounded-full w-full md:w-fit hover:bg-gray-600 transition">
                Explore the fun!
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
