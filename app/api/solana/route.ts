import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { fetchNFTs } from '@/app/components/NFTFetcher';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const publicKey = new PublicKey(wallet);
    const nfts = await fetchNFTs(connection, publicKey);
    return NextResponse.json({ nfts });
    
  } catch (err) {
    console.error('Error fetching NFTs:', err);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const requestData = await request.json();
  return NextResponse.json({ success: true, data: requestData });
} 