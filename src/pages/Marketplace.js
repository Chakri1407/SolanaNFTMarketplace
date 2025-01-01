import React, { useState, useEffect } from 'react';
import { useWallet } from '../components/WalletProvider';
import { NFTCard } from '../components/NFTCard';
import { connection } from '../utils/wallet';

export function Marketplace() {
  const { wallet, connected, connectWallet } = useWallet();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Fetch NFTs when wallet is connected
    if (connected) {
      fetchNFTs();
    }
  }, [connected]);

  const fetchNFTs = async () => {
    try {
      // Add NFT fetching logic here using Metaplex
      // This is where you'll integrate with your smart contract
      console.log("Fetching NFTs...");
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  return (
    <div className="marketplace">
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      )}
    </div>
  );
}