import { forwardRef } from "react";
import { motion } from "framer-motion";

// Import Exchange Logos
import squidRouterIconYellow from "~/images/exchanges/squid-icon-yellow.svg";
import uniswapIconPink from "~/images/exchanges/uniswap-icon-pink.svg";
import beamswapIcon from "~/images/exchanges/beamswap-icon.svg";
import stellaswapIcon from "~/images/exchanges/stellaswap-icon.svg";
import hydrationIcon from "~/images/exchanges/hydration-icon.png";
import zenlinkIcon from "~/images/exchanges/zenlink-icon.png";

// Exchange Data
const exchanges = [
  { name: "Beamswap", network: "Moonbeam Blockchain", logo: beamswapIcon, link: "https://app.beamswap.io/exchange/braindex" },
  { name: "Stella Swap", network: "Moonbeam Blockchain", logo: stellaswapIcon, link: "https://app.stellaswap.com/exchange/swap" },
  { name: "Zenlink", network: "Cross-Chain DEX Protocol", logo: zenlinkIcon, link: "https://app.zenlink.pro/swap" },
  { name: "Uniswap", network: "Base Network (ETH L2)", logo: uniswapIconPink, link: "https://app.uniswap.org/explore/tokens/base/0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0?inputCurrency=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" },
  { name: "Squid Router", network: "Cross-Chain Swap", logo: squidRouterIconYellow, link: "https://app.squidrouter.com/?chains=42161%2C1284&tokens=0xaf88d065e77c8cc2239327c5edb3a432268e5831%2C0xffffffff30478fafbe935e466da114e14fb3563d" },
  { name: "Hydration", network: "Polkadot Asset Hub", logo: hydrationIcon, link: "https://app.hydration.net/trade/swap?assetIn=10&assetOut=1000021" },
];

const Exchanges = forwardRef<HTMLDivElement>((props, ref) => (
  <section 
    id="exchanges" 
    ref={ref} 
    className="relative flex flex-col items-center bg-black/40 text-white min-h-screen py-24 px-6 md:px-12"
  >
    {/* Background Glow Effects */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-60 -z-10"></div> */}
    {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] bg-pink-500 rounded-full blur-[160px] opacity-30 -z-10"></div> */}

    {/* Section Title */}
    <motion.h1 
      className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-500 text-transparent bg-clip-text text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      Available Exchanges
    </motion.h1>

    {/* Exchange Grid */}
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-16 md:mt-20 w-full max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      {exchanges.map((exchange, index) => (
        <motion.a 
          key={index}
          href={exchange.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center text-center bg-black bg-opacity-50 backdrop-blur-lg rounded-3xl border border-pink-500/20 shadow-lg p-7 md:p-8 w-full max-w-sm transition hover:shadow-pink-400/30"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          aria-label={`Go to ${exchange.name} on ${exchange.network}`}
          title={`Go to ${exchange.name} on ${exchange.network}`}
        >
          {/* Exchange Logo */}
          <motion.img 
            src={exchange.logo} 
            alt={exchange.name} 
            className="w-16 h-16 object-contain mx-auto mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Exchange Name & Network */}
          <div className="mt-2">
            <p className="text-lg md:text-xl font-semibold text-pink-400">{exchange.name}</p>
            <p className="text-sm md:text-base text-gray-300">{exchange.network}</p>
          </div>
        </motion.a>
      ))}
    </motion.div>

    {/* Floating Animated Background Text */}
    <motion.div 
      className="absolute w-full h-full pointer-events-none flex justify-center items-center opacity-20"
      animate={{ x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-7xl md:text-9xl font-bold text-gray-500 opacity-5">EXCHANGES</span>
    </motion.div>
  </section>
));

Exchanges.displayName = "Exchanges";
export default Exchanges;
