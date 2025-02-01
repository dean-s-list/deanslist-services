import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { mplCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import {
  Signer,
  Umi,
  createNoopSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { create } from "zustand";

interface UmiState {
  umi: Umi;
  signer: Signer | undefined;
  updateSigner: (signer: WalletAdapter) => void;
}

const useUmiStore = create<UmiState>()((set, get) => ({
  umi: createUmi("https://api.devnet.solana.com")
    .use(signerIdentity(createNoopSigner(publicKey("11111111111111111111111111111111"))))
    .use(mplCandyMachine()) // Register the mplCandyMachine plugin
    .use(dasApi()),
  signer: undefined,
  updateSigner: (signer) => {
    const currentSigner = get().signer;
    const newSigner = createSignerFromWalletAdapter(signer);

    if (
      !currentSigner ||
      currentSigner.publicKey.toString() !== newSigner.publicKey.toString()
    ) {
      set(() => ({ signer: newSigner }));
    }
  },
}));

export default useUmiStore;