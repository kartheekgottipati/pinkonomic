import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";


import squidRouterIconYellow from "~/images/exchanges/squid-icon-yellow.svg";
import uniswapIconPink from "~/images/exchanges/uniswap-icon-pink.svg";
import beamswapIcon from "~/images/exchanges/beamswap-icon.svg";
import stellaswapIcon from "~/images/exchanges/stellaswap-icon.svg";
import hydrationIcon from "~/images/exchanges/hydration-icon.png";
import zenlinkIcon from "~/images/exchanges/zenlink-icon.png";


const exchanges = [
  { name: "Beamswap", network: "Moonbeam Blockchain", logo: beamswapIcon, link: "https://app.beamswap.io/exchange/braindex" },
  { name: "Stella Swap", network: "Moonbeam Blockchain", logo: stellaswapIcon, link: "https://app.stellaswap.com/exchange/swap" },
  { name: "Zenlink", network: "Cross-Chain DEX Protocol", logo: zenlinkIcon, link: "https://app.zenlink.pro/swap" },
  { name: "Uniswap", network: "Base Network (ETH L2)", logo: uniswapIconPink, link: "https://app.uniswap.org/explore/tokens/base/0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0?inputCurrency=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" },
  { name: "Squid Router", network: "Cross-Chain Swap", logo: squidRouterIconYellow, link: "https://app.squidrouter.com/?chains=42161%2C1284&tokens=0xaf88d065e77c8cc2239327c5edb3a432268e5831%2C0xffffffff30478fafbe935e466da114e14fb3563d" },
  { name: "Hydration", network: "Polkadot Asset Hub", logo: hydrationIcon, link: "https://app.hydration.net/trade/swap?assetIn=10&assetOut=1000021" },
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
    className="relative py-28 bg-black overflow-hidden"
  >

    <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] bg-repeat opacity-5 -z-10"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-black -z-5"></div>


    <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-pink-600/5 blur-[120px] -z-5"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] -z-5"></div>

    <div className="container mx-auto px-4 max-w-6xl relative">

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-14 h-14 bg-pink-600 rounded-2xl shadow-lg shadow-pink-600/20">
              <FaExchangeAlt className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Where to <span className="text-pink-500">Trade</span>
          </h2>

          <div className="h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Buy, sell and swap $PINK across multiple exchanges and networks
          </p>
        </motion.div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exchanges.map((exchange, index) => (
          <ExchangeCard key={index} exchange={exchange} index={index} />
        ))}
      </div>
    </div>
  </section>
));


const ExchangeCard = ({ exchange, index }: { exchange: Exchange; index: number }) => {

  const actionStyles = [
    "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
    "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
    "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    "bg-black text-pink-400 border border-pink-500",
    "bg-gray-900 text-white border border-purple-500",
    "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
  ];

  const actionStyle = actionStyles[index % actionStyles.length];


  const getExchangeType = () => {
    if (exchange.name === "Squid Router") return "Cross-Chain";
    if (exchange.name === "Uniswap") return "Base DEX";
    if (exchange.name === "Beamswap") return "Moonbeam DEX";
    if (exchange.name === "Stella Swap") return "Moonbeam DEX";
    if (exchange.name === "Zenlink") return "Multi-Chain";
    if (exchange.name === "Hydration") return "Asset Hub";
    return "Exchange";
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >

      <div className="relative h-full group">
        <div className="relative h-full rounded-xl border border-gray-800 hover:border-pink-500/20 transition-all duration-300 overflow-hidden">

          <div className="absolute inset-0 opacity-5">
            {index % 3 === 0 && (
              <div className="absolute inset-0 bg-[url('/images/patterns/pattern1.svg')] bg-repeat"></div>
            )}
            {index % 3 === 1 && (
              <div className="absolute inset-0 bg-[url('/images/patterns/pattern2.svg')] bg-repeat"></div>
            )}
            {index % 3 === 2 && (
              <div className="absolute inset-0 bg-[url('/images/patterns/pattern3.svg')] bg-repeat"></div>
            )}
          </div>


          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

          <div className="relative p-4 md:p-5 flex flex-row items-center">

            <div className={`flex-shrink-0 relative bg-gradient-to-br ${index % 3 === 0 ? "from-pink-900/30 to-black" :
                index % 3 === 1 ? "from-purple-900/30 to-black" :
                  "from-blue-900/30 to-black"
              } w-16 h-16 rounded-full p-3 mr-4 border border-gray-800 group-hover:border-gray-700 transition-colors`}>
              <img
                src={exchange.logo}
                alt={exchange.name}
                className="w-full h-full object-contain"
              />


              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-sm"></div>
              </div>
            </div>


            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-white">{exchange.name}</h3>

              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">{getExchangeType()}</span>

                <a
                  href={exchange.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs px-3 py-1 rounded-full ${actionStyle} font-medium inline-flex items-center transition-all duration-300 hover:opacity-90 hover:scale-105`}
                >
                  Trade
                  <motion.span
                    className="ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Exchanges.displayName = "Exchanges";
export default Exchanges;
