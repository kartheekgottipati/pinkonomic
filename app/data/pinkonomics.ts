/**
 * PINK Tokenomics Data Structure
 * 
 * This file serves as the single source of truth for all tokenomics-related data.
 * To avoid duplication, we follow these principles:
 * 1. Base values (percentages, colors) are defined once as constants
 * 2. Derived values are calculated from these constants
 * 3. Related data is grouped into namespaced objects (e.g., BURN_MECHANISMS, SECURITY)
 * 4. Legacy exports are maintained for backward compatibility
 */

// Base Constants
export const TOTAL_SUPPLY = 2300001221;
export const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";
export const BURN_ADDRESS_URL = "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d?a=0x000000000000000000000000000000000000dead";

// Tokenomics Percentages - Single source of truth for all distribution values
export const TOKENOMICS_PERCENTAGES = {
    COMMUNITY_ECOSYSTEM: 36,
    LIQUIDITY: 25,
    TREASURY: 29,
    TEAM_DEVELOPMENT: 10
};

// Color scheme for consistent usage across visualizations
export const TOKEN_COLORS = {
    COMMUNITY_ECOSYSTEM: '#ec4899',
    LIQUIDITY: '#8b5cf6',
    TREASURY: '#3b82f6',
    TEAM_DEVELOPMENT: '#06b6d4'
};

// Distribution data for visualizations (derived from percentages above)
export const INITIAL_DISTRIBUTION = [
    {
        title: 'Community & Ecosystem',
        value: TOKENOMICS_PERCENTAGES.COMMUNITY_ECOSYSTEM,
        color: TOKEN_COLORS.COMMUNITY_ECOSYSTEM
    },
    {
        title: 'Liquidity',
        value: TOKENOMICS_PERCENTAGES.LIQUIDITY,
        color: TOKEN_COLORS.LIQUIDITY
    },
    {
        title: 'Treasury',
        value: TOKENOMICS_PERCENTAGES.TREASURY,
        color: TOKEN_COLORS.TREASURY
    },
    {
        title: 'Team & Development',
        value: TOKENOMICS_PERCENTAGES.TEAM_DEVELOPMENT,
        color: TOKEN_COLORS.TEAM_DEVELOPMENT
    },
];

// Contract addresses
export const contractAddresses = [
    {
        name: "PINK on Moonbeam",
        address: "0xfFfFFfFf30478fAFBE935e466da114E14fB3563d",
        explorer: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d",
        verified: true,
    },
    {
        name: "PINK on Base",
        address: "0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0",
        explorer: "https://basescan.org/token/0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0",
        verified: true,
    },
    {
        name: "PINKDROP Game",
        address: "0x7bFC36fA3f81aD31cec770149695717757297462",
        explorer: "https://moonscan.io/address/0x7bFC36fA3f81aD31cec770149695717757297462#tokentxns",
        verified: true,
    },
];

// External links
export const externalLinks = [
    { label: "CoinMarketCap", url: "https://coinmarketcap.com/currencies/pink/" },
    { label: "Dex Screener", url: "https://dexscreener.com/search?q=pink" },
    { label: "Burn Tracker", url: BURN_ADDRESS_URL, category: "burn" },
    { label: "Liquidity Info", url: "https://dexscreener.com/moonbeam/0x11e07ecc2276b12119dac36ef16df914b8c0cefc" },
    { label: "Holder Analytics", url: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d#balances" },
];

// Security and trust features
export const SECURITY = {
    // Core security features
    features: [
        {
            title: "Locked Liquidity",
            description: "Initial liquidity locked for 2 years to ensure project stability",
            iconName: "FaLock",
            iconColor: "text-purple-400",
            category: "liquidity"
        },
        {
            title: "Verified Contracts",
            description: "All contracts are verified and publicly viewable on blockchain explorers",
            iconName: "FaShieldAlt",
            iconColor: "text-green-400",
            category: "transparency"
        },
        {
            title: "Renounced Ownership",
            description: "Contract ownership renounced, preventing changes to tokenomics",
            iconName: "FaUsers",
            iconColor: "text-blue-400",
            category: "governance"
        },
        {
            title: "Regular Audits",
            description: "Smart contract audits conducted by independent security firms",
            iconName: "FaExclamationCircle",
            iconColor: "text-yellow-400",
            category: "audit"
        }
    ],

    // Audit information
    audits: [
        {
            firm: "Certik",
            date: "2024-07-15",
            status: "Passed",
            url: "#"
        },
        {
            firm: "Hacken",
            date: "2024-03-22",
            status: "Passed",
            url: "#"
        }
    ]
};

// For backward compatibility
export const securityFeatures = SECURITY.features;

// Type definition for API response
export interface PinkStatsResponse {
    balances: {
        maxSupply: number;
        totalSupply: number;
        circulatingSupply: number;
        moonbeamSupply: number;
        baseSupply: number;
        treasuryBalance: number;
        moonbeamBurnBalance: number;
        baseBurnBalance: number;
        phalaBurnBalance: number;
        totalBurnBalance: number;
        lastUpdated: string;
    };
    burn: {
        burnedLast1Day: number;
        burnedLast7Days: number;
        burnedLast30Days: number;
        burnedLast60Days: number;
        updatedAt: string;
    };
    pinkDrop: {
        pinkSpentOnTickets: number;
        ticketsPurchased: number;
        rewardsClaimed: number;
        pinkBurnedByTournaments: number;
        completedTournaments: number;
        updatedAt: string;
    };
    marketData: {
        price: string;
        marketCap: string;
        holders: string;
        dailyVolume: string;
        liquidityValue: string;
        updatedAt: string;
    };
    lastUpdated: string;
}

// Token metrics that aren't directly available from API
export const tokenMetricsConstants = {
    // Calculate values from percentages to avoid duplication
    teamAllocation: Math.round(TOTAL_SUPPLY * TOKENOMICS_PERCENTAGES.TEAM_DEVELOPMENT / 100),
    percentTeam: TOKENOMICS_PERCENTAGES.TEAM_DEVELOPMENT,
    treasuryAllocation: Math.round(TOTAL_SUPPLY * TOKENOMICS_PERCENTAGES.TREASURY / 100),
    percentTreasury: TOKENOMICS_PERCENTAGES.TREASURY,
    communityAllocation: Math.round(TOTAL_SUPPLY * TOKENOMICS_PERCENTAGES.COMMUNITY_ECOSYSTEM / 100),
    percentCommunity: TOKENOMICS_PERCENTAGES.COMMUNITY_ECOSYSTEM,
    liquidityAllocation: Math.round(TOTAL_SUPPLY * TOKENOMICS_PERCENTAGES.LIQUIDITY / 100),
    percentLiquidity: TOKENOMICS_PERCENTAGES.LIQUIDITY
};

// API endpoint
export const PINK_STATS_API_ENDPOINT = "https://pink-utils.kargo-dev.workers.dev/pink-stats";

// Deflationary mechanism data - consolidated for consistency
export const BURN_MECHANISMS = {
    // Core mechanism types
    mechanisms: [
        {
            title: "Manual Burns",
            description: "Strategic burns conducted by the team from treasury holdings to decrease total supply",
            icon: "FaFire",
            color: TOKEN_COLORS.TREASURY
        },
        {
            title: "Game Mechanics",
            description: "PINKDROP game burns tokens through gameplay and tournament activities",
            icon: "FaGamepad",
            color: TOKEN_COLORS.COMMUNITY_ECOSYSTEM
        },
        {
            title: "Buy & Burn",
            description: "Regular token buybacks from market and permanent removal from supply",
            icon: "FaExchangeAlt",
            color: TOKEN_COLORS.LIQUIDITY
        },
        {
            title: "Community Initiatives",
            description: "Community-driven burn events and campaigns",
            icon: "FaUsers",
            color: TOKEN_COLORS.TEAM_DEVELOPMENT
        }
    ],

    // Key burn events timeline (historical data)
    timelineEvents: [
        {
            title: "Gameme Party Campaign",
            description: "Over 844 participants played 50K+ games, earning 100K+ Pink Points by burning PINK tokens.",
            color: "pink",
            position: "left",
            tokensBurned: 100000
        },
        {
            title: "Play-to-Burn Initiative",
            description: "31,798 games played, resulting in a massive 52M PINK burned from the treasury!",
            color: "purple",
            position: "right",
            tokensBurned: 52000000
        },
        {
            title: "Platypus NFT Sales",
            description: "Over 11M PINK permanently burned across Moonbeam (7.6M) and Base (3.4M) networks.",
            color: "pink",
            position: "left",
            tokensBurned: 11000000,
            networks: {
                moonbeam: 7600000,
                base: 3400000
            }
        },
        {
            title: "EVRLOOT Auction",
            description: "Almost 400K PINK burned forever after the PINK Villa auction in the EVRLOOT game.",
            color: "purple",
            position: "right",
            tokensBurned: 400000
        }
    ],

    // Total historical burn from events (for quick access)
    get totalHistoricalBurn() {
        return this.timelineEvents.reduce((sum, event) => sum + event.tokensBurned, 0);
    }
};

// For backward compatibility (can be gradually phased out)
export const deflationaryMechanisms = BURN_MECHANISMS.mechanisms;
export const burnTimelineEvents = BURN_MECHANISMS.timelineEvents;
