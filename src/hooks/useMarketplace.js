import { useState, useEffect } from 'react';
import { useWallet } from '../components/WalletProvider';
import { connection } from '../utils/wallet';
import { MarketplaceClient } from '../utils/anchor-client';

export function useMarketplace() {
    const { wallet, connected } = useWallet();
    const [client, setClient] = useState(null);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (connected && wallet) {
            const client = new MarketplaceClient(connection, wallet);
            setClient(client);
            fetchListings();
        }
    }, [connected, wallet]);

    const fetchListings = async () => {
        if (!client) return;
        
        const allListings = await client.program.account.listing.all([
            {
                memcmp: {
                    offset: 41, // position of 'active' in the account
                    bytes: bs58.encode(Buffer.from([1])) // true
                }
            }
        ]);
        
        setListings(allListings);
    };

    return {
        client,
        listings,
        fetchListings,
    };
}