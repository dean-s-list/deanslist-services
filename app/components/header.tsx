"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";
import { WalletButtonStyles } from "../WalletStyles";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <WalletButtonStyles />
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        className
      } backdrop-blur-md border-b border-purple-500/10`}>
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold text-white">DeansList</span>
            </Link>
          </div>

          {/* Centered Navigation Section */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center gap-8 text-base font-medium text-white">
              <Link 
                href="/nft/eligibility" 
                className={`group relative px-4 py-2 transition-all duration-300 hover:text-purple-300 ${
                  pathname === '/nft/eligibility' 
                    ? 'text-purple-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-purple-300 after:rounded-full after:shadow-glow-sm'
                    : 'hover:text-purple-300'
                }`}
              >
                Eligibility
                <span className="absolute inset-x-0 -bottom-px h-px w-0 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/nft/mint" 
                className={`group relative px-4 py-2 transition-all duration-300 hover:text-purple-300 ${
                  pathname === '/nft/mint' 
                    ? 'text-purple-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-purple-300 after:rounded-full after:shadow-glow-sm'
                    : 'hover:text-purple-300'
                }`}
              >
                Mint
                <span className="absolute inset-x-0 -bottom-px h-px w-0 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/nft/stats" 
                className={`group relative px-4 py-2 transition-all duration-300 hover:text-purple-300 ${
                  pathname === '/nft/stats' 
                    ? 'text-purple-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-purple-300 after:rounded-full after:shadow-glow-sm'
                    : 'hover:text-purple-300'
                }`}
              >
                Stats
                <span className="absolute inset-x-0 -bottom-px h-px w-0 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="transition-all duration-300 hover:scale-[1.02] transform-gpu">
              <WalletMultiButton />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                  } 
                  className="transition-all duration-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-[300px] opacity-100 border-b border-purple-500/10" 
              : "max-h-0 opacity-0 pointer-events-none"
          } bg-neutral-900/90 backdrop-blur-md`}
        >
          <nav className="flex flex-col items-center gap-4 py-6">
            <Link 
              href="/nft/eligibility" 
              className={`px-4 py-2 transition-all duration-300 ${
                pathname === '/nft/eligibility' 
                  ? 'text-purple-300' 
                  : 'text-white hover:text-purple-300'
              }`}
            >
              Eligibility
            </Link>
            <Link 
              href="/nft/mint" 
              className={`px-4 py-2 transition-all duration-300 ${
                pathname === '/nft/mint' 
                  ? 'text-purple-300' 
                  : 'text-white hover:text-purple-300'
              }`}
            >
              Mint
            </Link>
            <Link 
              href="/nft/stats" 
              className={`px-4 py-2 transition-all duration-300 ${
                pathname === '/nft/stats' 
                  ? 'text-purple-300' 
                  : 'text-white hover:text-purple-300'
              }`}
            >
              Stats
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}