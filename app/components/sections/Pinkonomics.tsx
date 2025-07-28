import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCopy, FaExternalLinkAlt, FaCheck, FaFire, FaChartLine, FaCoins, FaExclamationCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";


const TOTAL_SUPPLY = 2300001221;


const contractAddresses = [
  {
    name: "PINK on Moonbeam",
    address: "0xfFfFFfFf30478fAFBE935e466da114E14fB3563d",
    explorer: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d",
  },
  {
    name: "PINK on Base",
    address: "0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0",
    explorer: "https://basescan.org/token/0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0",
  },
  {
    name: "PINKDROP Game",
    address: "0x7bFC36fA3f81aD31cec770149695717757297462",
    explorer: "https://moonscan.io/address/0x7bFC36fA3f81aD31cec770149695717757297462#tokentxns",
  },
];


const externalLinks = [
  { label: "CoinMarketCap", url: "https://coinmarketcap.com/currencies/pink/" },
  { label: "Dex Screener", url: "https://dexscreener.com/search?q=pink" },
  { label: "Burn Tracker", url: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d?a=0x000000000000000000000000000000000000dead" },
];

const Pinkonomics = forwardRef<HTMLDivElement>((props, ref) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [burnedAmount, setBurnedAmount] = useState<number>(87460279.08);
  const [burnPercentage, setBurnPercentage] = useState<string>(((burnedAmount / TOTAL_SUPPLY) * 100).toFixed(2));

  useEffect(() => {
    const fetchBurnedData = async () => {
      try {
        const response = await fetch("https://pink-utils.kargo-dev.workers.dev/burn");
        if (!response.ok) {
          throw new Error("Failed to fetch burn data");
        }
        const data = await response.json();
        setBurnedAmount(data.totalBurn);
        setBurnPercentage(((data.totalBurn / TOTAL_SUPPLY) * 100).toFixed(2));
      } catch (error) {
        console.error("Error fetching burn data:", error);
      }
    };

    fetchBurnedData();
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
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-900/50 flex items-center justify-center">
                <FaCoins className="text-pink-400" />
              </div>
              <div className="text-gray-400">Total Supply</div>
            </div>
            <div className="text-3xl font-bold text-white">2,300,001,221</div>
            <div className="text-pink-400 text-sm mt-1">PINK</div>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center">
                <FaChartLine className="text-purple-400" />
              </div>
              <div className="text-gray-400">Circulating Supply</div>
            </div>
            <div className="text-3xl font-bold text-white">1.58B</div>
            <div className="text-purple-400 text-sm mt-1">PINK</div>
          </motion.div>

          <motion.div
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/30 transition-all hover:shadow-lg hover:shadow-pink-500/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-900/50 flex items-center justify-center">
                <FaFire className="text-red-400" />
              </div>
              <div className="text-gray-400">Burned</div>
            </div>
            <div className="text-3xl font-bold text-white">{burnedAmount.toLocaleString()}</div>
            <div className="text-red-400 text-sm mt-1">PINK ({burnPercentage}%)</div>

            <div className="mt-3 w-full bg-gray-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${burnPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mb-16 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-pink-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-900/40 flex items-center justify-center mr-3">
              <FaExclamationCircle className="text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-pink-400">Contract Addresses</h3>
          </div>

          <div className="space-y-4">
            {contractAddresses.map((contract, index) => (
              <motion.div
                key={index}
                className="bg-black/50 rounded-lg p-4 border border-gray-800 hover:border-pink-500/30 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="font-medium text-white">{contract.name}</div>

                  <div className="flex items-center gap-2 flex-1 sm:justify-end">
                    <code className="bg-black/70 px-3 py-2 rounded text-gray-400 text-sm truncate max-w-xs sm:max-w-sm md:max-w-md">
                      {contract.address}
                    </code>

                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button
                        onClick={() => copyToClipboard(contract.address)}
                        className="p-2 rounded-lg bg-gray-800 hover:bg-pink-900/60 text-pink-400 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Copy address"
                      >
                        {copied === contract.address ? <FaCheck size={16} /> : <FaCopy size={16} />}
                      </motion.button>

                      <motion.a
                        href={contract.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800 hover:bg-purple-900/60 text-gray-400 hover:text-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View on explorer"
                      >
                        <FaExternalLinkAlt size={16} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        <div className="flex flex-wrap justify-center gap-4">
          {externalLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-gray-800 border border-transparent hover:border-pink-500/30 rounded-full text-white shadow-lg hover:shadow-pink-500/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Always verify contract addresses before interacting with them.
        </motion.div>
      </div>
    </section>
  );
});

Pinkonomics.displayName = "Pinkonomics";
export default Pinkonomics;