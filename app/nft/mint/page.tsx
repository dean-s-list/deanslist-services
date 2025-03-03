"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import Confetti from "react-confetti";
import useUmiStore from "@/store/useUmiStore";
import { mintV1 } from "@metaplex-foundation/mpl-core-candy-machine";
import { publicKey as createPublicKey, some, sol, generateSigner, PublicKey } from "@metaplex-foundation/umi";
import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { sendAndConfirmWithWalletAdapter } from "@/lib/umi/sendAndConfirmWithWalletAdapter";
import { WalletError, WalletNotConnectedError } from "@solana/wallet-adapter-base";
import Image from "next/image";

const Header = dynamic(() => import("../../components/NFTHeader"));

const candyMachineId = createPublicKey("FZhERBgmWu9fcmK4xtjEgkv9fW69AT3SxtmHfvF8MFKc");
const coreCollection = createPublicKey("5n3ECmNEzfsLq25F4Ls3Api83FRWtbpBfhFeGKDzkN5e");
const destination = createPublicKey("GaKuQyYqJKNy8nN9Xf6VmYJQXzQDvvUHHc8kTeGQLL3f");

//const START_DATE = new Date(Date.now() + 5000);
// const END_DATE = new Date("2025-03-03T18:00:00Z");

const START_DATE = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 22, 0, 0)); // 9 PM UTC today

const END_DATE = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 22, 30, 0)); // 9:30 PM UTC today

export default function MintPage() {
  const wallet = useWallet();
  const umi = useUmiStore.getState().umi;

  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [nftData, setNftData] = useState({ image: null, name: null });
  const [error, setError] = useState<string | null>(null);
  const [mintingStage, setMintingStage] = useState<'idle' | 'preparing' | 'minting' | 'confirming' | 'success'>('idle');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownType, setCountdownType] = useState<'start' | 'end' | 'none'>('start');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      // Determine if we should show start countdown, end countdown, or none
      if (now < START_DATE) {
        setCountdownType('start');
        const timeLeft = Math.max(0, START_DATE.getTime() - now.getTime());
        setCountdown({
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        });
      } else if (now < END_DATE) {
        setCountdownType('end');
        const timeLeft = Math.max(0, END_DATE.getTime() - now.getTime());
        setCountdown({
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        });
      } else {
        setCountdownType('none');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
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
            setMintingStage('success');
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
    setMintingStage('idle');
  }, [umi]);

  const handleMint = async () => {
    setLoading(true);
    setError(null);
    setMintingStage('preparing');

    if (!wallet.connected || !wallet.publicKey) {
      setError("Please connect your wallet first");
      setLoading(false);
      setMintingStage('idle');
      console.log("Wallet state:", wallet);
      return;
    }

    try {
      const asset = generateSigner(umi);
      setMintingStage('minting');

      // Retry logic for the first time simulation error
      let attempt = 0;
      let success = false;
      while (attempt < 2 && !success) {
        try {
          const transactionBuilder = mintV1(umi, {
            candyMachine: candyMachineId,
            asset,
            collection: coreCollection,
            mintArgs: {
              solPayment: some({
                lamports: sol(0.1),
                destination
              }),
            },
          });

          const { signature } = await sendAndConfirmWithWalletAdapter(
            transactionBuilder,
            umi,
            wallet,
            { commitment: "confirmed" }
          );

          console.log("Minting successful with signature:", signature);
          setMintingStage('confirming');
          await new Promise(resolve => setTimeout(resolve, 2000));
          fetchNFTMetadata(asset.publicKey);
          success = true;

        } catch (error) {
          attempt += 1;
          console.error("Simulation or minting error, attempt", attempt, error);

          if (attempt < 2) {
            // Retry logic: wait a few seconds before trying again
            await new Promise(resolve => setTimeout(resolve, 5000));
          } else {
            let errorMessage = "Failed to mint NFT after multiple attempts. Please try again.";
            if (error instanceof WalletNotConnectedError) errorMessage = "Wallet is not connected.";
            if (error instanceof WalletError) errorMessage = `Wallet error: ${error.message}`;
            setError(errorMessage);
            setLoading(false);
            setMintingStage('idle');
          }
        }
      }

    } catch (txError) {
      console.error("Minting error:", txError);
      let errorMessage = "Failed to mint NFT. Please try again.";
      if (txError instanceof WalletNotConnectedError) errorMessage = "Wallet is not connected.";
      if (txError instanceof WalletError) errorMessage = `Wallet error: ${txError.message}`;
      setError(errorMessage);
      setLoading(false);
      setMintingStage('idle');
    }
  };

  // Helper function to add leading zeros
  const formatTimeUnit = (unit: number) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  const renderCountdownDigit = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10 w-16 sm:w-20 md:w-24 text-center">
        {formatTimeUnit(value)}
      </div>
      <span className="text-xs sm:text-sm mt-1 text-white/60">{label}</span>
    </div>
  );

  const renderCountdownTimer = () => (
    <div className="animate-fade-in-up">
      <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
        {countdown.days > 0 && renderCountdownDigit(countdown.days, "Days")}
        {renderCountdownDigit(countdown.hours, "Hours")}
        {renderCountdownDigit(countdown.minutes, "Minutes")}
        {renderCountdownDigit(countdown.seconds, "Seconds")}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] via-[#0C0223] to-[#0A0118] text-white">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={false}
          colors={['#8B5CF6', '#EC4899', '#F472B6', '#A78BFA', '#C084FC']}
        />
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Header />

        <main className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-4">
          {countdownType === 'start' && (
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto text-center transform hover:scale-[1.02] transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="inline-block">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x pb-2">
                  Minting Starts Soon
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transform scale-x-0 animate-scale-x-full"></div>
              </div>
              <p className="text-lg text-white/60 mt-6 mb-2">Mark your calendar for:</p>
              <p className="text-xl font-semibold text-white mb-6">{START_DATE.toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>

              {renderCountdownTimer()}

              <div className="mt-8 flex justify-center">
                <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Get ready to mint your exclusive NFT</span>
                </div>
              </div>
            </div>
          )}

          {countdownType === 'none' && (
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Minting Has Ended</h1>
              <p className="text-xl text-white/60">Event closed on: {END_DATE.toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
            </div>
          )}

          {countdownType === 'end' && (
            <div>
              {/* Improved Timer Widget - Left Side with better positioning */}
              <div className="fixed left-4 top-24 z-50 lg:left-6">
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-4 w-48 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="inline-block w-full mb-2">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x pb-1">
                      Minting Ends In
                    </h2>
                    <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transform scale-x-0 animate-scale-x-full"></div>
                  </div>

                  <div className="my-3 grid grid-cols-4 gap-1">
                    {countdown.days > 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/10 flex flex-col items-center">
                        <span className="font-mono text-xl font-bold text-white">{countdown.days}</span>
                        <span className="text-xs text-white/60">days</span>
                      </div>
                    )}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/10 flex flex-col items-center">
                      <span className="font-mono text-xl font-bold text-white">{formatTimeUnit(countdown.hours)}</span>
                      <span className="text-xs text-white/60">hrs</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/10 flex flex-col items-center">
                      <span className="font-mono text-xl font-bold text-white">{formatTimeUnit(countdown.minutes)}</span>
                      <span className="text-xs text-white/60">min</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/10 flex flex-col items-center">
                      <span className="font-mono text-xl font-bold text-white">{formatTimeUnit(countdown.seconds)}</span>
                      <span className="text-xs text-white/60">sec</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-10">
                {/* Page Header */}
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-block">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x pb-2">
                      Mint Your NFT
                    </h1>
                    <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transform scale-x-0 animate-scale-x-full"></div>
                  </div>
                  <p className="text-lg text-white/60 mt-6 animate-fade-in-up delay-200">
                    Join the exclusive Dean&apos;s List collection by minting your unique NFT
                  </p>
                </div>

                {!wallet.publicKey ? (
                  <div className="flex items-center justify-center h-[400px] rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm animate-fade-in-up delay-300">
                    <div className="max-w-md text-center px-8">
                      <div className="mb-6 p-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 w-fit mx-auto ring-1 ring-white/10 animate-float">
                        <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up delay-400">Connect Your Wallet</h2>
                      <p className="text-lg text-white/60 animate-fade-in-up delay-500">Connect your wallet using the button in the navigation bar to start minting your NFTs</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-8 animate-fade-in-up delay-300">
                    {/* Main Minting Card */}
                    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-purple-500/20 transition-all duration-500 group">
                      <div className="text-center">
                        <div className="mb-6 p-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 w-fit mx-auto ring-1 ring-white/10 animate-float group-hover:scale-110 transition-transform duration-500">
                          {loading ? (
                            <div className="w-12 h-12 border-2 border-white/20 border-t-white/90 rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-12 h-12 text-white/60 group-hover:text-white/90 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">
                          {loading ? "Minting in Progress..." : "Ready to Mint?"}
                        </h2>
                        <p className="text-lg text-white/60 mb-4 group-hover:text-white/80 transition-colors duration-500">
                          {loading ? "Please wait while we create your NFT" : "Create your unique NFT and join the Dean&apos;s List collection"}
                        </p>

                        {/* Minting Stage Indicator */}
                        {loading && (
                          <div className="flex justify-center items-center gap-4 mb-6">
                            <div className={`flex items-center gap-2 ${mintingStage === 'preparing' ? 'text-purple-400' : 'text-white/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'preparing' ? 'bg-purple-400 animate-pulse' : 'bg-white/40'}`} />
                              <span className="text-sm">Preparing</span>
                            </div>
                            <div className="w-8 h-px bg-white/20" />
                            <div className={`flex items-center gap-2 ${mintingStage === 'minting' ? 'text-purple-400' : 'text-white/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'minting' ? 'bg-purple-400 animate-pulse' : 'bg-white/40'}`} />
                              <span className="text-sm">Minting</span>
                            </div>
                            <div className="w-8 h-px bg-white/20" />
                            <div className={`flex items-center gap-2 ${mintingStage === 'confirming' ? 'text-purple-400' : 'text-white/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'confirming' ? 'bg-purple-400 animate-pulse' : 'bg-white/40'}`} />
                              <span className="text-sm">Confirming</span>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={handleMint}
                          disabled={loading}
                          className={`group relative w-full max-w-sm mx-auto py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-500 ${loading
                            ? 'bg-white/5 cursor-not-allowed text-white/50'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] hover:-translate-y-0.5'
                            }`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? (
                              <>
                                <div className="relative">
                                  <div className="w-5 h-5 border-2 border-white/20 border-t-white/90 rounded-full animate-spin"></div>
                                </div>
                                <span>Minting...</span>
                              </>
                            ) : (
                              <>
                                <span>Mint NFT</span>
                                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></span>
                              </>
                            )}
                          </span>
                        </button>

                        {error && (
                          <div className="mt-6 animate-fade-in">
                            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="font-semibold">Error</span>
                              </div>
                              {error}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NFT Preview Card - Only shown after minting */}
                    {nftData.image && (
                      <div className="w-full max-w-2xl rounded-2xl border bg-white/5 backdrop-blur-sm transition-all duration-500 animate-slide-in-up border-green-500/20 shadow-lg shadow-green-500/20">
                        <div className="p-8">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 text-green-400">
                              <svg className="w-6 h-6 animate-bounce-gentle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="text-xl font-bold animate-fade-in">Minted Successfully!</h3>
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                              <Image
                                src={nftData.image}
                                alt={nftData.name || "Minted NFT"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="text-center transform hover:scale-[1.02] transition-all duration-500">
                              <h4 className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{nftData.name}</h4>
                              <p className="text-white/60 mt-2">Your new NFT has been minted to your wallet</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="relative py-6 text-center text-sm text-white/40">
          <p className="hover:text-white/60 transition-colors duration-300">© 2024 DeanslistDAO. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}