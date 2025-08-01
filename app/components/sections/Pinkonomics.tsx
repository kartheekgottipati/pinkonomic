import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCopy, FaExternalLinkAlt, FaCheck, FaFire, FaChartLine,
  FaCoins, FaExclamationCircle, FaShieldAlt, FaLock,
  FaWallet, FaUsers, FaExchangeAlt, FaChartPie, FaInfoCircle,
  FaUniversity, FaCode, FaBullhorn, FaFileContract, FaGlobeAmericas,
  FaUserCheck, FaHandHoldingUsd, FaRocket, FaGamepad, FaChartBar,
  FaTint as FaWater, FaQuestion, FaLink, FaDatabase
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { PieChart } from 'react-minimal-pie-chart';

// Constants
const TOTAL_SUPPLY = 2300001221;
const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";
const BURN_ADDRESS_URL = "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d?a=0x000000000000000000000000000000000000dead";
const INITIAL_DISTRIBUTION = [
  { title: 'Community & Ecosystem', value: 40, color: '#ec4899' },
  { title: 'Liquidity', value: 30, color: '#8b5cf6' },
  { title: 'Team & Development', value: 15, color: '#06b6d4' },
  { title: 'Marketing', value: 10, color: '#f59e0b' },
  { title: 'Reserve', value: 5, color: '#10b981' },
];

const contractAddresses = [
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

const externalLinks = [
  { label: "CoinMarketCap", url: "https://coinmarketcap.com/currencies/pink/" },
  { label: "Dex Screener", url: "https://dexscreener.com/search?q=pink" },
  { label: "Burn Tracker", url: BURN_ADDRESS_URL, category: "burn" },
  { label: "Liquidity Info", url: "https://dexscreener.com/moonbeam/0x11e07ecc2276b12119dac36ef16df914b8c0cefc" },
  { label: "Holder Analytics", url: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d#balances" },
];

const securityFeatures = [
  {
    title: "Locked Liquidity",
    description: "Initial liquidity locked for 2 years to ensure project stability",
    icon: <FaLock className="text-purple-400" />,
  },
  {
    title: "Verified Contracts",
    description: "All contracts are verified and publicly viewable on blockchain explorers",
    icon: <FaShieldAlt className="text-green-400" />,
  },
  {
    title: "Renounced Ownership",
    description: "Contract ownership renounced, preventing changes to tokenomics",
    icon: <FaUsers className="text-blue-400" />,
  },
  {
    title: "Regular Audits",
    description: "Smart contract audits conducted by independent security firms",
    icon: <FaExclamationCircle className="text-yellow-400" />,
  },
];

const Pinkonomics = forwardRef<HTMLDivElement>((props, ref) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [stats, setStats] = useState<any>({
    balances: {
      maxSupply: 2300001221,
      totalSupply: 2209980141.92268,
      circulatingSupply: 1543575108.21327,
      moonbeamSupply: 2011851454.32097,
      baseSupply: 214935778.286231,
      treasuryBalance: 666405033.709418,
      moonbeamBurnBalance: 67742498.485171,
      baseBurnBalance: 3415695.59214657,
      phalaBurnBalance: 18862885,
      totalBurnBalance: 90021079.0773176,
      lastUpdated: "2025-08-01T03:50:49.478Z"
    },
    burn: {
      burnedLast1Day: 17400,
      burnedLast7Days: 83600,
      burnedLast30Days: 646200,
      burnedLast60Days: 920400,
      updatedAt: "2025-08-01T03:50:49.585Z"
    },
    pinkDrop: {
      pinkSpentOnTickets: 10467000,
      ticketsPurchased: 10467,
      rewardsClaimed: 7731184.2232,
      pinkBurnedByTournaments: 1980400,
      completedTournaments: 417,
      updatedAt: "2025-08-01T03:50:49.690Z"
    },
    marketData: {
      price: "$0.00278",
      marketCap: "$4.5M",
      holders: "4,912",
      dailyVolume: "$380K",
      liquidityValue: "$990K",
      updatedAt: "2025-08-01T03:50:49.690Z"
    },
    lastUpdated: "2025-08-01T03:50:49.690Z"
  });

  // Fetch data from API
  useEffect(() => {
    const fetchPinkStats = async () => {
      try {
        const response = await fetch("https://pink-utils.kargo-dev.workers.dev/pink-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch PINK stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching PINK stats:", error);
      }
    };

    fetchPinkStats();
  }, []);

  const [burnedAmount, setBurnedAmount] = useState<number>(0);
  const [burnPercentage, setBurnPercentage] = useState<string>("0");
  const [burnRates, setBurnRates] = useState({
    last1Day: 0,
    last7Days: 0,
    last30Days: 0,
    last60Days: 0,
    monthlyAverage: 0
  });
  const [chainBurns, setChainBurns] = useState({
    moonbeam: 0,
    base: 0,
    phala: 0
  });
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [marketData, setMarketData] = useState({
    marketCap: "$4.3M",
    price: "$0.00274",
    holders: "4,783",
    dailyVolume: "$342K",
    liquidityValue: "$980K"
  });  // Simulated data that would be fetched from APIs
  const [tokenMetrics, setTokenMetrics] = useState({
    circulatingSupply: 1580000000,
    percentCirculating: 68.7,
    burned: burnedAmount,
    percentBurned: parseFloat(burnPercentage),
    treasuryHoldings: 172500091,
    percentTreasury: 7.5,
    teamAllocation: 345000183,
    percentTeam: 15,
    marketingAllocation: 230000122,
    percentMarketing: 10,
  });

  useEffect(() => {
    const fetchPinkStats = async () => {
      try {
        // Fetch consolidated PINK stats data from new endpoint
        const response = await fetch("https://pink-utils.kargo-dev.workers.dev/pink-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch PINK stats");
        }
        const statsData = await response.json();

        // Update stats state with all data
        setStats(statsData);

        // Update total burn amount and percentage
        setBurnedAmount(statsData.balances.totalBurnBalance);
        setBurnPercentage(((statsData.balances.totalBurnBalance / statsData.balances.maxSupply) * 100).toFixed(2));
        setLastUpdated(new Date(statsData.lastUpdated).toLocaleString());

        // Update chain-specific burn data
        setChainBurns({
          moonbeam: statsData.balances.moonbeamBurnBalance || 0,
          base: statsData.balances.baseBurnBalance || 0,
          phala: statsData.balances.phalaBurnBalance || 0
        });

        // Update burn rates
        setBurnRates({
          last1Day: statsData.burn.burnedLast1Day || 0,
          last7Days: statsData.burn.burnedLast7Days || 0,
          last30Days: statsData.burn.burnedLast30Days || 0,
          last60Days: statsData.burn.burnedLast60Days || 0,
          monthlyAverage: statsData.burn.burnedLast30Days || 0
        });

        // Update token metrics with the new data
        setTokenMetrics({
          circulatingSupply: statsData.balances.circulatingSupply,
          percentCirculating: (statsData.balances.circulatingSupply / statsData.balances.maxSupply) * 100,
          burned: statsData.balances.totalBurnBalance,
          percentBurned: (statsData.balances.totalBurnBalance / statsData.balances.maxSupply) * 100,
          treasuryHoldings: statsData.balances.treasuryBalance,
          percentTreasury: (statsData.balances.treasuryBalance / statsData.balances.maxSupply) * 100,
          teamAllocation: 345000183, // Hardcoded value since not in API
          percentTeam: 15, // Hardcoded value since not in API
          marketingAllocation: 230000122, // Hardcoded value since not in API
          percentMarketing: 10 // Hardcoded value since not in API
        });

        // Update market data
        setMarketData({
          marketCap: statsData.marketData.marketCap,
          price: statsData.marketData.price,
          holders: statsData.marketData.holders,
          dailyVolume: statsData.marketData.dailyVolume,
          liquidityValue: statsData.marketData.liquidityValue
        });
      } catch (error) {
        console.error("Error fetching PINK stats:", error);
      }
    };

    fetchPinkStats();
  }, []);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section
      id="pinkonomics"
      ref={ref}
      className="relative py-24 bg-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-900/10 via-transparent to-black -z-5"></div>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-block relative"
          >
            <HiSparkles className="absolute -top-6 -left-8 text-pink-500 text-3xl opacity-70" />
            <h2 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
              PINK<span className="text-pink-500">onomics</span>
            </h2>
            <div className="h-1 w-1/3 bg-pink-500 mx-auto"></div>
          </motion.div>

          <motion.p
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            PINK operates with a transparent tokenomics model designed for long-term sustainability and community benefit. The deflationary mechanism helps increase scarcity over time.
          </motion.p>
        </div>

        {/* Burn Dashboard - Fresh Design */}
        <motion.div
          className="mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-pink-900 flex items-center justify-center mr-4 shadow-lg shadow-pink-900/20">
                  <FaFire className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">PINK Burn Dashboard</h3>
                  <p className="text-gray-400 text-sm">Real-time deflationary metrics</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 hidden md:flex items-center">
                <FaInfoCircle className="mr-1.5" /> Last updated: <span className="ml-1.5 text-pink-400">{lastUpdated || new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Main Burn Stats */}
              <div className="lg:col-span-5 space-y-3">
                <motion.div
                  className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-0.5 rounded-2xl overflow-hidden shadow-xl shadow-pink-900/10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 relative overflow-hidden">
                    <motion.div
                      className="absolute -top-14 -right-14 w-48 h-48 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(219,39,119,0.2) 0%, rgba(219,39,119,0) 70%)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-base text-gray-300 font-medium">Total PINK Burned</h4>
                        <p className="text-xs text-gray-500">Forever removed from circulation</p>
                      </div>
                      <div className="bg-pink-900/30 px-2.5 py-0.5 rounded-full">
                        <span className="text-pink-400 font-medium text-sm">{burnPercentage}%</span>
                        <span className="text-gray-400 text-sm"> of supply</span>
                      </div>
                    </div>

                    <div className="relative">
                      <motion.div
                        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {(burnedAmount / 1000000).toFixed(1)}M
                      </motion.div>
                      <div className="absolute top-1 right-0 flex flex-col items-end">
                        <div className="text-xs text-gray-400">PINK tokens</div>
                        <div className="text-xs text-pink-500 font-medium mt-0.5 bg-pink-900/20 px-2 py-0.5 rounded-md">≈ ${((burnedAmount / 1000000) * 0.00274).toFixed(1)}M value</div>
                      </div>
                    </div>

                    <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${burnPercentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-0.5 rounded-2xl overflow-hidden shadow-xl shadow-purple-900/10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 relative overflow-hidden">
                    <motion.div
                      className="absolute -bottom-14 -left-14 w-48 h-48 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0) 70%)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 2 }}
                    />

                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-base text-gray-300 font-medium">Monthly Burn Rate</h4>
                        <p className="text-xs text-gray-500">Average burn velocity</p>
                      </div>
                      <div className="bg-purple-900/30 px-2.5 py-0.5 rounded-full flex items-center">
                        <FaChartLine className="text-purple-400 mr-1 text-xs" />
                        <span className="text-purple-400 font-medium text-xs">Active</span>
                      </div>
                    </div>

                    <div className="relative">
                      <motion.div
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-purple-400"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        {(burnRates.monthlyAverage / 1000000).toFixed(1)}M
                      </motion.div>
                      <div className="absolute top-1 right-0">
                        <div className="text-xs text-gray-400">PINK tokens per month</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Burn Metrics & Cross-Chain */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  {/* Burn Metrics */}
                  <motion.div
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-5 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <FaChartPie className="text-blue-400 mr-2" />
                      <h4 className="text-base font-semibold text-white">Burn Metrics</h4>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-black/40 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="text-xs text-gray-400">Last 24 Hours</div>
                          <div className="text-xs text-blue-400">Live</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-white">{burnRates.last1Day.toLocaleString()}</div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400">
                            {((burnRates.last1Day / burnRates.monthlyAverage) * 100).toFixed(1)}% of monthly
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="text-xs text-gray-400">Last 7 Days</div>
                          <div className="text-xs text-indigo-400">Week</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-white">{burnRates.last7Days.toLocaleString()}</div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-indigo-900/40 text-indigo-400">
                            {((burnRates.last7Days / burnRates.monthlyAverage) * 100).toFixed(0)}% of monthly
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="text-xs text-gray-400">Last 30 Days</div>
                          <div className="text-xs text-purple-400">Month</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-white">{burnRates.last30Days.toLocaleString()}</div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-400">
                            {((burnRates.last30Days / burnedAmount) * 100).toFixed(2)}% of total
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cross-Chain Burns */}
                  <motion.div
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FaExchangeAlt className="text-green-400 mr-2" />
                        <h4 className="text-base font-semibold text-white">Cross-Chain Burns</h4>
                      </div>
                      <div className="bg-green-900/30 px-2 py-0.5 rounded-full">
                        <span className="text-green-400 text-xs font-medium">Active</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative overflow-hidden">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-pink-500 mr-1.5"></div>
                              <div className="text-xs text-gray-400">Moonbeam</div>
                            </div>
                            <div className="text-lg font-bold text-white mt-0.5">{(chainBurns.moonbeam / 1000000).toFixed(1)}M</div>
                            <div className="text-xs text-pink-400">{((chainBurns.moonbeam / burnedAmount) * 100).toFixed(1)}% of total</div>
                          </div>

                          <div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div>
                              <div className="text-xs text-gray-400">Base</div>
                            </div>
                            <div className="text-lg font-bold text-white mt-0.5">{(chainBurns.base / 1000000).toFixed(1)}M</div>
                            <div className="text-xs text-blue-400">{((chainBurns.base / burnedAmount) * 100).toFixed(1)}% of total</div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <div className="flex items-center mb-0.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5"></div>
                            <div className="text-xs text-gray-400">Phala</div>
                          </div>
                          <div className="text-lg font-bold text-white">{(chainBurns.phala / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-purple-400">{((chainBurns.phala / burnedAmount) * 100).toFixed(1)}% of total</div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <motion.div
                              className="h-full bg-pink-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(chainBurns.moonbeam / burnedAmount) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.2 }}
                            />
                            <motion.div
                              className="h-full bg-blue-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(chainBurns.base / burnedAmount) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.3 }}
                            />
                            <motion.div
                              className="h-full bg-purple-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(chainBurns.phala / burnedAmount) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.4 }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <div>Chain distribution</div>
                          <div className="text-green-400 text-xs">Multi-chain</div>
                        </div>
                      </div>

                      {/* Added analytics to utilize empty space */}
                      <div className="mt-2 bg-black/40 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-400">Total chains</div>
                          <div className="flex items-center text-xs font-medium">
                            <span className="text-green-400 mr-1">3</span>
                            <span className="text-gray-500">active networks</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1.5">
                          <div className="text-xs text-gray-400">Highest burn %</div>
                          <div className="text-xs font-medium text-pink-400">{((chainBurns.moonbeam / burnedAmount) * 100).toFixed(1)}% on Moonbeam</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-4 md:hidden text-center">
              <FaInfoCircle className="inline mr-1.5" /> Last updated: <span className="ml-1.5 text-pink-400">{lastUpdated || new Date().toLocaleString()}</span>
            </div>
          </div>

          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/20 rounded-full blur-[80px] -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px] -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Core Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-pink-900/50 flex items-center justify-center mr-3">
                <FaCoins className="text-pink-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Total Supply</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mt-2">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200">
                {Math.round(stats?.balances?.maxSupply).toLocaleString()}
              </div>
              <div className="text-pink-400 text-sm">PINK tokens</div>
            </div>

            <div className="mt-3 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-pink-500" style={{ width: '100%' }}></div>
            </div>

            <div className="mt-3 text-gray-400 text-sm">
              <p>Initial token distribution across all chains at launch.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center mr-3">
                <FaChartLine className="text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Circulating Supply</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mt-2">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">{Math.round(tokenMetrics.circulatingSupply).toLocaleString()}</div>
              <div className="flex items-center justify-between">
                <div className="text-purple-400 text-sm">PINK tokens</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300">{Math.round(tokenMetrics.percentCirculating)}% of total</div>
              </div>
            </div>

            <div className="mt-3 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${tokenMetrics.percentCirculating}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="mt-3 text-gray-400 text-sm">
              <p>Tokens available for trading on DEXs and CEXs.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-900/50 flex items-center justify-center mr-3">
                <FaWallet className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Treasury Holdings</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mt-2">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">{Math.round(tokenMetrics.treasuryHoldings).toLocaleString()}</div>
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 text-sm">PINK tokens</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/40 text-yellow-300">{Math.round(tokenMetrics.percentTreasury)}% of total</div>
              </div>
            </div>

            <div className="mt-3 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-yellow-500 to-amber-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${tokenMetrics.percentTreasury}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="mt-3 text-gray-400 text-sm">
              <p>Treasury funds support ecosystem growth, development, and burn campaigns.</p>
            </div>
          </motion.div>
        </div>

        {/* Tokenomics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
              <motion.div
                className="px-3 py-1.5 bg-gradient-to-r from-pink-900/40 to-purple-900/40 text-pink-400 text-xs font-medium rounded-full"
                animate={{
                  boxShadow: ['0 0 0px rgba(219,39,119,0.3)', '0 0 15px rgba(219,39,119,0.5)', '0 0 0px rgba(219,39,119,0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DEFLATIONARY MODEL
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-200 via-pink-300 to-purple-200 text-transparent bg-clip-text mb-3">
              PINK Tokenomics
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The PINK token features an innovative deflationary mechanism with strategic allocation and continuous
              burn processes across multiple chains, designed to enhance value over time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Chart & Supply Stats */}
            <div className="lg:col-span-5">
              <motion.div
                className="bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl p-6 border border-pink-900/30 shadow-lg shadow-pink-900/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Distribution</h3>
                  <div className="flex items-center text-pink-400 text-sm font-medium">
                    <FaChartPie className="mr-1.5" />
                    Allocation Breakdown
                  </div>
                </div>

                <div className="w-full max-w-md mx-auto mb-6">
                  <PieChart
                    data={INITIAL_DISTRIBUTION}
                    lineWidth={40}
                    paddingAngle={2}
                    rounded
                    label={({ dataEntry }) => `${dataEntry.value}%`}
                    labelStyle={{
                      fontSize: '5px',
                      fontFamily: 'sans-serif',
                      fill: '#fff',
                    }}
                    labelPosition={70}
                    animate
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <motion.div
                    className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-4 border border-gray-700/30"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                      <h3 className="text-white font-medium">Initial Supply</h3>
                    </div>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200">{TOTAL_SUPPLY.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{(TOTAL_SUPPLY / 1000000000).toFixed(1)} billion PINK</p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-4 border border-gray-700/30"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <h3 className="text-white font-medium">Current Supply</h3>
                    </div>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">{(TOTAL_SUPPLY - burnedAmount).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">After burn mechanisms</p>
                  </motion.div>
                </div>

                <div className="space-y-3 mt-5">
                  {INITIAL_DISTRIBUTION.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: segment.color }}
                        ></div>
                        <span className="text-gray-300 text-sm">{segment.title}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{segment.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tokenomics Features */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Treasury & Marketing */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-5 border border-blue-900/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3">
                    <FaUniversity className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Treasury & Marketing</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Treasury</div>
                    <div className="text-2xl font-bold text-blue-400">{tokenMetrics.percentTreasury}%</div>
                    <div className="text-xs text-gray-500">{tokenMetrics.treasuryHoldings.toLocaleString()} PINK</div>
                  </div>

                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Marketing</div>
                    <div className="text-2xl font-bold text-indigo-400">{tokenMetrics.percentMarketing}%</div>
                    <div className="text-xs text-gray-500">{tokenMetrics.marketingAllocation.toLocaleString()} PINK</div>
                  </div>
                </div>

                <div className="text-gray-400 text-sm mb-3">Allocation Details:</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaCode className="text-blue-400 text-xs" />
                    </div>
                    <span className="text-gray-300">Development initiatives and grants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-indigo-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaBullhorn className="text-indigo-400 text-xs" />
                    </div>
                    <span className="text-gray-300">Strategic partnerships and campaigns</span>
                  </li>
                </ul>
              </motion.div>

              {/* Deflationary Mechanism */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-5 border border-pink-900/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(219,39,119,0.2) 0%, rgba(219,39,119,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-900/30 flex items-center justify-center mr-3">
                    <FaFire className="text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Deflationary Model</h3>
                </div>

                <div className="bg-black/40 p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-400 mb-1">Supply Reduction</div>
                  <div className="text-2xl font-bold text-pink-400">{burnPercentage}%</div>
                  <div className="text-xs text-gray-500">And increasing with continued burns</div>
                </div>

                <div className="text-gray-400 text-sm mb-3">Burn Mechanisms:</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-pink-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaExchangeAlt className="text-pink-400 text-xs" />
                    </div>
                    <span className="text-gray-300">Multi-chain automated burn systems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-pink-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaChartLine className="text-pink-400 text-xs" />
                    </div>
                    <span className="text-gray-300">Increasing scarcity over time</span>
                  </li>
                </ul>
              </motion.div>

              {/* Liquidity & Security */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-5 border border-green-900/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
                    <FaLock className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Liquidity & Security</h3>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaShieldAlt className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Locked Liquidity</span>
                      <p className="text-gray-400 text-xs mt-0.5">Ensures long-term trading stability and prevents rug pulls</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaFileContract className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Audited Smart Contracts</span>
                      <p className="text-gray-400 text-xs mt-0.5">Verified by leading blockchain security firms</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaGlobeAmericas className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Multi-Chain Presence</span>
                      <p className="text-gray-400 text-xs mt-0.5">Accessible across multiple blockchain ecosystems</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* User Benefits */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-5 border border-purple-900/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center mr-3">
                    <FaUserCheck className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">User Benefits</h3>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaHandHoldingUsd className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Zero Transaction Fees</span>
                      <p className="text-gray-400 text-xs mt-0.5">Seamless trading experience without extra costs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaRocket className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Value Growth Potential</span>
                      <p className="text-gray-400 text-xs mt-0.5">Deflationary model designed to enhance token value</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <FaGamepad className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Gaming & DeFi Utility</span>
                      <p className="text-gray-400 text-xs mt-0.5">Use in games and decentralized finance applications</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Deflationary Mechanisms */}
        <motion.div
          className="mb-20 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-pink-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 flex items-center justify-center mr-3">
              <FaFire className="text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-pink-400">Deflationary Mechanisms</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-black/40 rounded-lg p-6 border border-gray-800 hover:border-pink-500/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <h4 className="text-xl font-medium text-white mb-2">PinkDrop Tickets</h4>
              <p className="text-gray-400">20% of all PinkDrop ticket sales (1,000 PINK per ticket) are automatically burned, creating constant deflationary pressure with each game played.</p>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-lg p-6 border border-gray-800 hover:border-pink-500/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ x: 5 }}
            >
              <h4 className="text-xl font-medium text-white mb-2">Play-to-Burn Games</h4>
              <p className="text-gray-400">Treasury burns 1,000 PINK for every game played in our ecosystem. Our Play-to-Burn campaigns have already burned over 52M PINK tokens!</p>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-lg p-6 border border-gray-800 hover:border-pink-500/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ x: 5 }}
            >
              <h4 className="text-xl font-medium text-white mb-2">NFT & Gaming Integrations</h4>
              <p className="text-gray-400">Over 11M PINK burned from Platypus NFT sales. Strategic integrations with EVRLOOT and other games continuously remove PINK from circulation.</p>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-lg p-6 border border-gray-800 hover:border-pink-500/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <h4 className="text-xl font-medium text-white mb-2">Community Burn Events</h4>
              <p className="text-gray-400">Special burn events like the Platypus NFT giveaway saw the community burn 445K PINK in just 48 hours. Users burn PINK to earn Pink Points in limited-time campaigns.</p>
            </motion.div>
          </div>

          <div className="mt-8 overflow-hidden">
            <motion.h4
              className="text-xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Burn History Timeline
            </motion.h4>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-600 to-purple-600 transform md:translate-x-[-50%] z-0"></div>

              {/* Timeline events */}
              <div className="relative z-10 space-y-8">
                <motion.div
                  className="md:ml-[50%] pl-8 md:pl-12 relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute left-[-8px] md:left-[-16px] top-0 w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/30">
                    <h5 className="text-lg font-medium text-pink-400">Gameme Party Campaign</h5>
                    <p className="text-gray-400 text-sm">Over 844 participants played 50K+ games, earning 100K+ Pink Points by burning PINK tokens.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="md:mr-[50%] md:text-right pr-0 md:pr-12 pl-8 md:pl-0 relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="absolute left-[-8px] md:left-[calc(100%+8px)] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-black"></div>
                  <div className="bg-black/60 p-4 rounded-lg border border-purple-500/30">
                    <h5 className="text-lg font-medium text-purple-400">Play-to-Burn Initiative</h5>
                    <p className="text-gray-400 text-sm">31,798 games played, resulting in a massive 52M PINK burned from the treasury!</p>
                  </div>
                </motion.div>

                <motion.div
                  className="md:ml-[50%] pl-8 md:pl-12 relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute left-[-8px] md:left-[-16px] top-0 w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/30">
                    <h5 className="text-lg font-medium text-pink-400">Platypus NFT Sales</h5>
                    <p className="text-gray-400 text-sm">Over 11M PINK permanently burned across Moonbeam (7.6M) and Base (3.4M) networks.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="md:mr-[50%] md:text-right pr-0 md:pr-12 pl-8 md:pl-0 relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="absolute left-[-8px] md:left-[calc(100%+8px)] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-black"></div>
                  <div className="bg-black/60 p-4 rounded-lg border border-purple-500/30">
                    <h5 className="text-lg font-medium text-purple-400">EVRLOOT Auction</h5>
                    <p className="text-gray-400 text-sm">Almost 400K PINK burned forever after the PINK Villa auction in the EVRLOOT game.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border border-yellow-500/30 bg-yellow-900/10 rounded-lg">
            <div className="flex items-start">
              <FaInfoCircle className="text-yellow-400 mt-1 mr-3" />
              <p className="text-gray-300 text-sm">
                <span className="font-medium text-yellow-300">Next Burn Event:</span> Get ready for the next community burn event on August 15th, 2025.
                An estimated 5 million PINK will be permanently removed from circulation. Stay tuned for special participation rewards!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          className="mb-20 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-pink-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-900/40 flex items-center justify-center mr-3">
              <FaShieldAlt className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400">Security & Trust</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/40 rounded-lg p-6 border border-gray-800 hover:border-green-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.15)"
                }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-medium text-white">{feature.title}</h4>
                </div>
                <p className="text-gray-400 text-sm pl-12">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 p-4 bg-black/40 rounded-lg border border-green-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-start">
              <div className="bg-green-900/40 p-2 rounded-full mr-3">
                <FaShieldAlt className="text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">Community-First Security</h4>
                <p className="text-gray-400 text-sm">
                  PINK places security at the forefront, with contract ownership renounced, ensuring that no single entity can alter the tokenomics or mechanics.
                  All smart contracts are verified on blockchain explorers and regularly audited by third-party security firms.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contract Addresses */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-500/70"></div>
            <h3 className="text-3xl font-bold text-center text-white">Verified Contracts</h3>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-500/70"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractAddresses.map((contract, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-pink-900/20 p-0.5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(219, 39, 119, 0.2)" }}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <FaShieldAlt className="text-pink-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{contract.name}</h4>
                    </div>
                    {contract.verified && (
                      <span className="px-3 py-1 bg-green-900/30 border border-green-500/30 text-green-400 text-xs rounded-full flex items-center gap-1">
                        <FaCheck size={10} /> Verified
                      </span>
                    )}
                  </div>

                  <div className="mb-5 flex-grow">
                    <p className="text-xs text-gray-500 mb-1 ml-1">Contract Address:</p>
                    <div className="bg-black/50 rounded-lg p-4 border border-gray-800 hover:border-pink-500/30 transition-all">
                      <code className="text-gray-100 text-sm md:text-base font-mono break-all">
                        {contract.address}
                      </code>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => copyToClipboard(contract.address)}
                      className="flex-1 py-2 px-4 rounded-lg bg-pink-900/20 hover:bg-pink-900/40 text-pink-400 transition-all flex items-center justify-center gap-2 border border-pink-500/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {copied === contract.address ? (
                        <>
                          <FaCheck size={14} /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy size={14} /> Copy
                        </>
                      )}
                    </motion.button>

                    <motion.a
                      href={contract.explorer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-4 rounded-lg bg-purple-900/20 hover:bg-purple-900/40 text-purple-400 transition-all flex items-center justify-center gap-2 border border-purple-500/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt size={14} /> Explorer
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 p-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.15)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <FaExchangeAlt className="text-purple-400 text-3xl" />
                </div>
              </div>
              <div className="md:col-span-10">
                <h4 className="text-2xl font-bold text-white mb-3">Cross-Chain Ecosystem</h4>
                <p className="text-gray-300 leading-relaxed">
                  PINK has expanded beyond Moonbeam to multiple chains including Base Network.
                  We've integrated LayerZero and Squid Router for seamless cross-chain transfers,
                  with strategic listings on StellaSwap, Beamswap, and Uniswap (Base).
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </motion.div>

        {/* Analytics & Resources - Redesigned */}
        <motion.div
          className="mb-20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
              <motion.div
                className="px-3 py-1.5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 text-blue-400 text-xs font-medium rounded-full"
                animate={{
                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 15px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TRANSPARENCY
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-300 text-transparent bg-clip-text mb-3">
              Analytics & Resources
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our transparency commitment includes providing access to real-time analytics and third-party data sources to offer deeper insights into PINK tokenomics and market conditions.
            </p>
          </div>

          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-black/90 p-0.5 rounded-2xl overflow-hidden shadow-lg shadow-blue-900/10"
            whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 relative">
              <motion.div
                className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {externalLinks
                  // Filter out the burn tracker link as it's already included in the "Join the Burn Movement" section
                  .filter(link => !link.category || link.category !== "burn")
                  .map((link, index) => {
                    // Determine icon based on link label
                    let icon;
                    if (link.label.includes("Market")) {
                      icon = <FaChartLine className="text-blue-400 group-hover:text-white transition-colors" size={20} />;
                    } else if (link.label.includes("Screener")) {
                      icon = <FaChartBar className="text-indigo-400 group-hover:text-white transition-colors" size={20} />;
                    } else if (link.label.includes("Liquidity")) {
                      icon = <FaWater className="text-cyan-400 group-hover:text-white transition-colors" size={20} />;
                    } else if (link.label.includes("Holder") || link.label.includes("Analytics")) {
                      icon = <FaUsers className="text-green-400 group-hover:text-white transition-colors" size={20} />;
                    } else {
                      icon = <FaExternalLinkAlt className="text-purple-400 group-hover:text-white transition-colors" size={20} />;
                    }

                    return (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 * index }}
                        whileHover={{ y: -5, scale: 1.03 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -z-10"></div>
                        <div className="bg-gray-900/90 border border-gray-800 group-hover:border-blue-500/50 p-5 rounded-xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                          <div className="w-14 h-14 rounded-xl bg-gray-800/80 group-hover:bg-blue-900/50 flex items-center justify-center mb-3 transition-all duration-300 shadow-lg shadow-blue-900/5 group-hover:shadow-blue-500/20">
                            {icon}
                          </div>
                          <h4 className="text-gray-200 font-medium group-hover:text-white transition-colors">{link.label}</h4>
                          <div className="mt-2 px-3 py-1 bg-gray-800/50 group-hover:bg-blue-900/50 rounded-full text-xs text-gray-400 group-hover:text-blue-200 transition-all">
                            Explore Data
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
              </div>

              {/* Resource description with icon */}
              <div className="mt-8 p-4 border border-blue-900/20 bg-blue-900/5 rounded-xl flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <FaInfoCircle className="text-blue-400" />
                  </div>
                </div>
                <div className="text-gray-300 text-sm">
                  <span className="font-medium text-blue-400">Pro Tip:</span> These third-party analytics tools provide real-time insights into PINK's market performance, liquidity depth, and holder distribution. Our commitment to transparency means all on-chain data is available to everyone.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Join the Burn Movement - Redesigned Call to Action */}
        <motion.div
          className="mb-16 overflow-visible"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">
            {/* Animated background elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-40 h-40 bg-pink-600/20 rounded-full blur-[80px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            />

            {/* Main content with fiery border effect */}
            <div className="relative z-10 p-1 rounded-2xl bg-gradient-to-r from-pink-600/50 via-red-500/50 to-amber-500/50 overflow-hidden shadow-lg shadow-pink-900/30">
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-orange-500/40"
                    style={{
                      width: Math.random() * 120 + 30,
                      height: Math.random() * 120 + 30,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100],
                      opacity: [0.7, 0],
                      scale: [1, 1.5]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>

              <div className="bg-gray-900/95 backdrop-blur-md rounded-xl p-8 md:p-10 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left content area */}
                  <div className="lg:col-span-7">
                    <div className="mb-2 inline-block">
                      <motion.div
                        className="px-3 py-1 bg-gradient-to-r from-pink-900/60 to-amber-900/60 rounded-full"
                        animate={{
                          boxShadow: ['0 0 0px rgba(249,115,22,0.0)', '0 0 15px rgba(249,115,22,0.4)', '0 0 0px rgba(249,115,22,0.0)']
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-amber-400 text-xs font-medium uppercase tracking-wide flex items-center">
                          <FaFire className="mr-1.5" size={14} /> Community-Driven Deflation
                        </span>
                      </motion.div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-amber-300 mb-4">
                      Join the Burn Movement
                    </h3>

                    <div className="text-gray-300 mb-6 space-y-4">
                      <p>
                        Be part of PINK's deflationary ecosystem by participating in our burn events and games.
                        Every PINK token burned increases the scarcity and potential value of the remaining supply.
                      </p>

                      <div className="grid grid-cols-2 gap-4 bg-black/50 p-4 rounded-xl border border-pink-600/20">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Total Burned</div>
                          <div className="text-xl font-bold text-amber-400">{(burnedAmount / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-pink-400">{burnPercentage}% of supply</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Monthly Rate</div>
                          <div className="text-xl font-bold text-amber-400">{(burnRates.monthlyAverage / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-pink-400">Tokens removed</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href="/pinkdrop"
                        className="px-6 py-3 bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-bold rounded-xl flex items-center shadow-lg shadow-pink-900/30"
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 10px 25px -5px rgba(249,115,22,0.4)"
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FaGamepad className="mr-2" /> Play to Burn
                      </motion.a>

                      <motion.a
                        href={BURN_ADDRESS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-black/50 border border-pink-500 text-white font-medium rounded-xl flex items-center hover:bg-black/80"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FaExternalLinkAlt className="mr-2" /> View on Explorer
                      </motion.a>
                    </div>
                  </div>

                  {/* Right content area - Burn Address Card */}
                  <div className="lg:col-span-5 relative">
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <span className="text-4xl">🔥</span>
                    </motion.div>

                    <div className="bg-gradient-to-br from-pink-900/40 via-pink-800/30 to-amber-900/40 p-0.5 rounded-xl shadow-xl shadow-pink-900/20">
                      <div className="bg-black/90 backdrop-blur-sm rounded-xl p-5 border border-pink-500/10">
                        <h4 className="text-xl font-medium text-white mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-600 to-amber-600 flex items-center justify-center mr-2.5 shadow-md shadow-pink-900/30">
                            <FaFire className="text-white" />
                          </div>
                          Official Burn Address
                        </h4>

                        <div className="bg-gray-900/90 p-3 rounded-lg flex items-center justify-between mb-4 border border-pink-800/20">
                          <code className="text-amber-300 text-sm font-mono truncate">{BURN_ADDRESS}</code>
                          <motion.button
                            onClick={() => copyToClipboard(BURN_ADDRESS)}
                            className="p-2.5 rounded-lg bg-pink-900/30 hover:bg-pink-800/50 text-pink-400 transition-all ml-2 flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Copy burn address"
                          >
                            {copied === BURN_ADDRESS ? (
                              <FaCheck className="text-green-400" size={16} />
                            ) : (
                              <FaCopy className="text-pink-400" size={16} />
                            )}
                          </motion.button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start p-3 bg-pink-900/10 rounded-lg border border-pink-900/20">
                            <div className="mt-0.5 mr-3">
                              <FaExclamationCircle className="text-pink-400" />
                            </div>
                            <div className="text-sm text-gray-300">
                              <strong className="text-pink-400">Important:</strong> Tokens sent to this address are permanently removed from circulation and cannot be recovered.
                            </div>
                          </div>

                          <div className="p-3 bg-amber-900/10 rounded-lg border border-amber-900/20">
                            <div className="text-sm text-gray-300 flex items-center">
                              <FaInfoCircle className="text-amber-400 mr-2" />
                              Manual burns contribute to PINK's deflationary tokenomics and may earn rewards during burn events.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Always verify contract addresses before interacting with them. • Last updated: July 31, 2025
        </motion.div>
      </div>
    </section>
  );
});

// Set display name for debugging and dev tools
Pinkonomics.displayName = "Pinkonomics";

export default Pinkonomics;
