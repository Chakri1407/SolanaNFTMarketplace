import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import idl from '../idl/nft_marketplace.json';  // You'll get this after building the program

const PROGRAM_ID = new PublicKey('your_program_id_here');

export class MarketplaceClient {
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
        
        const provider = new AnchorProvider(
            connection,
            wallet,
            AnchorProvider.defaultOptions()
        );
        
        this.program = new Program(idl, PROGRAM_ID, provider);
    }

    async listNFT(nftMint, price) {
        const [listingPda] = await PublicKey.findProgramAddress(
            [Buffer.from("listing"), nftMint.toBuffer()],
            PROGRAM_ID
        );

        const tx = await this.program.methods
            .listNft(new BN(price))
            .accounts({
                market: this.marketPda,
                listing: listingPda,
                nftMint: nftMint,
                seller: this.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();

        return tx;
    }

    async purchaseNFT(listing) {
        const tx = await this.program.methods
            .purchaseNft()
            .accounts({
                market: this.marketPda,
                listing: listing,
                buyer: this.wallet.publicKey,
                seller: listing.seller,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();

        return tx;
    }

    async cancelListing(listing) {
        const tx = await this.program.methods
            .cancelListing()
            .accounts({
                listing: listing,
                seller: this.wallet.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();

        return tx;
    }
}
