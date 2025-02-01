import { Keypair } from '@solana/web3.js';

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