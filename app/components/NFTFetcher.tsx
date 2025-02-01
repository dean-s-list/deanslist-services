"use client";

import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Metaplex } from '@metaplex-foundation/js';
import type { Nft, NftWithToken, Metadata, Sft } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

interface NFTFetcherProps {
  onNFTsFetched: (nfts: (Nft | NftWithToken)[]) => void;
}

export async function fetchNFTs(connection: Connection, publicKey: PublicKey): Promise<(Nft | NftWithToken)[]> {
  if (!publicKey) return [];
  try {
    const metaplex = new Metaplex(connection);
    const myNfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    return myNfts.filter((nft: Metadata | Nft | Sft): nft is Nft | NftWithToken => 
      nft.model === "nft" || nft.model === "metadata"
    );
  } catch (error: unknown) {
    console.error('Error fetching NFTs:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

export default function NFTFetcher({ onNFTsFetched }: NFTFetcherProps) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNFTs() {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        const nfts = await fetchNFTs(connection, publicKey);
        onNFTsFetched(nfts);
      } catch (error: unknown) {
        console.error('Error fetching NFTs:', error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    loadNFTs();
  }, [connection, publicKey, onNFTsFetched]);

  if (isLoading) {
    return <div>Loading NFTs...</div>;
  }

  if (!publicKey) {
    return <div>Please connect your wallet to view NFTs</div>;
  }

  return null;
} 