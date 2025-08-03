import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaExternalLinkAlt, FaChevronRight } from "react-icons/fa";

import squidRouterIconYellow from "~/images/exchanges/squid-icon-yellow.svg";
import uniswapIconPink from "~/images/exchanges/uniswap-icon-pink.svg";
import beamswapIcon from "~/images/exchanges/beamswap-icon.svg";
import stellaswapIcon from "~/images/exchanges/stellaswap-icon.svg";
import hydrationIcon from "~/images/exchanges/hydration-icon.png";
import zenlinkIcon from "~/images/exchanges/zenlink-icon.png";

const exchanges = [
  { name: "Beamswap", network: "Moonbeam", logo: beamswapIcon, link: "https://app.beamswap.io/exchange/braindex" },
  { name: "Stella Swap", network: "Moonbeam", logo: stellaswapIcon, link: "https://app.stellaswap.com/exchange/swap" },
  { name: "Zenlink", network: "Multi-Chain", logo: zenlinkIcon, link: "https://app.zenlink.pro/swap" },
  { name: "Uniswap", network: "Base (ETH L2)", logo: uniswapIconPink, link: "https://app.uniswap.org/explore/tokens/base/0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0?inputCurrency=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" },
  { name: "Squid Router", network: "Cross-Chain", logo: squidRouterIconYellow, link: "https://app.squidrouter.com/?chains=42161%2C1284&tokens=0xaf88d065e77c8cc2239327c5edb3a432268e5831%2C0xffffffff30478fafbe935e466da114e14fb3563d" },
  { name: "Hydration", network: "Asset Hub", logo: hydrationIcon, link: "https://app.hydration.net/trade/swap?assetIn=10&assetOut=1000021" },
];

interface Exchange {
  name: string;
  network: string;
  logo: string;
  link: string;
}

const Exchanges = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="exchanges"
    ref={ref}
    className="relative py-24 bg-black overflow-hidden"
  >
    {/* Subtle gradient background */}
    <div className="absolute inset-0 bg-gradient-to-b from-pink-950/5 via-black to-black -z-10"></div>

    {/* Subtle glow effect */}
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/5 rounded-full blur-[120px] -z-5"></div>

    <div className="container mx-auto px-4 max-w-6xl">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          <FaExchangeAlt className="text-pink-400 mr-2" size={14} />
          <span className="text-sm text-pink-300 font-medium">DEX & CEX</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Where to <span className="text-pink-500">Trade</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Buy, sell and swap $PINK across multiple exchanges and networks
        </p>
      </motion.div>

      {/* Exchange grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exchanges.map((exchange, index) => (
          <motion.a
            key={index}
            href={exchange.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-5 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 hover:bg-gray-800/40 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="mr-4 flex-shrink-0 h-12 w-12 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center p-2">
              <img
                src={exchange.logo}
                alt={exchange.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-medium text-lg">{exchange.name}</h3>
              <p className="text-gray-400 text-sm">{exchange.network}</p>
            </div>

            <div className="ml-auto flex-shrink-0">
              <span className="inline-flex items-center text-sm font-medium text-pink-500 group-hover:text-pink-400 transition-colors">
                Trade <FaChevronRight className="ml-1 text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
));

Exchanges.displayName = "Exchanges";
export default Exchanges;
