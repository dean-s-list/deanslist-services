import { NextResponse } from 'next/server';
import { fetchNFTs } from '@/app/components/NFTFetcher';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');
    const collectionAddress = searchParams.get('collection');

    if (!walletAddress || !collectionAddress) {
      console.error('Missing parameters:', { walletAddress, collectionAddress });
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    console.log('Fetching NFTs for:', { walletAddress, collectionAddress });
    const nfts = await fetchNFTs(walletAddress, collectionAddress);
    console.log(`Found ${nfts.length} NFTs`);

    return NextResponse.json({ nfts });
  } catch (error) {
    console.error('Error in NFT API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 