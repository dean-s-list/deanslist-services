import { Keypair } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionConfig } from "@solana/web3.js";

// Browser-compatible implementation of required functionality
export const getKeypair = () => {
  return Keypair.generate();
};

export const getConfig = () => {
  // Return default config for browser environment
  return {
    keypairPath: '',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  };
};

export const readConfig = () => {
  // In browser, we'll use localStorage if needed
  const storedConfig = typeof window !== 'undefined' ? localStorage.getItem('solana-config') : null;
  return storedConfig ? JSON.parse(storedConfig) : getConfig();
};

export const writeConfig = (config: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('solana-config', JSON.stringify(config));
  }
};

interface NetworkConfig {
  name: WalletAdapterNetwork;
  endpoint: string;
  config?: ConnectionConfig;
}

export const NETWORKS: NetworkConfig[] = [
  {
    name: WalletAdapterNetwork.Mainnet,
    endpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
    config: { commitment: "confirmed" }
  }
]; 