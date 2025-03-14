'use client';

import dynamic from 'next/dynamic';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

// Dynamically import the wallet modal provider to prevent SSR issues
const WalletModalProvider = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider), { ssr: false });

// Styled components for the wallet UI
export const StyledWalletButton = styled.button`
  background: linear-gradient(135deg, rgba(130, 71, 229, 0.2), rgba(130, 71, 229, 0.4));
  border: 1px solid rgba(130, 71, 229, 0.4);
  border-radius: 12px;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(130, 71, 229, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(130, 71, 229, 0.3), rgba(130, 71, 229, 0.5));
    border-color: rgba(130, 71, 229, 0.6);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(130, 71, 229, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: rgba(130, 71, 229, 0.1);
    border-color: rgba(130, 71, 229, 0.2);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

type Props = {
  children?: React.ReactNode;
};

export const WalletAdapterProvider: FC<Props> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
    
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};