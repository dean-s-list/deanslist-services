"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ThemeSwitcher } from "./themeSwitcher";
import { WalletButtonStyles } from "../WalletStyles";

const WalletMultiButtonDynamic = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const NAV_LINKS = [
  { href: "https://eligibility.deanslist.services/", label: "Eligibility" },
  { href: "/nft/mint", label: "Mint" },
  { href: "/nft/perks", label: "Perks" },
  { href: "/nft/roadmap", label: "Roadmap" },
  { href: "/nft/stats", label: "Stats" },
];

const NFTHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [currentLogo, setCurrentLogo] = useState("deanslist");

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Simple two-step transition
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const changeLogoTimer = setTimeout(() => {
      setCurrentLogo("island");
      // Small delay before showing new logo
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fadeOutTimer);
      clearTimeout(changeLogoTimer);
    };
  }, []);

  const logoSrc = currentLogo === "deanslist" ? "/logo.svg" : "/island.png";
  const logoAlt = currentLogo === "deanslist" ? "Deanslist Logo" : "IslandDAO Logo";
  const logoText = currentLogo === "deanslist" ? "DeanslistDAO" : "IslandDAO";

  // Apply different sizes based on which logo is showing
  const logoWidth = currentLogo === "deanslist" ? 40 : 60;
  const logoHeight = currentLogo === "deanslist" ? 30 : 40;


  return (
    <>
      <WalletButtonStyles />
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-300 ${isScrolled ? "h-16 shadow-md shadow-gray-200" : "h-20"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
          <Link href="/" className={`relative flex items-center h-10 ${isScrolled ? "opacity-80" : "opacity-100"} transition-opacity duration-300`}>
            <div className="relative w-16 h-10 flex items-center justify-center">
              <div className={`absolute transition-opacity duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className={`ml-2 transition-opacity duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
              <p className="text-lg object-contain">
                {logoText}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex gap-6 font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-gray-600 transition-all duration-200 ${pathname === href ? "font-semibold" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <WalletMultiButtonDynamic />
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-300 shadow-md">
            <nav className="flex flex-col items-center gap-4 py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-gray-600 transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
              <ThemeSwitcher />
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default NFTHeader;
