import { Inter } from 'next/font/google';
import "./globals.css";
import { WalletAdapterProvider } from './providers';
import { WalletButtonStyles } from "./WalletStyles";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Dean\'slist Network State",
  description: "A Network State Of Web3 Power users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A Network State Of Web3 Power users" />
        <meta name="keywords" content="Dean'slist, Network State, Web3, DAO, Power Users, Blockchain, Community, Dean, Solana, Dean'slist NG, Dean'slist BR" />
        <meta property="og:title" content="Dean'slist Network State" />
        <meta property="og:description" content="A Network State Of Web3 Power users" />
        <meta property="og:image" content="image/svg+xml" />
        <meta property="og:url" content="https://deanslist.services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@deanslistDAO" />
        <meta name="twitter:title" content="Dean'slist Network State" />
        <meta name="twitter:description" content="A Network State Of Web3 Power users" />
        <meta name="twitter:image" content="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <WalletButtonStyles />
        <WalletAdapterProvider>
          {children}
        </WalletAdapterProvider>
      </body>
    </html>
  );
}
