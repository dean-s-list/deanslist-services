"use client";

import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Metaplex } from '@metaplex-foundation/js';
import type { Nft, NftWithToken } from '@metaplex-foundation/js';

interface NFTFetcherProps {
  onNFTsFetched: (nfts: (Nft | NftWithToken)[]) => void;
}

export default function NFTFetcher({ onNFTsFetched }: NFTFetcherProps) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNFTs() {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        const metaplex = new Metaplex(connection);
        const myNfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });
        onNFTsFetched(myNfts);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNFTs();
  }, [connection, publicKey, onNFTsFetched]);

  if (isLoading) {
    return <div>Loading NFTs...</div>;
  }

  if (!publicKey) {
    return <div>Please connect your wallet to view NFTs</div>;
  }

  return null;
} 