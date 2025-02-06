'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, useMemo } from "react";
import dynamic from 'next/dynamic';
import styled from 'styled-components';

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

// Dynamically import the wallet button to prevent SSR issues
const WalletModalProvider_ClientSide = dynamic(
  () => Promise.resolve(WalletModalProvider),
  { ssr: false }
);

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
  
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network),
    [network]
  );

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider_ClientSide>
          {children}
        </WalletModalProvider_ClientSide>
      </WalletProvider>
    </ConnectionProvider>
  );
}; 