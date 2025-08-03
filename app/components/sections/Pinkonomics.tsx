import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCopy, FaExternalLinkAlt, FaCheck, FaFire, FaChartLine,
  FaCoins, FaExclamationCircle, FaShieldAlt, FaLock,
  FaWallet, FaUsers, FaExchangeAlt, FaChartPie, FaInfoCircle,
  FaUniversity, FaCode, FaFileContract, FaGlobeAmericas,
  FaUserCheck, FaHandHoldingUsd, FaRocket, FaGamepad, FaChartBar,
  FaTint as FaWater, FaQuestion, FaLink, FaDatabase, FaTicketAlt,
  FaHome, FaImage
} from "react-icons/fa";
import { PieChart } from 'react-minimal-pie-chart';

// Import data from data file
import {
  TOTAL_SUPPLY,
  INITIAL_DISTRIBUTION,
  contractAddresses,
  externalLinks,
  securityFeatures,
  tokenMetricsConstants,
  PINK_STATS_API_ENDPOINT
} from "../../data/pinkonomics";
import type { PinkStatsResponse } from "../../data/pinkonomics";

// Helper function to map icon names to React components
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'FaLock': return FaLock;
    case 'FaShieldAlt': return FaShieldAlt;
    case 'FaUsers': return FaUsers;
    case 'FaExclamationCircle': return FaExclamationCircle;
    case 'FaFire': return FaFire;
    case 'FaGamepad': return FaGamepad;
    case 'FaExchangeAlt': return FaExchangeAlt;
    case 'FaChartLine': return FaChartLine;
    case 'FaWallet': return FaWallet;
    case 'FaCoins': return FaCoins;
    case 'FaChartPie': return FaChartPie;
    case 'FaWater': return FaWater;
    case 'FaQuestion': return FaQuestion;
    case 'FaLink': return FaLink;
    case 'FaDatabase': return FaDatabase;
    case 'FaChartBar': return FaChartBar;
    case 'FaUniversity': return FaUniversity;
    default: return FaQuestion;
  }
};

// Security features with React components
const securityFeaturesWithIcons = securityFeatures.map(feature => {
  const IconComponent = getIconComponent(feature.iconName);
  return {
    ...feature,
    icon: <IconComponent className={feature.iconColor} />
  };
});

const Pinkonomics = forwardRef<HTMLDivElement>((props, ref) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [stats, setStats] = useState<PinkStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch data from API
  useEffect(() => {
    const fetchPinkStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(PINK_STATS_API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch PINK stats");
        }
        const data = await response.json();
        setStats(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching PINK stats:", error);
        setIsLoading(false);
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
    price: "$0.00278",
    marketCap: "$4.5M",
    holders: "4,912",
    dailyVolume: "$380K",
    liquidityValue: "$990K",
    updatedAt: new Date().toISOString()
  });
  const [tokenMetrics, setTokenMetrics] = useState({
    circulatingSupply: 0,
    percentCirculating: 0,
    burned: 0,
    percentBurned: 0,
    treasuryHoldings: 0,
    percentTreasury: 0,
    teamAllocation: tokenMetricsConstants.teamAllocation,
    percentTeam: tokenMetricsConstants.percentTeam
  });

  // Process data when stats are updated
  useEffect(() => {
    if (!stats || !stats.balances || !stats.burn) return;

    try {
      // Update total burn amount and percentage
      setBurnedAmount(stats.balances.totalBurnBalance || 0);
      setBurnPercentage((((stats.balances.totalBurnBalance || 0) / (stats.balances.maxSupply || TOTAL_SUPPLY)) * 100).toFixed(2));
      setLastUpdated(stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : new Date().toLocaleString());

      // Update chain-specific burn data
      setChainBurns({
        moonbeam: stats.balances.moonbeamBurnBalance || 0,
        base: stats.balances.baseBurnBalance || 0,
        phala: stats.balances.phalaBurnBalance || 0
      });

      // Update burn rates
      setBurnRates({
        last1Day: stats.burn.burnedLast1Day || 0,
        last7Days: stats.burn.burnedLast7Days || 0,
        last30Days: stats.burn.burnedLast30Days || 0,
        last60Days: stats.burn.burnedLast60Days || 0,
        monthlyAverage: stats.burn.burnedLast30Days || 0
      });

      // Update token metrics with the new data
      setTokenMetrics({
        circulatingSupply: stats.balances.circulatingSupply || (TOTAL_SUPPLY * 0.36),
        percentCirculating: ((stats.balances.circulatingSupply || (TOTAL_SUPPLY * 0.36)) / (stats.balances.maxSupply || TOTAL_SUPPLY)) * 100,
        burned: stats.balances.totalBurnBalance || 0,
        percentBurned: ((stats.balances.totalBurnBalance || 0) / (stats.balances.maxSupply || TOTAL_SUPPLY)) * 100,
        treasuryHoldings: stats.balances.treasuryBalance || tokenMetricsConstants.treasuryAllocation,
        percentTreasury: ((stats.balances.treasuryBalance || tokenMetricsConstants.treasuryAllocation) / (stats.balances.maxSupply || TOTAL_SUPPLY)) * 100,
        teamAllocation: tokenMetricsConstants.teamAllocation,
        percentTeam: tokenMetricsConstants.percentTeam
      });

      // Update market data
      setMarketData({
        marketCap: stats.marketData?.marketCap || '0',
        price: stats.marketData?.price || '0',
        holders: stats.marketData?.holders || '0',
        dailyVolume: stats.marketData?.dailyVolume || '0',
        liquidityValue: stats.marketData?.liquidityValue || '0',
        updatedAt: stats.marketData?.updatedAt || new Date().toISOString()
      });
    } catch (error) {
      console.error("Error processing PINK stats:", error);
    }
  }, [stats]);

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
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
            <FaChartPie className="text-pink-400 mr-2" size={14} />
            <span className="text-sm text-pink-300 font-medium">TOKENOMICS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            PINK<span className="text-pink-500">onomics</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            PINK operates with a transparent tokenomics model designed for long-term sustainability and community benefit. The deflationary mechanism helps increase scarcity over time.
          </p>
        </motion.div>

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
                        {(burnedAmount / 1_000_000).toFixed(1)}M
                      </motion.div>
                      <div className="absolute top-1 right-0 flex flex-col items-end">
                        <div className="text-xs text-gray-400">PINK tokens</div>
                        <div className="text-xs text-pink-500 font-medium mt-0.5 bg-pink-900/20 px-2 py-0.5 rounded-md">
                          ≈ ${((burnedAmount / 1000000) * (marketData?.price ?? 0)).toFixed(1)}M value
                        </div>
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
                        2.5M
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
                    className="bg-gray-900/30 border border-gray-800/50 hover:border-blue-500/30 rounded-2xl p-5 h-full"
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
                    className="bg-gray-900/30 border border-gray-800/50 hover:border-green-500/30 rounded-2xl p-3"
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
            className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 rounded-xl p-6 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                <FaCoins className="text-pink-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Total Supply</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mt-2">
              <div className="text-3xl font-bold text-white">
                2.3B
              </div>
              <div className="text-pink-400 text-sm">PINK tokens</div>
            </div>

            <div className="mt-4 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-pink-500" style={{ width: '100%' }}></div>
            </div>

            <div className="mt-4 text-gray-400 text-sm leading-relaxed">
              <p>Initial token distribution across all chains at launch.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/30 border border-gray-800/50 hover:border-purple-500/30 rounded-xl p-6 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-purple-500/30">
                <FaChartLine className="text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Circulating Supply</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mt-2">
              <div className="text-3xl font-bold text-white">
                {isLoading ? "..." : `${(stats?.balances?.circulatingSupply ? (stats.balances.circulatingSupply / 1000000000).toFixed(1) : "1.4")}B`}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-purple-400 text-sm">PINK tokens</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300">
                  {isLoading ? "..." : `${Math.round((stats?.balances?.circulatingSupply || 0) / (stats?.balances?.maxSupply || TOTAL_SUPPLY) * 100)}% of total`}
                </div>
              </div>
            </div>

            <div className="mt-4 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-purple-500"
                initial={{ width: 0 }}
                whileInView={{
                  width: `${isLoading ? 0 : tokenMetrics.percentCirculating}%`
                }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="mt-4 text-gray-400 text-sm leading-relaxed">
              <p>Tokens available for trading across multiple exchanges and DEXs.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/30 border border-gray-800/50 hover:border-yellow-500/30 rounded-xl p-6 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-yellow-500/30">
                <FaWallet className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Treasury Holdings</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mt-2">
              <div className="text-3xl font-bold text-white">666.4M</div>
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 text-sm">PINK tokens</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/40 text-yellow-300">29% of total</div>
              </div>
            </div>

            <div className="mt-4 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-yellow-500 to-amber-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${tokenMetrics.percentTreasury}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="mt-4 text-gray-400 text-sm leading-relaxed">
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
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-pink-900/40 to-purple-900/40 text-pink-400 text-sm font-medium rounded-full border border-pink-500/20"
                animate={{
                  boxShadow: ['0 0 0px rgba(219,39,119,0.3)', '0 0 15px rgba(219,39,119,0.5)', '0 0 0px rgba(219,39,119,0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DEFLATIONARY MODEL
              </motion.div>
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              The PINK token features an innovative deflationary mechanism with strategic allocation and continuous
              burn processes across multiple chains, designed to enhance value over time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Chart & Supply Stats */}
            <div className="lg:col-span-5">
              <motion.div
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 h-full"
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
                    className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                      <h3 className="text-white font-medium">Initial Supply</h3>
                    </div>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200">2.3B</p>
                    <p className="text-xs text-gray-400">2,300,001,221 PINK</p>
                  </motion.div>

                  <motion.div
                    className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <h3 className="text-white font-medium">Current Supply</h3>
                    </div>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">2.21B</p>
                    <p className="text-xs text-gray-400">2,209,975,342 PINK</p>
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
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Treasury */}
              <motion.div
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 relative overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-blue-500/30">
                    <FaUniversity className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Treasury</h3>
                </div>

                <div className="mb-4">
                  <div className="bg-black/40 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Treasury Allocation</div>
                    <div className="text-3xl font-bold text-blue-400">666.4M</div>
                    <div className="flex items-center justify-between">
                      <div className="text-blue-400 text-sm">PINK tokens</div>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300">29% of total</div>
                    </div>
                  </div>
                </div>

                <div className="text-gray-300 text-sm font-medium mt-2 mb-2">Treasury Purpose:</div>
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <FaCode className="text-blue-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Development initiatives and grants</span>
                      <p className="text-gray-500 text-xs mt-1">Supporting ecosystem expansion</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <FaFire className="text-blue-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Burn campaigns and incentives</span>
                      <p className="text-gray-500 text-xs mt-1">Funding deflationary mechanisms</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-blue-500/30">
                      <FaHandHoldingUsd className="text-blue-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Strategic partnerships</span>
                      <p className="text-gray-500 text-xs mt-1">Expanding ecosystem adoption and utility</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Deflationary Mechanism */}
              <motion.div
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 relative overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(219,39,119,0.2) 0%, rgba(219,39,119,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                    <FaFire className="text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Deflationary</h3>
                </div>

                <div className="bg-black/40 p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-400 mb-1">Supply Reduction</div>
                  <div className="text-3xl font-bold text-pink-400">90.0M</div>
                  <div className="flex items-center justify-between">
                    <div className="text-pink-400 text-sm">PINK burned</div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-pink-900/40 text-pink-300">3.9% of total</div>
                  </div>
                </div>

                <div className="text-gray-300 text-sm font-medium mt-2 mb-2">Burn Mechanisms:</div>
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-pink-500/30">
                      <FaExchangeAlt className="text-pink-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Multi-chain automated burn systems</span>
                      <p className="text-gray-500 text-xs mt-1">Reduces supply across all supported chains</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-pink-500/30">
                      <FaChartLine className="text-pink-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Increasing scarcity over time</span>
                      <p className="text-gray-500 text-xs mt-1">Creating long-term value appreciation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-pink-500/30">
                      <FaFire className="text-pink-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-300">Community-driven burn events</span>
                      <p className="text-gray-500 text-xs mt-1">Regular campaigns incentivizing token burns</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Liquidity & Security */}
              <motion.div
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 relative overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-green-500/30">
                    <FaLock className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Liquidity & Security</h3>
                </div>

                <div className="text-gray-300 text-sm font-medium mt-2 mb-2">Key Features:</div>
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-green-500/30">
                      <FaShieldAlt className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Multi-Chain Liquidity</span>
                      <p className="text-gray-400 text-xs mt-1">Available across multiple chains for seamless cross-chain trading</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-green-500/30">
                      <FaFileContract className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Audited Smart Contracts</span>
                      <p className="text-gray-400 text-xs mt-1">Verified by leading blockchain security firms</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-green-500/30">
                      <FaGlobeAmericas className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Multi-Chain Presence</span>
                      <p className="text-gray-400 text-xs mt-1">Accessible across multiple blockchain ecosystems</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* User Benefits */}
              <motion.div
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800/50 relative overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0) 70%)" }}
                />

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-purple-500/30">
                    <FaUserCheck className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">User Benefits</h3>
                </div>

                <div className="text-gray-300 text-sm font-medium mt-2 mb-2">Holder Advantages:</div>
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                      <FaHandHoldingUsd className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Zero Transaction Fees</span>
                      <p className="text-gray-400 text-xs mt-1">Seamless trading experience without extra costs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                      <FaRocket className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Value Growth Potential</span>
                      <p className="text-gray-400 text-xs mt-1">Deflationary model designed to enhance token value</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-purple-500/30">
                      <FaGamepad className="text-purple-400 text-xs" />
                    </div>
                    <div>
                      <span className="text-gray-200 font-medium">Gaming & DeFi Utility</span>
                      <p className="text-gray-400 text-xs mt-1">Use in games and decentralized finance applications</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Deflationary Mechanisms */}
        <motion.div
          className="mb-20 bg-gray-900/30 p-8 rounded-xl border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-4 border border-pink-500/30">
              <FaFire className="text-pink-400 text-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Deflationary <span className="text-pink-400">Mechanisms</span></h3>
              <p className="text-gray-400 text-sm mt-1">Continuous burn processes reduce supply and increase scarcity over time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 - Pink Ticket Burns */}
            <motion.div
              className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 p-6 rounded-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                  <FaTicketAlt className="text-pink-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">PinkDrop Tournament Burns</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-pink-400 font-semibold">20%</span> of all PINK from tournament tickets are permanently burned.
                <span className="text-pink-400 font-semibold"> 1,000 PINK</span> per ticket.
              </p>
              <div className="mt-4 bg-black/30 rounded-md p-3 border border-pink-500/20">
                <div className="flex items-center">
                  <FaFire className="text-pink-400 mr-2 animate-pulse" />
                  <span className="text-sm text-pink-200">Tournament-driven Burn Mechanism</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - NFT Integration Burns */}
            <motion.div
              className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 p-6 rounded-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                  <FaImage className="text-pink-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">Platypus NFT Burns</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Platypus NFT sales funded a one-time purchase of PINK tokens for burning, enhancing scarcity.
              </p>
              <div className="mt-4 bg-black/30 rounded-md p-3 border border-pink-500/20">
                <div className="flex items-center">
                  <FaFire className="text-pink-400 mr-2 animate-pulse" />
                  <span className="text-sm text-pink-200">One-time NFT Sale Burn</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Pink Villa Sales */}
            <motion.div
              className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 p-6 rounded-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                  <FaHome className="text-pink-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">EVRLOOT Pink Villa Sales</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                PINK tokens from EVRLOOT Pink Villa sales are burned, reducing supply through virtual real estate transactions.
              </p>
              <div className="mt-4 bg-black/30 rounded-md p-3 border border-pink-500/20">
                <div className="flex items-center">
                  <FaFire className="text-pink-400 mr-2 animate-pulse" />
                  <span className="text-sm text-pink-200">Virtual Real Estate Burn</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Gememe Party */}
            <motion.div
              className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 p-6 rounded-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                  <FaGamepad className="text-pink-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">Gememe Party Burns</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Gememe Party burns PINK tokens during gameplay, with each transaction reducing supply.
              </p>
              <div className="mt-4 bg-black/30 rounded-md p-3 border border-pink-500/20">
                <div className="flex items-center">
                  <FaFire className="text-pink-400 mr-2 animate-pulse" />
                  <span className="text-sm text-pink-200">Gaming Integration Burn</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-black/30 p-6 rounded-lg border border-pink-500/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                <FaFire className="text-pink-400" />
              </div>
              <h4 className="text-xl font-semibold text-white">Play-to-Burn Mechanism</h4>
            </div>
            <p className="text-gray-300 max-w-3xl leading-relaxed">
              More gameplay = more burns. More activity directly reduces supply and increases scarcity.
            </p>
          </motion.div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          className="mb-20 bg-gray-900/30 p-8 rounded-xl border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-green-500/30">
              <FaShieldAlt className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Security & <span className="text-green-400">Trust</span></h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {securityFeaturesWithIcons.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/30 border border-gray-800/50 hover:border-green-500/30 rounded-lg p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-green-500/30">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-medium text-white">{feature.title}</h4>
                </div>
                <p className="text-gray-400 text-sm pl-14 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-800/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 border border-green-500/30">
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
          {/* Section header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              <FaFileContract className="text-purple-400 mr-2" size={14} />
              <span className="text-sm text-purple-300 font-medium">BLOCKCHAIN</span>
            </div>

            <h3 className="text-3xl font-bold text-white">
              Verified <span className="text-purple-500">Contracts</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractAddresses.map((contract, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/30 border border-gray-800/50 hover:border-purple-500/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
                        {contract.name.includes("Asset Hub") ?
                          <FaLink className="text-purple-400" /> :
                          <FaShieldAlt className="text-purple-400" />
                        }
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
                    <p className="text-xs text-gray-500 mb-1 ml-1">{contract.name.includes("Asset Hub") ? "Asset ID:" : "Contract Address:"}</p>
                    <div className="bg-black/50 rounded-lg p-4 border border-gray-800 hover:border-pink-500/30 transition-all">
                      <code className="text-gray-100 text-sm md:text-base font-mono break-all">
                        {contract.address}
                      </code>
                    </div>
                    {contract.note && (
                      <div className="mt-2 px-3 py-1.5 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center">
                          <FaExchangeAlt className="text-blue-400 mr-2 text-xs" />
                          <span className="text-blue-300 text-xs">{contract.note}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => copyToClipboard(contract.address)}
                      className="flex-1 py-2 px-4 rounded-lg bg-black/30 hover:bg-black/50 text-pink-400 transition-all flex items-center justify-center gap-2 border border-pink-500/20"
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
                      className="flex-1 py-2 px-4 rounded-lg bg-black/30 hover:bg-black/50 text-purple-400 transition-all flex items-center justify-center gap-2 border border-purple-500/20"
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
            className="mt-10 p-6 rounded-xl overflow-hidden bg-gray-900/30 border border-gray-800/50 hover:border-purple-500/30"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                  <FaExchangeAlt className="text-purple-400 text-3xl" />
                </div>
              </div>
              <div className="md:col-span-10">
                <h4 className="text-2xl font-bold text-white mb-3">Multi-Chain Presence</h4>
                <p className="text-gray-300 leading-relaxed">
                  Born on Polkadot, PINK has expanded its reach to multiple blockchain networks.
                  We've integrated LayerZero and Squid Router for seamless cross-chain transfers,
                  with strategic listings on StellaSwap, Beamswap, and Uniswap (Base).
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 text-center text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Always verify contract addresses before interacting with them. • Last updated: July 31, 2025
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

        {/* Analytics & Resources */}
        <motion.div
          className="mb-20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <FaChartBar className="text-blue-400 mr-2" size={14} />
              <span className="text-sm text-blue-300 font-medium">TRANSPARENCY</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Analytics & <span className="text-blue-500">Resources</span>
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Our transparency commitment includes providing access to real-time analytics and third-party data sources to offer deeper insights into PINK tokenomics and market conditions.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-900/30 border border-gray-800/50 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl p-6 md:p-8 relative">
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
                  // Filter out burn tracker links as they're not needed in this section
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
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      >
                        <div className="bg-gray-900/30 border border-gray-800/50 group-hover:border-blue-500/30 p-5 rounded-xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                          <div className="w-14 h-14 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mb-3 transition-all duration-300 border border-blue-500/30">
                            {icon}
                          </div>
                          <h4 className="text-white font-medium transition-colors">{link.label}</h4>
                          <div className="mt-2 px-3 py-1 bg-black/30 border border-blue-500/20 rounded-full text-xs text-blue-300 transition-all">
                            Explore Data
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
              </div>

              {/* Resource description with icon */}
              <div className="mt-8 p-4 border border-gray-800/50 bg-black/30 rounded-xl flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
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
      </div>
    </section>
  );
});

// Set display name for debugging and dev tools
Pinkonomics.displayName = "Pinkonomics";

export default Pinkonomics;
