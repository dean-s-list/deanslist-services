import { NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { fetchNFTs } from '@/app/components/NFTFetcher';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const nfts = await fetchNFTs(connection, wallet);
    return NextResponse.json({ nfts });
    
  } catch (err) {
    console.error('Error fetching NFTs:', err);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  // Handle any server-side operations here
  return NextResponse.json({ success: true });
}

export async function FETCH(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 