import { NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';

export async function GET() {
  // Generate a new keypair on the server side
  const keypair = Keypair.generate();
  
  return NextResponse.json({
    publicKey: keypair.publicKey.toString(),
    config: {
      rpcUrl: 'https://api.mainnet-beta.solana.com',
    }
  });
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