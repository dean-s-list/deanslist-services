import { TransactionBuilder, Umi, base58, TransactionSignature } from "@metaplex-foundation/umi";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { signerIdentity } from "@metaplex-foundation/umi";
import { setComputeUnitPrice } from "@metaplex-foundation/mpl-toolbox";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export async function sendAndConfirmWithWalletAdapter(
  tx: TransactionBuilder,
  umi: Umi,
  wallet: WalletContextState,
  settings?: {
    commitment?: "processed" | "confirmed" | "finalized";
    skipPreflight?: boolean;
    network?: WalletAdapterNetwork;
  }
): Promise<{ signature: Uint8Array; confirmation: any }> {
  try {
    if (!wallet.publicKey) {
      throw new Error('Wallet public key is required');
    }

    // Set network to devnet by default
    const network = settings?.network || WalletAdapterNetwork.Devnet;
    console.log(`Building transaction for ${network}...`);
    
    // Create signer from wallet adapter and add to UMI
    const signer = createSignerFromWalletAdapter(wallet);
    umi.use(signerIdentity(signer));

    // Get latest blockhash with commitment
    const blockhash = await umi.rpc.getLatestBlockhash({
      commitment: settings?.commitment || "confirmed",
    });
    
    // Build and sign transaction
    const transactions = tx
      .prepend(setComputeUnitPrice(umi, { microLamports: BigInt(100000) }))
      .setBlockhash(blockhash);

    const signedTx = await transactions.buildAndSign(umi);

    // Send transaction with settings
    console.log('Sending transaction...');
    const signature = await umi.rpc.sendTransaction(signedTx, {
      preflightCommitment: settings?.commitment || "confirmed",
      commitment: settings?.commitment || "confirmed",
      skipPreflight: settings?.skipPreflight || false,
    }).catch((err: any) => {
      throw new Error(`Transaction failed: ${err}`);
    });
    
    console.log('Confirming transaction...');
    
    // Confirm transaction with settings
    const confirmation = await umi.rpc.confirmTransaction(signature, {
      strategy: { type: "blockhash", ...blockhash },
      commitment: settings?.commitment || "confirmed",
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    console.log('Transaction confirmed');
    return {
      signature: Uint8Array.from(base58.deserialize(signature)),
      confirmation,
    };
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}