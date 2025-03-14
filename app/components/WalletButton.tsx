'use client';

import dynamic from 'next/dynamic';
import styled from "styled-components";

// Dynamic import of WalletMultiButton to prevent SSR issues
export const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const StyledWalletButton = styled(WalletMultiButtonDynamic)`
  background: linear-gradient(135deg, rgba(71, 229, 139, 0.2), rgba(71, 229, 139, 0.4));
  border: 1px solid rgba(71, 229, 142, 0.4);
  border-radius: 12px;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(71, 229, 139, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(71, 229, 142, 0.3), rgba(71, 229, 95, 0.5));
    border-color: rgba(71, 229, 158, 0.6);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(71, 229, 124, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: rgba(71, 229, 150, 0.1);
    border-color: rgba(71, 229, 182, 0.2);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .wallet-adapter-button-trigger {
    background: none !important;
  }
`;

export const WalletButtonContainer = styled.div`
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: radial-gradient(
      circle at center,
      rgba(71, 229, 129, 0.15) 0%,
      transparent 70%
    );
    filter: blur(10px);
    pointer-events: none;
  }
`;

export default function WalletButton() {
  return (
    <WalletButtonContainer>
      <StyledWalletButton />
    </WalletButtonContainer>
  );
} 