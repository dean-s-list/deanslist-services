/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  transpilePackages: [
    '@metaplex-foundation/umi-eddsa-web3js',
    '@soceanfi/solana-cli-config',
    '@metaplex-foundation/mpl-core',
    '@metaplex-foundation/mpl-core-das',
  ],
  images: {
    domains: ['gateway.irys.xyz'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig; 