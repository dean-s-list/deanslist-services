import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi, DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchAsset } from '@metaplex-foundation/mpl-core';

// Use devnet RPC endpoint
const DEVNET_RPC = "https://api.devnet.solana.com";

interface MetadataAttribute {
  trait_type?: string;
  key?: string;
  value?: string;
}

interface NFT {
  name: string;
  publicKey: string;
  image: string | null;
  attributes: { trait_type: string; value: string }[] | null;
  transferDelegate: string | null;
  autograph: { message: string; address: string } | null;
  symbol?: string;
  description?: string;
  royalties?: number;
  creators?: { address: string; share: number }[];
  isMutable?: boolean;
  primarySaleHappened?: boolean;
  sellerFeeBasisPoints?: number;
  editionNonce?: number;
  tokenStandard?: string;
}

export async function fetchNFTs(walletAddress: string, collectionAddress: string) {
  try {
    const umi = createUmi(DEVNET_RPC)
      .use(dasApi());
    
    const owner = publicKey(walletAddress);
    
    // Search for assets using DAS
    const assets = await umi.rpc.searchAssets({
      owner,
      limit: 1000,
    });

    // Filter for collection
    const filteredNFTs = assets.items.filter(
      (asset: DasApiAsset) => asset.authorities?.some(auth => 
        auth.address === collectionAddress && auth.scopes.includes('full')
      )
    );

    console.log('Found collection assets:', filteredNFTs.length);

    const nftDetails = await Promise.all(
      filteredNFTs.map(async (nft: DasApiAsset) => {
        try {
          console.log('Processing NFT:', nft.id);
          
          const assetDetails = await fetchAsset(umi, publicKey(nft.id));
          let imageUrl = null;
          let metadata = null;

          if (assetDetails.uri) {
            try {
              const metadataResponse = await fetch(assetDetails.uri);
              metadata = await metadataResponse.json();
              imageUrl = metadata.image || null;
            } catch (metaErr) {
              console.error(`Failed to fetch metadata for NFT ${nft.id}`, metaErr);
            }
          }

          return {
            name: nft.content?.metadata?.name || 'Unnamed NFT',
            publicKey: nft.id,
            image: imageUrl,
            attributes: assetDetails.attributes?.attributeList
              ? assetDetails.attributes.attributeList.map((attr) => ({
                  trait_type: attr.key || "Unknown",
                  value: attr.value || "Unknown",
                }))
              : null,
            transferDelegate: assetDetails.transferDelegate?.authority?.address?.toString() || null,
            autograph: assetDetails.autograph?.signatures?.[0]
              ? {
                  message: assetDetails.autograph.signatures[0].message,
                  address: assetDetails.autograph.signatures[0].address.toString(),
                }
              : null,
            symbol: metadata?.symbol,
            description: metadata?.description,
            royalties: metadata?.seller_fee_basis_points ? metadata.seller_fee_basis_points / 100 : undefined,
            creators: metadata?.properties?.creators?.map((creator: any) => ({
              address: creator.address,
              share: creator.share,
            })),
            isMutable: metadata?.properties?.isMutable,
            primarySaleHappened: metadata?.properties?.primarySaleHappened,
            sellerFeeBasisPoints: metadata?.seller_fee_basis_points,
            editionNonce: metadata?.properties?.editionNonce,
            tokenStandard: metadata?.properties?.tokenStandard,
          };
        } catch (err) {
          console.error(`Failed to process NFT ${nft.id}:`, err);
          return null;
        }
      })
    );

    const validNfts = nftDetails.filter((nft): nft is NonNullable<typeof nft> => nft !== null);
    console.log('Valid NFTs found:', validNfts.length);
    return validNfts;
  } catch (error) {
    console.error('Failed to fetch NFTs:', error);
    return [];
  }
} 