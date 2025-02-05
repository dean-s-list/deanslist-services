"use client";

import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const Header = dynamic(() => import("../../components/NFTHeader"));

export default function EligibilityPage() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] via-[#0C0223] to-[#0A0118] text-white">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Header />
        
        <main className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-4">
          <div className="flex flex-col gap-3">
            {/* Page Header */}
            <div className="flex justify-between items-center pb-3 mb-2 border-b border-white/10">
              <div>
                <h1 className="text-xl font-medium text-white">NFT Eligibility</h1>
                <p className="text-sm text-white/60 mt-1">Check your eligibility for NFT minting</p>
              </div>
            </div>

            {!publicKey ? (
              <div className="flex items-center justify-center h-[300px] rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-md text-center px-6">
                  <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                    <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Connect Your Wallet</h2>
                  <p className="text-white/60">Connect your wallet using the button in the navigation bar to check your eligibility</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="text-center">
                    <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                      <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Eligibility Check</h2>
                    <p className="text-white/60 max-w-md mx-auto">
                      The eligibility checking system is currently under development. Soon you'll be able to verify your eligibility for exclusive NFT mints!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="relative py-2 text-center text-xs text-white/40">
          <p>© 2024 DeanslistDAO. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 