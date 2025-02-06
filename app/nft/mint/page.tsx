"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import Confetti from "react-confetti";
import useUmiStore from "@/store/useUmiStore";
import { mintV1 } from "@metaplex-foundation/mpl-core-candy-machine";
import { publicKey as createPublicKey, some, sol, generateSigner, PublicKey, signerIdentity } from "@metaplex-foundation/umi";
import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { sendAndConfirmWithWalletAdapter } from "@/lib/umi/sendAndConfirmWithWalletAdapter";
import { WalletError, WalletNotConnectedError } from "@solana/wallet-adapter-base";

const Header = dynamic(() => import("../../components/NFTHeader"));

const candyMachineId = createPublicKey("FXSHzmwLw4LMyNCz52Q9K4wgyLvYbYPXtYTuSPvze3D5");
const coreCollection = createPublicKey("FfAAFtqAnCwdVWxfKx3mx5gEU1JpJPPhWcp1MGB5x7pR");
const destination = createPublicKey("GaKuQyYqJKNy8nN9Xf6VmYJQXzQDvvUHHc8kTeGQLL3f");

export default function MintPage() {
  const wallet = useWallet();
  const umi = useUmiStore.getState().umi;
  
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [nftData, setNftData] = useState({ image: null, name: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const fetchNFTMetadata = useCallback(async (assetPublicKey: PublicKey, retries = 10) => {
    for (let i = 0; i < retries; i++) {
      try {
        const assetData = await fetchAsset(umi, assetPublicKey);
        if (assetData.uri) {
          const response = await fetch(assetData.uri);
          if (!response.ok) throw new Error("Failed to fetch metadata");
          const json = await response.json();
          if (json.image) {
            setNftData({ image: json.image, name: assetData.name || json.name });
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 10000);
            setLoading(false);
            return;
          }
        }
      } catch {
        await new Promise(res => setTimeout(res, 3000));
      }
    }
    setError("Failed to fetch NFT metadata after multiple attempts");
    setLoading(false);
  }, [umi]);

  const handleMint = async () => {
    setLoading(true);
    setError(null);

    if (!wallet.connected || !wallet.publicKey) {
      setError("Please connect your wallet first");
      setLoading(false);
      return;
    }

    try {
      const asset = generateSigner(umi);
      const transactionBuilder = mintV1(umi, {
        candyMachine: candyMachineId,
        asset,
        collection: coreCollection,
        mintArgs: {
          solPayment: some({ lamports: sol(0.1), destination }),
        },
      });

      const signature = await sendAndConfirmWithWalletAdapter(transactionBuilder, umi, wallet);
      
      console.log("Minting successful with signature:", signature);

      await new Promise(resolve => setTimeout(resolve, 5000));
      fetchNFTMetadata(asset.publicKey);
    } catch (txError) {
      let errorMessage = "Failed to mint NFT. Please try again.";
      if (txError instanceof WalletNotConnectedError) errorMessage = "Wallet is not connected.";
      if (txError instanceof WalletError) errorMessage = `Wallet error: ${txError.message}`;
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] via-[#0C0223] to-[#0A0118] text-white">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} recycle={false} />}
      
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
                <h1 className="text-xl font-medium text-white">NFT Mint</h1>
                <p className="text-sm text-white/60 mt-1">Mint your exclusive NFTs</p>
              </div>
            </div>

            {!wallet.publicKey ? (
              <div className="flex items-center justify-center h-[300px] rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-md text-center px-6">
                  <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                    <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Connect Your Wallet</h2>
                  <p className="text-white/60">Connect your wallet using the button in the navigation bar to mint NFTs</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="text-center">
                    <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                      <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Mint Your NFT</h2>
                    <p className="text-white/60 max-w-md mx-auto mb-8">
                      Join the collection by minting your unique NFT
                    </p>
                    
                    <button
                      onClick={handleMint}
                      disabled={loading}
                      className={`w-full max-w-sm mx-auto py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        loading 
                          ? 'bg-white/5 cursor-not-allowed text-white/50' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25'
                      }`}
                    >
                      {loading ? "Minting..." : "Mint NFT"}
                    </button>

                    {error && (
                      <p className="mt-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg max-w-md mx-auto">
                        {error}
                      </p>
                    )}

                    {nftData.image && (
                      <div className="mt-8 w-full max-w-md mx-auto animate-fade-in">
                        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6">
                          <p className="text-xl font-bold text-green-400 mb-4">
                            {nftData.name || "NFT"} Minted Successfully! 🎉
                          </p>
                          <img 
                            src={nftData.image} 
                            alt="Minted NFT" 
                            className="rounded-lg w-full h-auto border border-white/10" 
                          />
                        </div>
                      </div>
                    )}
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
