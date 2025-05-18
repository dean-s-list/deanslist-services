'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FooterMobile() {
  return (
    <div className="md:hidden text-[#FFFFFF]">
      {/* Top Logo */}
      <div className="mb-10 flex items-center gap-2 px-10">
        <Image src="/dean.png" alt="logo" width={28} height={28} />
        <span className="text-xl font-semibold">IslandDAO</span>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-between px-10">
        <nav>
          <ul className="flex flex-col space-y-5">
            <a href="#hero" className="hover:text-[#D896F7]">Home</a>
            <a href="#about-us" className="hover:text-[#D896F7]">About Us</a>
            <a href="#events" className="hover:text-[#D896F7]">Events</a>
            <a href="#services" className="hover:text-[#D896F7]">Services</a>
          </ul>
        </nav>

        <div>
          <ul className="flex flex-col space-y-5">
            <li>
              <Link href="/leaderboard" target="_blank" className="hover:text-gray-300">Leaderboard</Link>
            </li>
            <li>
              <a href="https://deans-list-docs.pages.dev/" target="_blank" className="hover:text-gray-300">Documentation</a>
            </li>
            <li>
              <a href="https://www.tensor.trade/trade/deanslist" target="_blank" className="hover:text-gray-300">NFT Store</a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="my-10">
        <div className="flex justify-center space-x-4 border-t border-[#002828] pt-10 pb-5">
          <a href="https://x.com/islanddao?s=21" target="_blank" className="hover:text-gray-300">
            <Image src="/twitter.png" alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://discord.gg/dvHrj9SXQS" target="_blank" className="hover:text-gray-300">
            <Image src="/discord.png" alt="Discord" width={24} height={24} />
          </a>
          <a href="https://github.com/dean-s-list" target="_blank" className="hover:text-gray-300">
            <Image src="/git.png" alt="GitHub" width={24} height={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center">&copy; {new Date().getFullYear()} IslandDAO. All rights reserved.</p>
      </div>
    </div>
  );
}
