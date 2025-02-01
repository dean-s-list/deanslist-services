import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionConfig } from "@solana/web3.js";

interface NetworkConfig {
  name: WalletAdapterNetwork;
  endpoint: string;
  config?: ConnectionConfig;
}

interface Config {
  keypairPath: string;
  rpcUrl: string;
}

// Browser-compatible implementation of required functionality
export const getKeypair = () => {
  return null; // Since Keypair is not used, we'll return null
};

export const getConfig = (): Config => {
  // Return default config for browser environment
  return {
    keypairPath: '',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  };
};

export const readConfig = (): Config => {
  // In browser, we'll use localStorage if needed
  const storedConfig = typeof window !== 'undefined' ? localStorage.getItem('solana-config') : null;
  return storedConfig ? JSON.parse(storedConfig) : getConfig();
};

export const writeConfig = (config: Config): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('solana-config', JSON.stringify(config));
  }
};

export const NETWORKS: NetworkConfig[] = [
  {
    name: WalletAdapterNetwork.Mainnet,
    endpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
    config: { commitment: "confirmed" }
  }
]; 