"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-core-candy-machine";
import { fetchCollection } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import useUmiStore from "@/store/useUmiStore";
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import base58 from "bs58";

const Header = dynamic(() => import("../../components/NFTHeader"));

const candyMachineId = publicKey("5QAvMBEKtY4CoxLDJzFUdcusZWNjTeQ2AES1tZ2cc5LU");
const collectionId = publicKey("5n3ECmNEzfsLq25F4Ls3Api83FRWtbpBfhFeGKDzkN5e");

interface CandyMachineStats {
  itemsAvailable: number;
  itemsMinted: number;
  itemsRemaining: number;
  itemsRedeemed: number;
  price: number;
  goLiveDate: string;
  isActive: boolean;
  authority: string;
  mintAuthority: string;
  collectionName: string;
  isMutable: boolean;
  configLineSettings: {
    prefixName: string;
    nameLength: number;
    prefixUri: string;
    uriLength: number;
    isSequential: boolean;
  } | null;
  royalties: {
    basisPoints: number;
    creators: Array<{
      address: string;
      percentage: number;
    }>;
  };
  guardSettings?: {
    botTax?: string;
    solPayment?: string;
    startDate?: string;
    endDate?: string;
    allowlistMerkleRoot?: string;
  };
}

export default function StatsPage() {
  const [stats, setStats] = useState<CandyMachineStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const umi = useUmiStore.getState().umi;

        const [candyMachine, collection] = await Promise.all([
          fetchCandyMachine(umi, candyMachineId),
          fetchCollection(umi, collectionId),
        ]);

        // Custom replacer function to handle BigInt
        const replacer = (_key: string, value: unknown) => {
          if (typeof value === 'bigint') {
            return value.toString();
          }
          return value;
        };

        const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority)

        console.log('Raw Candy Machine Data:', JSON.stringify(candyMachine, replacer, 2));
        console.log('Raw Collection Data:', JSON.stringify(collection, replacer, 2));
        console.log('Raw CandyGuard Data: ', JSON.stringify(candyGuard, replacer, 2))

        if (!candyMachine) {
          throw new Error("Failed to fetch candy machine data");
        }

        // Process Guard Settings
        const guardSettings: CandyMachineStats['guardSettings'] = candyGuard ? {
          botTax: candyGuard.guards.botTax?.__option === 'Some'
            ? `${Number(candyGuard.guards.botTax.value.lamports.basisPoints) / 1_000_000_000} SOL`
            : undefined,
          solPayment: candyGuard.guards.solPayment?.__option === 'Some'
            ? `${Number(candyGuard.guards.solPayment.value.lamports.basisPoints) / 1_000_000_000} SOL`
            : undefined,
          startDate: candyGuard.guards.startDate?.__option === 'Some'
            ? new Date(Number(candyGuard.guards.startDate.value.date) * 1000).toUTCString()
            : undefined,
          endDate: candyGuard.guards.endDate?.__option === 'Some'
            ? new Date(Number(candyGuard.guards.endDate.value.date) * 1000).toUTCString()
            : undefined,
          allowlistMerkleRoot: candyGuard.guards.allowList?.__option === 'Some'
            ? base58.encode(candyGuard.guards.allowList.value.merkleRoot)
            : undefined
        } : undefined;

        // Map the data to our interface
        const mappedStats: CandyMachineStats = {
          itemsAvailable: Number(candyMachine.data.itemsAvailable),
          itemsMinted: Number(candyMachine.itemsRedeemed),
          itemsRemaining: Number(candyMachine.data.itemsAvailable) - Number(candyMachine.itemsRedeemed),
          itemsRedeemed: Number(candyMachine.itemsRedeemed),
          price: 0.1 * 1e9, // Price in lamports (0.1 SOL)
          goLiveDate: new Date().toISOString(),
          isActive: true,
          authority: candyMachine.authority.toString(),
          mintAuthority: candyMachine.mintAuthority.toString(),
          collectionName: collection.name,
          isMutable: candyMachine.data.isMutable,
          configLineSettings: candyMachine.data.configLineSettings.__option === "Some"
            ? {
              prefixName: candyMachine.data.configLineSettings.value.prefixName,
              nameLength: candyMachine.data.configLineSettings.value.nameLength,
              prefixUri: candyMachine.data.configLineSettings.value.prefixUri,
              uriLength: candyMachine.data.configLineSettings.value.uriLength,
              isSequential: candyMachine.data.configLineSettings.value.isSequential,
            }
            : null,
          royalties: {
            basisPoints: collection.royalties?.basisPoints ?? 0,
            creators: collection.royalties?.creators?.map(creator => ({
              address: creator.address.toString(),
              percentage: creator.percentage
            })) ?? []
          },
          guardSettings
        };

        setStats(mappedStats);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError("Failed to fetch collection statistics. Please try again later.");
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString();
  };

  const formatSOL = (lamports: number): string => {
    return (lamports / 1e9).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-100 to-white">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,black,rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Header />

        <main className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-4">
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-block">
                <h1 className="text-4xl bg-clip-text pb-2">
                  Collection Stats
                </h1>
                <div className="h-1 w-full rounded-full transform scale-x-0 animate-scale-x-full"></div>
              </div>
              <p className="text-lg text-black/60 mt-6">
                View detailed statistics about the PERKs NFT collection
              </p>
            </div>

            {error ? (
              <div className="flex items-center justify-center h-[300px] rounded-xl border border-red-500/10 bg-black/5 backdrop-blur-sm">
                <div className="max-w-md text-center px-6">
                  <div className="mb-4 p-4 rounded-full bg-red-500/10 w-fit mx-auto">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {/* Minting Progress Section */}
                <div className="rounded-xl border border-black/10 bg-black/5 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-black">Minting Progress</h2>
                    {stats?.isActive ? (
                      <span className="px-3 py-1 text-xs font-medium text-green-500 bg-green-700/10 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium text-yellow-400 bg-yellow-400/10 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>

                  {loading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-black/10 rounded w-3/4"></div>
                      <div className="h-8 bg-black/10 rounded"></div>
                      <div className="h-4 bg-black/10 rounded w-1/2"></div>
                    </div>
                  ) : stats && (
                    <>
                      <div className="relative pt-1 mb-6">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-black-400/10">
                              Minting Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block">
                              {((stats.itemsMinted / stats.itemsAvailable) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex h-3 mb-4 overflow-hidden rounded-full bg-purple-400/10">
                          <div
                            style={{ width: `${(stats.itemsMinted / stats.itemsAvailable) * 100}%` }}
                            className="flex flex-col justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg transition-all duration-500"
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-1">Items Minted</p>
                          <p className="text-2xl font-bold text-black">{formatNumber(stats.itemsMinted)}</p>
                        </div>
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-1">Items Remaining</p>
                          <p className="text-2xl font-bold text-black">{formatNumber(stats.itemsRemaining)}</p>
                        </div>
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-1">Total Supply</p>
                          <p className="text-2xl font-bold text-black">{formatNumber(stats.itemsAvailable)}</p>
                        </div>
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-1">Price</p>
                          <p className="text-2xl font-bold text-black">{formatSOL(stats.price)} SOL</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Collection Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-black/10 bg-black/5 backdrop-blur-sm p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-black">Collection Details</h2>
                    {loading ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-black/10 rounded w-3/4"></div>
                        <div className="h-8 bg-black/10 rounded"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-2">Collection Name</p>
                          <p className="text-lg font-medium text-black">{stats?.collectionName}</p>
                        </div>

                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-2">Royalties</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-black/60">Rate</span>
                              <span className="text-sm text-black">{(stats?.royalties.basisPoints ?? 0) / 100}%</span>
                            </div>
                            <div className="space-y-2">
                              {stats?.royalties.creators.map((creator, index) => (
                                <div key={index} className="rounded-lg border border-black/5 bg-black/5 p-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-black/60">Creator {index + 1}</span>
                                    <span className="text-xs text-black">{creator.percentage}%</span>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="font-mono text-xs text-black/90 break-all">
                                      {creator.address}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(creator.address)}
                                      className="ml-2 p-1 hover:bg-black/10 rounded-md transition-colors"
                                    >
                                      {copiedText === creator.address ? (
                                        <CheckIcon className="w-4 h-4 text-black/30" />
                                      ) : (
                                        <ClipboardIcon className="w-4 h-4 text-black/60 group-hover:text-black/90" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                            <p className="text-sm text-black/60 mb-2">Mutability</p>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${stats?.isMutable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                              <p className="text-sm text-black">
                                {stats?.isMutable ? 'Mutable' : 'Immutable'}
                              </p>
                            </div>
                          </div>

                          <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                            <p className="text-sm text-black/60 mb-2">Status</p>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${stats?.isActive ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                              <p className="text-sm text-black">
                                {stats?.isActive ? 'Active' : 'Inactive'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technical Details Section */}
                  <div className="rounded-xl border border-black/10 bg-black/5 backdrop-blur-sm p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-black">Technical Details</h2>
                    {loading ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-black/10 rounded w-3/4"></div>
                        <div className="h-8 bg-black/10 rounded"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-2">Candy Machine ID</p>
                          <div className="flex items-center justify-between group">
                            <p className="font-mono text-sm text-black/90 break-all">
                              {candyMachineId.toString()}
                            </p>
                            <button
                              onClick={() => copyToClipboard(candyMachineId.toString())}
                              className="ml-2 p-1.5 hover:bg-black/10 rounded-md transition-colors"
                            >
                              {copiedText === candyMachineId.toString() ? (
                                <CheckIcon className="w-4 h-4 text-black/30" />
                              ) : (
                                <ClipboardIcon className="w-4 h-4 text-black/60 group-hover:text-black/90" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-2">Authority</p>
                          <div className="flex items-center justify-between group">
                            <p className="font-mono text-sm text-black/90 break-all">
                              {stats?.authority}
                            </p>
                            <button
                              onClick={() => copyToClipboard(stats?.authority || '')}
                              className="ml-2 p-1.5 hover:bg-black/10 rounded-md transition-colors"
                            >
                              {copiedText === stats?.authority ? (
                                <CheckIcon className="w-4 h-4 text-black/30" />
                              ) : (
                                <ClipboardIcon className="w-4 h-4 text-black/60 group-hover:text-black/90" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                          <p className="text-sm text-black/60 mb-2">Mint Authority</p>
                          <div className="flex items-center justify-between group">
                            <p className="font-mono text-sm text-black/90 break-all">
                              {stats?.mintAuthority}
                            </p>
                            <button
                              onClick={() => copyToClipboard(stats?.mintAuthority || '')}
                              className="ml-2 p-1.5 hover:bg-black/10 rounded-md transition-colors"
                            >
                              {copiedText === stats?.mintAuthority ? (
                                <CheckIcon className="w-4 h-4 text-black/30" />
                              ) : (
                                <ClipboardIcon className="w-4 h-4 text-black/60 group-hover:text-black/90" />
                              )}
                            </button>
                          </div>
                        </div>

                        {stats?.configLineSettings && (
                          <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                            <p className="text-sm text-black/60 mb-3">Configuration Settings</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-black/60">Prefix Name:</span>
                                <span className="text-black">{stats.configLineSettings.prefixName}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-black/60">Name Length:</span>
                                <span className="text-black">{stats.configLineSettings.nameLength}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-black/60">URI Prefix:</span>
                                <span className="text-black">{stats.configLineSettings.prefixUri}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-black/60">URI Length:</span>
                                <span className="text-black">{stats.configLineSettings.uriLength}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-black/60">Sequential Minting:</span>
                                <span className="text-black">{stats.configLineSettings.isSequential ? 'Yes' : 'No'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {stats?.guardSettings && (

                          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
                            <div className="rounded-xl border border-black/10 bg-black/5 backdrop-blur-sm p-6 space-y-6">
                              <h2 className="text-md text-black">Candy Guard Settings</h2>
                              <div className="space-y-4">
                                {stats.guardSettings.botTax && (
                                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                                    <p className="text-sm text-black/60 mb-2">Bot Tax</p>
                                    <p className="">{stats.guardSettings.botTax}</p>
                                  </div>
                                )}

                                {stats.guardSettings.solPayment && (
                                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                                    <p className="text-sm text-black/60 mb-2">SOL Payment</p>
                                    <p className="">{stats.guardSettings.solPayment}</p>
                                  </div>
                                )}

                                {stats.guardSettings.startDate && (
                                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                                    <p className="text-sm text-black/60 mb-2">Start Date (UTC)</p>
                                    <p className="">{stats.guardSettings.startDate}</p>
                                  </div>
                                )}

                                {stats.guardSettings.endDate && (
                                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                                    <p className="text-sm text-black/60 mb-2">End Date (UTC)</p>
                                    <p className="">{stats.guardSettings.endDate}</p>
                                  </div>
                                )}
                              </div>
                              {stats.guardSettings.allowlistMerkleRoot && (
                                <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                                  <p className="text-sm text-black/60 mb-2">Allowlist Merkleroot</p>
                                  <div className="flex items-center justify-between group">
                                    <p className="font-mono text-sm text-black/90 break-all">
                                      {stats.guardSettings.allowlistMerkleRoot}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(stats.guardSettings?.allowlistMerkleRoot || '')}
                                      className="ml-2 p-1.5 hover:bg-black/10 rounded-md transition-colors"
                                    >
                                      {copiedText === stats.guardSettings?.allowlistMerkleRoot ? (
                                        <CheckIcon className="w-4 h-4 text-black/30" />
                                      ) : (
                                        <ClipboardIcon className="w-4 h-4 text-black/60 group-hover:text-black/90" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>


                          </div>
                        )}

                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="relative py-6 text-center text-sm text-black/40">
          <p className="hover:text-black/60 transition-colors duration-300">© 2025 IslandDAO. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 