"use client";

import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Metaplex } from '@metaplex-foundation/js';
import type { Nft, NftWithToken, Metadata } from '@metaplex-foundation/js';

interface NFTFetcherProps {
  onNFTsFetched: (nfts: (Nft | NftWithToken)[]) => void;
}

export async function fetchNFTs(connection: any, publicKey: any) {
  if (!publicKey) return [];
  try {
    const metaplex = new Metaplex(connection);
    const myNfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    return myNfts.filter((nft): nft is Nft | NftWithToken => 
      nft.model === "nft" || nft.model === "metadata"
    );
  } catch (error) {
    console.error('Error fetching NFTs:', error);
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
      } catch (error) {
        console.error('Error fetching NFTs:', error);
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