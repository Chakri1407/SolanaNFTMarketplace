use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount, Mint};
use anchor_spl::associated_token::AssociatedToken;
use mpl_token_metadata::state::Metadata;

declare_id!("your_program_id_here");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        market_fee: u64,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        market.authority = ctx.accounts.authority.key();
        market.fee = market_fee;
        market.total_listings = 0;
        Ok(())
    }

    pub fn list_nft(
        ctx: Context<ListNFT>,
        price: u64
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        let market = &mut ctx.accounts.market;

        listing.seller = ctx.accounts.seller.key();
        listing.nft_mint = ctx.accounts.nft_mint.key();
        listing.price = price;
        listing.active = true;

        market.total_listings = market.total_listings.checked_add(1).unwrap();

        // Transfer NFT to program PDA
        Ok(())
    }

    pub fn purchase_nft(
        ctx: Context<PurchaseNFT>,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        require!(listing.active, ErrorCode::InactiveListing);

        // Calculate fees
        let market = &ctx.accounts.market;
        let fee_amount = (listing.price * market.fee) / 10000;
        let seller_amount = listing.price - fee_amount;

        // Transfer SOL to seller
        // Transfer NFT to buyer
        listing.active = false;
        
        Ok(())
    }

    pub fn cancel_listing(
        ctx: Context<CancelListing>,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        require!(listing.active, ErrorCode::InactiveListing);
        require!(
            listing.seller == ctx.accounts.seller.key(),
            ErrorCode::UnauthorizedAccess
        );

        listing.active = false;

        // Transfer NFT back to seller
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ListNFT<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(
        init,
        payer = seller,
        space = 8 + 32 + 32 + 8 + 1
    )]
    pub listing: Account<'info, Listing>,
    pub nft_mint: Account<'info, Mint>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct PurchaseNFT<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub seller: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CancelListing<'info> {
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Market {
    pub authority: Pubkey,
    pub fee: u64,
    pub total_listings: u64,
}

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub active: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Listing is not active")]
    InactiveListing,
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
}