import React, { createContext, useContext, useState } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const WalletContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      setWallet(phantom);
      setConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const value = {
    wallet,
    connected,
    connectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}