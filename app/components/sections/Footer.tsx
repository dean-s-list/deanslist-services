"use client";
import Link from "next/link";

function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto hidden md:block text-[#FFFFFF] p-6 sm:p-16 ">
      {/* Top Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-10 space-y-6 sm:space-y-0">
        {/* Top left content */}
        <div className="flex items-center justify-center sm:justify-start">
          <img src="dean.png" alt="DeansListDAO Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-bold">IslandDAO</span>
        </div>

        {/* Top middle content */}
        <nav className="flex flex-col sm:flex-row text-center sm:space-x-4 gap-3 sm:gap-7">
          <a href="#hero" className="hover:text-gray-300">Home</a>
          <a href="#services" className="hover:text-gray-300">Services</a>
          <a href="#about-us" className="hover:text-gray-300">About Us</a>
          <a href="#events" className="hover:text-gray-300">Events</a>
          <Link href="/leaderboard" target="_blank" className="hover:text-gray-300">Leaderboard</Link>
        </nav>

        {/* Top right content */}
        <div className="flex justify-center space-x-4 ">
          <a href="https://x.com/islanddao?s=21" target="blank" className="hover:text-gray-300 ">
            <img src="twitter.png" alt="Twitter" className="w-6 h-6 " />
          </a>
          <a href="https://discord.gg/dvHrj9SXQS" target="blank" className="hover:text-gray-300">
            <img src="discord.png" alt="Discord" className="w-6 h-6" />
          </a>
          <a href="https://github.com/dean-s-list" target="blank" className="hover:text-gray-300">
            <img src="git.png" alt="GitHub" className="w-6 h-6" />
          </a>
        </div>
      </div>

      <hr className="border-t border-[#002828] my-4 xl:mb-10" />

      {/* Base content */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row text-center sm:space-x-4 space-y-3 sm:space-y-0">
          <a href="https://deans-list-docs.pages.dev/" className="hover:text-gray-300" target="blank">Documentation</a>
          <a href="https://www.tensor.trade/trade/deanslist" target="blank" className="hover:text-gray-300">NFT Store</a>
          <Link href="privacy" className="hover:text-gray-300">Privacy</Link>
        </div>
        <p className="text-center">&copy; {new Date().getFullYear()} IslandDAO. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
