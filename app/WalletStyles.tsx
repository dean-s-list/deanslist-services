'use client';

import '@solana/wallet-adapter-react-ui/styles.css';
import { createGlobalStyle } from 'styled-components';

export const WalletButtonStyles = createGlobalStyle`
  .wallet-adapter-button {
    --tw-bg-opacity: 0.05;
    background: rgba(255, 255, 255, var(--tw-bg-opacity)) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
    color: white !important;
    font-family: inherit !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    height: 40px !important;
    padding: 0 18px !important;
    transition: all 200ms ease !important;
    backdrop-filter: blur(8px) !important;
  }

  .wallet-adapter-button:not([disabled]):hover {
    --tw-bg-opacity: 0.1;
    background: rgba(255, 255, 255, var(--tw-bg-opacity)) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }

  .wallet-adapter-button[disabled] {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.05) !important;
    color: rgba(255, 255, 255, 0.5) !important;
    cursor: not-allowed !important;
  }

  .wallet-adapter-button-trigger {
    background: linear-gradient(270deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)) !important;
    border: 1px solid rgba(168, 85, 247, 0.1) !important;
  }

  .wallet-adapter-button-trigger:not([disabled]):hover {
    background: linear-gradient(270deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15)) !important;
    border-color: rgba(168, 85, 247, 0.2) !important;
  }

  .wallet-adapter-modal-wrapper {
    background: rgba(10, 1, 24, 0.95) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 16px !important;
  }

  .wallet-adapter-modal-button-close {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 10px !important;
    transition: all 200ms ease !important;
  }

  .wallet-adapter-modal-button-close:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .wallet-adapter-modal-title {
    color: white !important;
    font-size: 20px !important;
    font-weight: 600 !important;
  }

  .wallet-adapter-modal-list {
    margin: 0 -16px !important;
  }

  .wallet-adapter-modal-list li {
    padding: 4px 16px !important;
  }

  .wallet-adapter-modal-list-more {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 14px !important;
  }

  .wallet-adapter-modal-list-more:hover {
    color: white !important;
  }

  .wallet-adapter-modal-subtitle {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 14px !important;
  }

  .wallet-adapter-modal-content {
    padding: 24px !important;
  }

  .wallet-adapter-modal-list-more {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 10px !important;
    font-weight: 500 !important;
    height: 36px !important;
    margin-top: 12px !important;
  }

  .wallet-adapter-modal-list-more:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .wallet-adapter-dropdown {
    height: 40px !important;
  }

  .wallet-adapter-button-start-icon, 
  .wallet-adapter-button-end-icon {
    width: 20px !important;
    height: 20px !important;
  }

  .wallet-adapter-button[data-id="wallet-connect-button"] {
    background: linear-gradient(270deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)) !important;
    border: 1px solid rgba(168, 85, 247, 0.1) !important;
  }

  .wallet-adapter-button[data-id="wallet-connect-button"]:not([disabled]):hover {
    background: linear-gradient(270deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15)) !important;
    border-color: rgba(168, 85, 247, 0.2) !important;
  }

  .wallet-adapter-button[data-id="wallet-disconnect-button"] {
    background: rgba(239, 68, 68, 0.1) !important;
    border-color: rgba(239, 68, 68, 0.1) !important;
  }

  .wallet-adapter-button[data-id="wallet-disconnect-button"]:not([disabled]):hover {
    background: rgba(239, 68, 68, 0.15) !important;
    border-color: rgba(239, 68, 68, 0.2) !important;
  }
`;

export default function WalletStyles() {
  return null;
} 