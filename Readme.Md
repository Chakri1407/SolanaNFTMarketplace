# Solana NFT Marketplace

A decentralized NFT marketplace built on Solana blockchain where users can list, buy, and sell NFTs. This project uses Anchor framework for smart contracts and React for the frontend interface.

## 🚀 Features

- Wallet Integration with Phantom
- NFT Listing and Purchasing
- View Listed NFTs
- Cancel Listings
- Devnet/Testnet Support

## 📋 Prerequisites

- Node.js (v14 or higher)
- Rust (latest stable version)
- Solana CLI Tools (v1.17.0 or higher)
- Anchor Framework (latest version)
- Phantom Wallet Browser Extension

## 🛠️ Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd solana-nft-marketplace
```

2. Install Solana CLI tools
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

3. Configure Solana CLI for devnet
```bash
solana config set --url devnet
solana-keygen new --outfile ~/.config/solana/devnet.json
```

4. Install Anchor Framework
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

5. Install project dependencies
```bash
npm install
```


## ⚙️ Smart Contract Setup

1. Build the Anchor program
```bash
anchor build
```

2. Get the program ID
```bash
solana address -k target/deploy/nft_marketplace-keypair.json
```

3. Update program ID in:
   - `Anchor.toml`
   - `programs/nft-marketplace/src/lib.rs` (in `declare_id!()`)

4. Deploy to devnet
```bash
anchor deploy
```

## 🖥️ Frontend Setup

1. Navigate to the app directory
```bash
cd app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## 🔧 Smart Contract Functions

### Initialize Market
Creates a new marketplace with specified fee structure
```rust
initialize_market(market_fee: u64)
```

### List NFT
Lists an NFT for sale at a specified price
```rust
list_nft(price: u64)
```

### Purchase NFT
Allows a user to purchase a listed NFT
```rust
purchase_nft()
```

### Cancel Listing
Allows the seller to cancel their NFT listing
```rust
cancel_listing()
```

## 🎯 Frontend Components

### WalletProvider
Handles wallet connection and management using Phantom wallet.

### NFTCard
Displays individual NFT information and purchase options.

### Marketplace
Main marketplace component showing all listed NFTs.

## 🔄 State Management

The marketplace uses React hooks for state management:
- `useWallet`: Manages wallet connection state
- `useMarketplace`: Handles marketplace operations and listings

## 🛠️ Development

1. Start local validator
```bash
solana-test-validator
```

2. Run tests
```bash
anchor test
```

3. Build and deploy changes
```bash
anchor build
anchor deploy
```

## 🔍 Testing

Run the test suite:
```bash
anchor test
```

## 🚀 Deployment

1. Build the program
```bash
anchor build
```

2. Deploy to devnet
```bash
anchor deploy
```

3. Build and deploy frontend
```bash
cd app
npm run build
```

## ⚠️ Important Notes

- Always ensure you're on the correct Solana network (devnet/testnet)
- Keep your wallet's private keys secure
- Test thoroughly before mainnet deployment
- Monitor gas fees on devnet/testnet

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.