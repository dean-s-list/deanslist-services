"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import Confetti from "react-confetti";
import useUmiStore from "@/store/useUmiStore";
import { DefaultGuardSetMintArgs, fetchCandyMachine, getMerkleProof, getMerkleRoot, mintV1, route, safeFetchCandyGuard } from "@metaplex-foundation/mpl-core-candy-machine";
import { publicKey as createPublicKey, sol, generateSigner, PublicKey } from "@metaplex-foundation/umi";
import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { sendAndConfirmWithWalletAdapter } from "@/lib/umi/sendAndConfirmWithWalletAdapter";
import Image from "next/image";
import base58 from "bs58";
import candyjson from "../candy.json"
import { SolAmount } from "@metaplex-foundation/js";

interface SolPayment {
  lamports: SolAmount;
  destination: PublicKey;
}

interface AllowList {
  merkleRoot: Uint8Array;
}

interface MintArgs {
  solPayment: SolPayment;
  allowList?: AllowList; // Optional field
  group?: string | null; // Optional field
}

const Header = dynamic(() => import("../../components/NFTHeader"));

const candyMachineId = createPublicKey("5QAvMBEKtY4CoxLDJzFUdcusZWNjTeQ2AES1tZ2cc5LU");
const coreCollection = createPublicKey("5n3ECmNEzfsLq25F4Ls3Api83FRWtbpBfhFeGKDzkN5e");
const destination = createPublicKey("GaKuQyYqJKNy8nN9Xf6VmYJQXzQDvvUHHc8kTeGQLL3f");
const candyGuardId = createPublicKey("AqaR7wdw4NeSwr92HN5bYyqjsxgSsmeVmVpSZoBQGRCk")

// Set fixed UTC dates
const START_DATE = new Date(Date.UTC(2025, 3, 15, 12, 0, 0)); // April 1, 2025, 20:00 UTC
const END_DATE = new Date(Date.UTC(2025, 3, 30, 12, 0, 0));  // April 10, 2025, 20:00 UTC


const MINT_PHASES = [
  {
    id: 1,
    name: "Genesis Collection",
    supply: 1114,
    startDate: "2025-04-01T10:00:00Z",
    endDate: "2025-04-15T22:00:00Z",
    status: "completed"
  },
  {
    id: 2,
    name: "Island Collection",
    supply: 1111,
    startDate: "2025-06-15T15:00:00Z",
    endDate: "2025-07-01T22:00:00Z",
    status: "upcoming"
  },
  {
    id: 3,
    name: "Final Collection",
    supply: 1111,
    startDate: "2025-10-01T15:00:00Z",
    endDate: "2025-10-15T22:00:00Z",
    status: "planned"
  }
];

export default function MintPage() {
  const wallet = useWallet();
  const umi = useUmiStore.getState().umi;

  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [nftData, setNftData] = useState({ image: null, name: null });
  const [error, setError] = useState(null);
  const [mintingStage, setMintingStage] = useState('idle');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownType, setCountdownType] = useState('start');

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
            setMintingStage('confirming');
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
    setLoading(false);
    setMintingStage('idle');
  }, [umi]);

  const handleMint = async () => {
    setLoading(true);
    setError(null);
    setMintingStage('preparing');

    if (!wallet.connected || !wallet.publicKey) {
      setLoading(false);
      setMintingStage('idle');
      console.log("Wallet state:", wallet);
      return;
    }

    try {
      const allowList = candyjson;
      const asset = generateSigner(umi);

      // Retry logic for the first time simulation error
      let attempt = 0;
      let success = false;
      while (attempt < 2 && !success) {
        try {
          setMintingStage('whitelist');
          let whitelist = false;

          // Check if candymachine has whitelist
          const candyMachineData = await fetchCandyMachine(umi, candyMachineId)
          const guard = await safeFetchCandyGuard(umi, candyMachineData.mintAuthority)

          if (guard && guard.guards.allowList.__option === 'Some') {
            // Extract the Merkle Root Uint8Array safely
            const merkleRootUint8Array = guard.guards.allowList.value.merkleRoot;

            // Convert to Base58 (Solana-style string)
            const merkleRootBase58 = merkleRootUint8Array;

            console.log("Allowlist Merkle Root (Base58):", merkleRootBase58);
            whitelist = true;
          } else { whitelist = false }

          if (whitelist) {
            const merkleroot = getMerkleRoot(allowList);

            // Verify wallet is in allowlist
            const isWalletAllowed = allowList.includes(wallet.publicKey.toBase58());
            if (!isWalletAllowed) {
              throw new Error('Wallet not in allowlist');
            } else {
              console.log("Wallet is allowed: ", wallet.publicKey.toBase58());
            }

            const merkleProof = getMerkleProof(allowList, umi.identity.publicKey);

            console.log('Merkle Root:', base58.encode(merkleroot));
            console.log('Merkle Proof Length:', merkleProof.length);

            // Route transaction to check whitelist
            const routeTransaction = route(umi, {
              candyMachine: candyMachineId,
              candyGuard: candyGuardId,
              guard: 'allowList',
              routeArgs: {
                path: 'proof',
                merkleRoot: merkleroot,
                merkleProof: merkleProof,
              },
            });

            // Send and log route transaction
            const routeResult = await sendAndConfirmWithWalletAdapter(
              routeTransaction,
              umi,
              wallet,
              { commitment: "confirmed" }
            );
            console.log('Route Transaction Signature:', routeResult);
          } else { console.log("Whitelist not enabled") }

          setMintingStage('minting');

          // Base mint arguments
          const mintArgs: MintArgs = {
            solPayment: {
              lamports: {
                basisPoints: sol(0.1).basisPoints,
                currency: {
                  symbol: "SOL",
                  decimals: 9
                }
              },
              destination: destination, // Ensure this is a PublicKey
            },
          };

          // Conditionally add allowList if whitelist is enabled
          if (whitelist) {
            const merkleroot = getMerkleRoot(allowList);
            mintArgs.allowList = {
              merkleRoot: merkleroot,
            };
          }

          // Mint transaction
          const transactionBuilder = mintV1(umi, {
            candyMachine: candyMachineId,
            asset,
            collection: coreCollection,
            mintArgs: mintArgs as unknown as Partial<DefaultGuardSetMintArgs>,
          });

          const { signature } = await sendAndConfirmWithWalletAdapter(
            transactionBuilder,
            umi,
            wallet,
            { commitment: "confirmed" }
          );

          console.log("Minting successful with signature:", signature);
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
            setLoading(false);
            setMintingStage('idle');
          }
        }
      }

    } catch (txError) {
      console.error("Minting error:", txError);
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
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-white/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/40 w-12 sm:w-16 md:w-20 text-center">
        {formatTimeUnit(value)}
      </div>
      <span className="text-xs sm:text-sm mt-1 text-green-700">{label}</span>
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
    <div className="min-h-screen bg-gradient-to-b from-white via-green-100 to-white">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={false}
          colors={['#4CAF50', '#81C784', '#A5D6A7']}
        />
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl bg-green-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8">
          {countdownType === 'start' && (
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl border border-white/40 shadow-lg p-8 max-w-2xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold pb-2">
                Minting Starts Soon
              </h1>
              <div className="h-1 w-32 bg-green-600 rounded-full mx-auto mb-6"></div>

              <p className="text-lg text-black/80 mt-6 mb-2">Mark your calendar for:</p>
              <p className="text-xl font-semibold mb-6">{START_DATE.toLocaleString(undefined, {
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
                <div className="px-6 py-3 rounded-lg bg-white/60 border border-white/40 inline-flex items-center gap-2 shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Get ready to mint your exclusive NFT</span>
                </div>
              </div>
            </div>
          )}

          {countdownType === 'none' && (
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl border border-gray-200 shadow-xl p-8 max-w-3xl mx-auto">
              {/* Status Overview */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Mint Status</h2>
                  <p className="text-sm text-gray-500 mt-1">All mint phases have concluded</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-xs font-medium text-gray-500">Total Supply</span>
                    <p className="text-lg font-bold text-gray-900">3,336</p>
                  </div>
                  <div className="px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
                    <span className="text-xs font-medium text-purple-600">Floor Price</span>
                    <p className="text-lg font-bold text-purple-700">1.5 SOL</p>
                  </div>
                </div>
              </div>

              {/* Mint Phases Timeline */}
              <div className="space-y-4 mb-10">
                {MINT_PHASES.map((phase) => {
                  const startDate = new Date(phase.startDate);
                  const endDate = new Date(phase.endDate);

                  return (
                    <div key={phase.id} className="flex items-center gap-4 p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">{phase.name}</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${phase.status === 'completed' ? 'bg-green-50 text-green-700' :
                            phase.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                            {phase.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {startDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                          {' → '}
                          {endDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">{phase.supply.toLocaleString()} NFTs</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Marketplace CTAs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <a
                  href="https://magiceden.io/marketplace/islanddao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center px-6 py-4 bg-gradient-to-br from-violet-500 to-pink-600 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                      <img src="/magiceden-logo.png" alt="Magic Eden" className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium tracking-wide">Trade on Magic Eden</span>
                    <svg className="w-4 h-4 text-white/70 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://opensea.io/collection/islanddao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center px-6 py-4 bg-gradient-to-br from-black/70 to-black rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                      <img src="/opensea-logo.png" alt="OpenSea" className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium tracking-wide">View on Tensor Trade</span>
                    <svg className="w-4 h-4 text-white/70 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Community Links */}
              <div className="text-center pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Join the Community</h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://twitter.com/IslandDAO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-b from-white to-gray-50 hover:to-gray-100 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow"
                  >
                    <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="font-medium bg-gradient-to-r from-[#1DA1F2] to-[#199CDC] bg-clip-text text-transparent">Follow on Twitter</span>
                  </a>
                  <a
                    href="https://discord.gg/islanddao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-b from-white to-gray-50 hover:to-gray-100 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow"
                  >
                    <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                    </svg>
                    <span className="font-medium bg-gradient-to-r from-[#5865F2] to-[#4752C4] bg-clip-text text-transparent">Join Discord</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {countdownType === 'end' && (
            <div>
              {/* Timer Widget - Left Side */}
              <div className="fixed left-4 top-24 z-50 lg:left-6">
                <div className="bg-white/70 rounded-xl border border-green-200 shadow-lg p-3 w-40 sm:w-48">
                  <h2 className="text-md sm:text-lg pb-1">
                    Minting Ends In
                  </h2>
                  <div className="grid grid-cols-4 gap-1">
                    {countdown.days > 0 && (
                      <div className="bg-white/60 rounded-lg p-1 border border-green-100 flex flex-col items-center">
                        <span className="font-mono text-lg sm:text-xl">{countdown.days}</span>
                        <span className="text-xs text-black/60">days</span>
                      </div>
                    )}
                    <div className="bg-white/60 rounded-lg p-1 border border-green-100 flex flex-col items-center">
                      <span className="font-mono text-lg sm:text-xl">{formatTimeUnit(countdown.hours)}</span>
                      <span className="text-xs text-black/60">hrs</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-1 border border-green-100 flex flex-col items-center">
                      <span className="font-mono text-lg sm:text-xl">{formatTimeUnit(countdown.minutes)}</span>
                      <span className="text-xs text-black/60">min</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-1 border border-green-100 flex flex-col items-center">
                      <span className="font-mono text-lg sm:text-xl">{formatTimeUnit(countdown.seconds)}</span>
                      <span className="text-xs text-black/60">sec</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 mt-10">
                {/* Page Header */}
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-block">
                    <h1 className="text-5xl pb-2">
                      Mint Your PERK
                    </h1>
                    <div className="h-1 w-32 bg-green-600 rounded-full mx-auto mb-6"></div>
                  </div>
                  <p className="text-lg text-black/80 mt-6">
                    Join the exclusive IslandDAO collection
                  </p>
                </div>

                {!wallet.publicKey ? (
                  <div className="flex items-center justify-center h-[400px] lg:w-[50rem] md:w-[35rem] sm:w-[30rem] rounded-2xl border border-green-200 bg-white/70 backdrop-blur-md animate-fade-in-up delay-300">
                    <div className="max-w-md text-center px-8">
                      <div className="mb-6 p-6 rounded-full bg-green-500/10 w-fit mx-auto shadow-md ring-1 ring-black/5 animate-float">
                        <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl  mb-4 ">Connect Your Wallet</h2>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-8">
                    {/* Main Minting Card */}
                    <div className="w-full max-w-2xl rounded-xl border border-green-200 bg-white/70 shadow-lg p-6 sm:p-8">
                      <div className="text-center">
                        <div className="mb-6 p-4 sm:p-6 rounded-full bg-green-50 w-fit mx-auto shadow-md">
                          {loading ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                        </div>
                        <h2 className="text-2xl sm:text-3xl text-black font-bold mb-4">
                          {loading ? "Minting in Progress..." : "Ready to Mint"}
                        </h2>
                        <p className="text-md sm:text-lg text-black/80 mb-4">
                          {loading ? "Please wait while we create your PERK" : "Mint a unique PERK and join the IslandDAO collection"}
                        </p>

                        {/* Minting Stage Indicator */}
                        {loading && (
                          <div className="flex justify-center items-center gap-4 mb-6">
                            <div className={`flex items-center gap-2 ${mintingStage === 'preparing' ? 'text-green-600' : 'text-black/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'preparing' ? 'bg-green-600 animate-pulse' : 'bg-black/40'}`} />
                              <span className="text-sm">Preparing</span>
                            </div>
                            <div className="w-8 h-px bg-black/20" />
                            <div className={`flex items-center gap-2 ${mintingStage === 'whitelist' ? 'text-green-600' : 'text-black/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'whitelist' ? 'bg-green-600 animate-pulse' : 'bg-black/40'}`} />
                              <span className="text-sm">Check whitelist</span>
                            </div>
                            <div className="w-8 h-px bg-black/20" />
                            <div className={`flex items-center gap-2 ${mintingStage === 'minting' ? 'text-green-600' : 'text-black/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'minting' ? 'bg-green-600 animate-pulse' : 'bg-black/40'}`} />
                              <span className="text-sm">Minting</span>
                            </div>
                            <div className="w-8 h-px bg-black/20" />
                            <div className={`flex items-center gap-2 ${mintingStage === 'confirming' ? 'text-green-600' : 'text-black/40'}`}>
                              <div className={`w-2 h-2 rounded-full ${mintingStage === 'confirming' ? 'bg-green-600 animate-pulse' : 'bg-black/40'}`} />
                              <span className="text-sm">Confirming</span>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={handleMint}
                          disabled={loading}
                          className={`relative w-full max-w-sm mx-auto py-3 sm:py-4 px-6 sm:px-8 text-md sm:text-lg font-semibold rounded-xl transition-all duration-300 ${loading
                            ? 'bg-gray-100 cursor-not-allowed text-black/50'
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                            }`}
                        >
                          <span className="flex items-center justify-center gap-3">
                            {loading ? (
                              <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white/90 rounded-full animate-spin"></div>
                                <span>Minting...</span>
                              </>
                            ) : (
                              <span>Mint NFT</span>
                            )}
                          </span>
                        </button>

                        {error && (
                          <div className="mt-6">
                            <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-4 rounded-lg max-w-md mx-auto">
                              <div className="flex items-center gap-2 mb-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <div className="w-full max-w-2xl rounded-xl border border-green-200 bg-white/70 shadow-lg">
                        <div className="p-6 sm:p-8">
                          <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3 text-green-600">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="text-lg sm:text-xl font-bold">Minted Successfully!</h3>
                            </div>
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-green-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                              <Image
                                src={nftData.image}
                                alt={nftData.name || "Minted NFT"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <h4 className="text-lg sm:text-xl font-bold text-green-700">{nftData.name}</h4>
                              <p className="text-black/80 mt-2">Your new NFT has been minted to your wallet</p>
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

        <footer className="relative py-6 text-center text-sm text-black/60">
          <p>© 2025 IslandDAO. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}