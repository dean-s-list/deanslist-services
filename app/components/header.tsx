'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";
import { ThemeSwitcher } from "./themeSwitcher";

const NFTHeader = dynamic(() => import("./NFTHeader"));

const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletButton = dynamic(
  () => import('./WalletButton'),
  { ssr: false }
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isNFTPage = pathname.startsWith('/nft');

  if (isNFTPage) {
    return <NFTHeader />;
  }

  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const headerElement = document.getElementById('head');
    if (headerElement) {
      headerElement.classList.toggle('bg-[#814D9A1A]');
    }
  };

  return (
    <div id="nav">
      <header id="head" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0A0118]/80 to-transparent backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              Dean&apos;s List
            </Link>
            <div className="flex items-center gap-4">
              <WalletButton />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;