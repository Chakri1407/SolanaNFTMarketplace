import React from 'react';

export function NFTCard({ nft }) {
  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
      <p>{nft.description}</p>
      <p>Price: {nft.price} SOL</p>
      <button onClick={() => console.log("Purchase NFT")}>
        Purchase
      </button>
    </div>
  );
}
