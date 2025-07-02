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

      {/* === Application Banner === */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Applications for IslandDAO 3.0 are now open!
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          One month of the elite co-working experience for Solana builders.
          <br />
          <span className="text-[#CAEAD0] font-semibold">
            Sep 17 – Oct 17 2025, Mykonos, Greece.
          </span>
        </p>
        <a
          href="https://v3.islanddao.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gradient-to-r from-[#CFF7D7] to-[#6F8E75] text-black px-6 py-3 rounded-full shadow-md hover:opacity-90 transition">
            Apply Now! →
          </button>
        </a>
      </div>

      {/* === Event Highlights Section === */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="border border-[#BFF1C8] rounded-xl bg-gradient-to-b from-[#101D1D] to-[#0B1414] p-6 md:p-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold">IslandDAO Events.</h3>
            <p className="text-gray-400">Highlights from our previous events.</p>
          </div>

          {/* === Image Carousel === */}
          <Carousel>
            <CarouselContent>
              {[
                "/images/events/islandevent0.png",
                "/images/events/islandevent1.png",
                "/images/events/islandevent.png",
                "/images/events/islandevent3.png",
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[220px] md:h-[400px] overflow-hidden rounded-md">
                    <Image
                      src={src}
                      alt={`island-event-${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* === Description and YouTube Link === */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <p className="text-base text-center md:text-left text-gray-300">
              A one-month co-working event on the Island. Experience the <br />
              highlights of IslandDAOx lives event presented by IslandDAO.
            </p>
            <a
              href="https://youtube.com/@IslandDAO"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#CAEAD0] text-black px-4 py-2 border border-[#0C3B3B] rounded-full hover:bg-[#CAEAC0] transition">
                Youtube Channel →
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
