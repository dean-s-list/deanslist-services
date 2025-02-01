"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { CheckCircleIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { das } from "@metaplex-foundation/mpl-core-das";
import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import useUmiStore from "@/store/useUmiStore";

const Header = dynamic(() => import("../../components/NFTHeader"));

interface NFT {
  name: string;
  publicKey: string;
  image: string | null;
  attributes: { trait_type: string; value: string }[] | null;
  pluginAttributes: { trait_type: string; value: string }[] | null;
  metadataAttributes: { trait_type: string; value: string }[] | null;
  transferDelegate: string | null;
  autograph: { message: string; address: string } | null;
  symbol?: string;
  description?: string;
  royalties?: number;
  creators?: { address: string; share: number }[];
  isMutable?: boolean;
  primarySaleHappened?: boolean;
  sellerFeeBasisPoints?: number;
  editionNonce?: number;
  tokenStandard?: string;
}

export default function StatsPage() {
  const { publicKey: walletPublicKey } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const targetCollection = "FfAAFtqAnCwdVWxfKx3mx5gEU1JpJPPhWcp1MGB5x7pR";
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    async function getNFTs() {
      if (!walletPublicKey) {
        console.log("%c ❌ No Wallet Connected", "color: red; font-weight: bold;");
        setLoading(false);
        return;
      }
      try {
        const umi = useUmiStore.getState().umi;
        const owner = publicKey(walletPublicKey.toString());
        const assets = await das.getAssetsByOwner(umi, { owner });

        const filteredNFTs = assets.filter(
          (asset) => asset.updateAuthority?.address === targetCollection
        );

        if (filteredNFTs.length === 0) {
          console.log("%c ⚠️ No NFTs found in this collection.", "color: yellow; font-weight: bold;");
          setLoading(false);
          return;
        }

        const nftDetails = await Promise.all(
          filteredNFTs.map(async (nft) => {
            try {
              const assetDetails = await fetchAsset(umi, publicKey(nft.publicKey));
              let imageUrl = null;
              let metadataAttributes = null;
              
              if (assetDetails.uri) {
                try {
                  const metadataResponse = await fetch(assetDetails.uri);
                  const metadata = await metadataResponse.json();
                  imageUrl = metadata.image || null;
                  metadataAttributes = metadata.attributes || null;
                } catch (metaErr) {
                  console.error(`Failed to fetch metadata for ${nft.name}`, metaErr);
                }
              }

              return {
                name: nft.name,
                publicKey: nft.publicKey.toString(),
                image: imageUrl,
                pluginAttributes: assetDetails.attributes?.attributeList
                  ? assetDetails.attributes.attributeList.map((attr) => ({
                      trait_type: attr.key || "Unknown",
                      value: attr.value || "Unknown",
                    }))
                  : null,
                metadataAttributes: metadataAttributes?.map((attr: any) => ({
                  trait_type: attr.trait_type || "Unknown",
                  value: attr.value || "Unknown",
                })) || null,
                transferDelegate: assetDetails.transferDelegate?.authority?.address?.toString() || null,
                autograph: assetDetails.autograph?.signatures?.[0]
                  ? {
                      message: assetDetails.autograph.signatures[0].message,
                      address: assetDetails.autograph.signatures[0].address.toString(),
                    }
                  : null,
                symbol: assetDetails.symbol,
                description: assetDetails.description,
                royalties: assetDetails.royalties,
                creators: assetDetails.creators?.map((creator) => ({
                  address: creator.address.toString(),
                  share: creator.share,
                })),
                isMutable: assetDetails.isMutable,
                primarySaleHappened: assetDetails.primarySaleHappened,
                sellerFeeBasisPoints: assetDetails.sellerFeeBasisPoints,
                editionNonce: assetDetails.editionNonce,
                tokenStandard: assetDetails.tokenStandard,
              } as NFT;
            } catch (err) {
              console.error(`Failed to fetch asset details for ${nft.name}`, err);
              return null;
            }
          })
        );

        setNfts(nftDetails.filter((nft): nft is NFT => nft !== null));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch NFTs:", err);
        setError("Failed to fetch NFTs. Please try again later.");
        setLoading(false);
      }
    }

    getNFTs();
  }, [walletPublicKey]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

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
                <h1 className="text-xl font-medium text-white">Your NFTs</h1>
                <p className="text-sm text-white/60 mt-1">View and manage your NFT collection</p>
              </div>
              {walletPublicKey && !error && nfts.length > 0 && (
                <div className="text-sm text-white/60">
                  {nfts.length} {nfts.length === 1 ? 'NFT' : 'NFTs'} found
                </div>
              )}
            </div>

            {!walletPublicKey ? (
              <div className="flex items-center justify-center h-[300px] rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-md text-center px-6">
                  <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                    <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Connect Your Wallet</h2>
                  <p className="text-white/60">Connect your wallet using the button in the navigation bar to view your NFTs</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[300px] rounded-xl border border-red-500/10 bg-white/5 backdrop-blur-sm">
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
              <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
                {/* Sidebar */}
                <div className="h-[calc(100vh-16rem)] sticky top-24">
                  <div className="h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-white/10 backdrop-blur-sm sticky top-0 z-10 bg-white/5">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-medium text-white/90">Collection NFTs</h2>
                        {!loading && nfts.length > 0 && (
                          <span className="text-xs text-white/60">{nfts.length} found</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="h-full overflow-y-auto p-2 space-y-1.5 hide-scrollbar">
                        <style jsx global>{`
                          .hide-scrollbar::-webkit-scrollbar {
                            display: none !important;
                          }
                          .hide-scrollbar {
                            -ms-overflow-style: none !important;
                            scrollbar-width: none !important;
                          }
                        `}</style>
                        {loading ? (
                          [...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center gap-3 p-2 rounded-lg bg-white/5">
                              <div className="w-12 h-12 rounded-lg bg-white/10" />
                              <div className="space-y-2 flex-1">
                                <div className="h-3 w-24 bg-white/10 rounded" />
                                <div className="h-2 w-16 bg-white/10 rounded" />
                              </div>
                            </div>
                          ))
                        ) : nfts.length === 0 ? (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-white/60">No NFTs found</p>
                          </div>
                        ) : (
                          nfts.map((nft) => (
                            <div
                              key={nft.publicKey}
                              onClick={() => setSelectedNFT(nft)}
                              className={`group flex items-center gap-3 p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                                selectedNFT?.publicKey === nft.publicKey
                                  ? "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20"
                                  : "border-transparent bg-white/5 hover:bg-white/10"
                              }`}
                            >
                              {nft.image ? (
                                <img
                                  src={nft.image}
                                  alt={nft.name}
                                  className="h-12 w-12 rounded-lg object-cover bg-white/5 group-hover:ring-2 ring-white/10 transition-all"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:ring-2 ring-white/10">
                                  <span className="text-xl">🖼️</span>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-white truncate group-hover:text-white/90 transition-colors">
                                  {nft.name}
                                </h3>
                                {nft.autograph && (
                                  <div className="flex items-center gap-1 text-xs">
                                    <span className="text-emerald-400/90">Signed</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="h-[calc(100vh-16rem)] rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                  {selectedNFT ? (
                    <div className="h-full overflow-y-auto hide-scrollbar">
                      <div className="p-4 space-y-3 max-w-2xl mx-auto">
                        {/* Header with name */}
                        <div className="pb-2 border-b border-white/10">
                          <h2 className="text-lg font-medium text-white">
                            {selectedNFT.name}
                          </h2>
                          {selectedNFT.description && (
                            <p className="text-sm text-white/60 mt-1">{selectedNFT.description}</p>
                          )}
                        </div>

                        {/* Image and Details+Attributes side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-3">
                          {/* Image Column */}
                          <div>
                            <div className="max-w-[220px] aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 ring-1 ring-white/10">
                              {selectedNFT.image ? (
                                <img
                                  src={selectedNFT.image}
                                  alt={selectedNFT.name}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                                  <span className="text-4xl">🖼️</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Details and Attributes Column */}
                          <div className="space-y-3 overflow-y-auto hide-scrollbar">
                            {/* NFT Details */}
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                <span>Details</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                              </h3>
                              <div className="rounded-lg border border-white/10 bg-white/5 divide-y divide-white/5">
                                <div className="p-2">
                                  <p className="text-xs font-medium text-white/70 mb-1">Public Key</p>
                                  <div className="flex items-center justify-between group">
                                    <p className="font-mono text-xs text-white/90 break-all">
                                      {selectedNFT.publicKey}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(selectedNFT.publicKey)}
                                      className="ml-2 p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                    >
                                      <ClipboardIcon className={`w-4 h-4 ${copiedText === selectedNFT.publicKey ? 'text-green-400' : 'text-white/60 group-hover:text-white/90'}`} />
                                    </button>
                                  </div>
                                </div>

                                {selectedNFT.description && (
                                  <div className="p-2">
                                    <p className="text-xs font-medium text-white/70 mb-1">Description</p>
                                    <p className="text-sm text-white/90 leading-relaxed">{selectedNFT.description}</p>
                                  </div>
                                )}

                                {selectedNFT.symbol && (
                                  <div className="p-2">
                                    <p className="text-xs font-medium text-white/70 mb-1">Symbol</p>
                                    <p className="text-sm text-white/90">{selectedNFT.symbol}</p>
                                  </div>
                                )}

                                {selectedNFT.sellerFeeBasisPoints !== undefined && (
                                  <div className="p-2">
                                    <p className="text-xs font-medium text-white/70 mb-1">Royalties</p>
                                    <p className="text-sm text-white/90">
                                      {(selectedNFT.sellerFeeBasisPoints / 100).toFixed(2)}%
                                    </p>
                                  </div>
                                )}

                                {selectedNFT.tokenStandard && (
                                  <div className="p-2">
                                    <p className="text-xs font-medium text-white/70 mb-1">Token Standard</p>
                                    <p className="text-sm text-white/90">{selectedNFT.tokenStandard}</p>
                                  </div>
                                )}

                                <div className="p-2 grid grid-cols-2 gap-2">
                                  {selectedNFT.isMutable !== undefined && (
                                    <div>
                                      <p className="text-xs font-medium text-white/70 mb-1">Mutable</p>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${selectedNFT.isMutable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                        <p className="text-sm text-white/90">
                                          {selectedNFT.isMutable ? 'Yes' : 'No'}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {selectedNFT.primarySaleHappened !== undefined && (
                                    <div>
                                      <p className="text-xs font-medium text-white/70 mb-1">Primary Sale</p>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${selectedNFT.primarySaleHappened ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                                        <p className="text-sm text-white/90">
                                          {selectedNFT.primarySaleHappened ? 'Completed' : 'Not Completed'}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Metadata Attributes */}
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                <span>Attributes</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                              </h3>
                              {selectedNFT.metadataAttributes && selectedNFT.metadataAttributes.length > 0 ? (
                                <div className="grid grid-cols-2 gap-1">
                                  {selectedNFT.metadataAttributes.map((attr, i) => (
                                    <div
                                      key={i}
                                      className="rounded-lg border border-white/10 bg-white/5 p-1.5 hover:bg-white/10 transition-colors"
                                    >
                                      <p className="text-xs font-medium text-white/70">{attr.trait_type}</p>
                                      <p className="text-sm font-medium text-white">
                                        {attr.value}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-white/60 italic">No attributes available</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Plugin Data and Creators - Full Width */}
                        <div className="space-y-3 overflow-y-auto hide-scrollbar">
                          {/* Plugin Data */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                              <span>Plugin Data</span>
                              <div className="h-px flex-1 bg-white/10"></div>
                            </h3>
                            <div className="rounded-lg border border-white/10 bg-white/5 divide-y divide-white/5">
                              {/* Plugin Attributes */}
                              {selectedNFT.pluginAttributes && selectedNFT.pluginAttributes.length > 0 && (
                                <div className="p-2 space-y-2">
                                  <h4 className="text-xs font-medium text-white/70">Plugin Attributes</h4>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                    {selectedNFT.pluginAttributes.map((attr, i) => (
                                      <div
                                        key={i}
                                        className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                                      >
                                        <p className="text-xs font-medium text-white/70">{attr.trait_type}</p>
                                        <p className="text-sm font-medium text-white">
                                          {attr.value}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Transfer Delegate */}
                              {selectedNFT.transferDelegate && (
                                <div className="p-1.5">
                                  <h4 className="text-xs font-medium text-white/70 mb-2">Transfer Delegate</h4>
                                  <div className="flex items-center justify-between group">
                                    <p className="font-mono text-xs text-white/90 break-all">
                                      {selectedNFT.transferDelegate}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(selectedNFT.transferDelegate!)}
                                      className="ml-2 p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                    >
                                      <ClipboardIcon className={`w-4 h-4 ${copiedText === selectedNFT.transferDelegate ? 'text-green-400' : 'text-white/60 group-hover:text-white/90'}`} />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Autograph */}
                              {selectedNFT.autograph && (
                                <div className="p-1.5 space-y-1.5">
                                  <h4 className="text-xs font-medium text-white/70">Autograph</h4>
                                  <div className="space-y-1.5">
                                    <div>
                                      <p className="text-xs font-medium text-white/70 mb-1">Message</p>
                                      <p className="text-sm text-white/90 bg-white/5 p-1.5 rounded-md">
                                        {selectedNFT.autograph.message}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium text-white/70 mb-1">Signed by</p>
                                      <div className="flex items-center justify-between group">
                                        <p className="font-mono text-xs text-white/90 break-all">
                                          {selectedNFT.autograph.address}
                                        </p>
                                        <button
                                          onClick={() => copyToClipboard(selectedNFT.autograph!.address)}
                                          className="ml-2 p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                        >
                                          <ClipboardIcon className={`w-4 h-4 ${copiedText === selectedNFT.autograph.address ? 'text-green-400' : 'text-white/60 group-hover:text-white/90'}`} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Creators */}
                          {selectedNFT.creators && selectedNFT.creators.length > 0 && (
                            <div className="space-y-3">
                              <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                <span>Creators</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                              </h3>
                              <div className="grid grid-cols-1 gap-2">
                                {selectedNFT.creators.map((creator, index) => (
                                  <div
                                    key={index}
                                    className="rounded-lg border border-white/10 bg-white/5 p-1 space-y-1 hover:bg-white/10 transition-colors"
                                  >
                                    <div>
                                      <p className="text-xs font-medium text-white/70 mb-1">Creator Address</p>
                                      <div className="flex items-center justify-between group">
                                        <p className="font-mono text-xs text-white/90 break-all">
                                          {creator.address}
                                        </p>
                                        <button
                                          onClick={() => copyToClipboard(creator.address)}
                                          className="ml-2 p-1 hover:bg-white/10 rounded-md transition-colors"
                                        >
                                          <ClipboardIcon className={`w-4 h-4 ${copiedText === creator.address ? 'text-green-400' : 'text-white/60 group-hover:text-white/90'}`} />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 rounded-md p-1">
                                      <p className="text-xs font-medium text-white/70">Share</p>
                                      <p className="text-sm font-medium text-white">{creator.share}%</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center px-4">
                        <div className="mb-4 p-4 rounded-full bg-white/5 w-fit mx-auto ring-1 ring-white/10">
                          <svg className="w-7 h-7 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Select an NFT</h3>
                        <p className="text-sm text-white/60">
                          Choose an NFT from the list to view its details
                        </p>
                      </div>
                    </div>
                  )}
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