import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCopy, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import PinkFlame from "~/images/pinkflame.gif";
import PinkBowtie from "~/images/brandassets/pink_bowtie.png";

// 🔥 Total supply (unchanging)
const TOTAL_SUPPLY = 2300001221; // 2.3 Billion

// 🔥 Contract addresses
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

const Pinkonomics = forwardRef<HTMLDivElement>((props, ref) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [burnedAmount, setBurnedAmount] = useState(87460279.08); // 🔥 Burned PINK

  // 🔥 Calculate Burn Percentage
  const burnPercentage = ((burnedAmount / TOTAL_SUPPLY) * 100).toFixed(2);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section
      id="pinkonomics"
      ref={ref}
      className="relative flex flex-col items-center text-white py-24 px-4 md:px-12 bg-black/40"
    >
      {/* 🔥 Background Effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-60 -z-10"></div> */}
      {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-pink-500 rounded-full blur-[140px] opacity-30 -z-10"></div> */}

      {/* 🎯 Section Title */}
      <motion.h2
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-blue-500 text-transparent bg-clip-text text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        PINKONOMICS
      </motion.h2>

      {/* 🔥 Burn Tracker */}
      <div className="relative mt-12 flex flex-col md:flex-row items-center w-full max-w-3xl px-4 md:px-12">
        {/* 🔥 Animated Pink Flame (Always on the Left) */}
        <div className="flex-shrink-0 mr-6 mb-6 md:mb-0">
          <img src={PinkFlame} alt="Burn Animation" className="w-24 h-24 md:w-32 md:h-32 object-contain" /> {/* Adjusted size */}
        </div>

        {/* 🔥 Burn Amount & Progress Bar */}
        <div className="w-full flex flex-col items-center md:items-start">
          {/* 🔥 Burned Number & Text in 2 Lines */}
          <motion.div className="text-3xl md:text-5xl font-bold text-pink-400 text-center md:text-left">
            {burnedAmount.toLocaleString()} PINK Burned
          </motion.div>
          <p className="text-gray-400 text-sm md:text-base mt-1 text-center md:text-left">
            🔥 {burnPercentage}% of the total supply has been burned.
          </p>

          {/* 🔥 Progress Bar (Aligned Below) */}
          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden mt-3">
            <motion.div
              className="h-4 bg-pink-500"
              initial={{ width: "40%" }}
              animate={{ width: `${burnPercentage}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* 📊 Supply Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative">
        {[
          { label: "Total Supply", value: "2,300,001,221 PINK", color: "text-pink-400" },
          { label: "Circulating Supply", value: "1.58B PINK", color: "text-blue-400" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 text-center relative overflow-visible"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {index === 0 && (
             <motion.img
               src={PinkBowtie}
               alt="Pink Bow-tie"
               className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-auto z-10"
               animate={{
                 rotate: [0, 15, -15, 0]
               }}
               transition={{
                 duration: 6,
                 ease: "easeInOut",
                 repeat: Infinity,
               }}
             />
            )}
            {index === 1 && (
             <motion.img
               src={PinkBowtie}
               alt="Pink Bow-tie"
               className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-auto z-10"
               animate={{
                 rotate: [0, -15, 15, 0]
               }}
               transition={{
                 duration: 6,
                 ease: "easeInOut",
                 repeat: Infinity,
               }}
             />
            )}
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 absolute inset-0 rounded-xl z-0" />
            <div className="relative z-1">
              <p className="text-lg md:text-xl font-semibold text-gray-300">{item.label}</p>
              <motion.p
                className={`text-2xl md:text-4xl font-bold ${item.color}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {item.value}
              </motion.p>
           </div>
          </motion.div>
        ))}
      </div>

      {/* 📜 Contract Addresses */}
      <motion.div className="mt-12 w-full max-w-3xl space-y-4 px-4 md:px-0">
        {contractAddresses.map((contract, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white/10 p-4 rounded-lg shadow-md border border-gray-700"
          >
            {/* 🏷 Contract Name (Left) */}
            <div className="flex justify-between items-center w-full md:w-auto">
              <p className="text-white font-medium">{contract.name}</p>

              {/* 📌 Icons - **Moved to Right for Mobile** */}
              <div className="flex space-x-4 md:hidden"> {/* Increased space */}
                <motion.button
                  className="text-pink-400 hover:text-pink-500"
                  onClick={() => copyToClipboard(contract.address)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied === contract.address ? <FaCheck size={18} /> : <FaCopy size={18} />}
                </motion.button>
                <a
                  href={contract.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200"
                  aria-label={`View ${contract.name} on block explorer`}
                  title={`View ${contract.name} on block explorer`}
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>

            {/* 🔗 Address (Below on Mobile, Inline on Desktop) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-auto mt-2 md:mt-0 space-y-2 md:space-y-0 md:space-x-4"> {/* Increased space */}
              <span className="text-gray-400 font-mono text-sm truncate">{contract.address}</span>

              {/* Desktop Icons - Stays Below for Larger Screens */}
              <div className="hidden md:flex space-x-4"> {/* Increased space */}
                <motion.button
                  className="text-pink-400 hover:text-pink-500"
                  onClick={() => copyToClipboard(contract.address)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied === contract.address ? <FaCheck size={18} /> : <FaCopy size={18} />}
                </motion.button>
                <a
                  href={contract.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200"
                  aria-label={`View ${contract.name} on block explorer`}
                  title={`View ${contract.name} on block explorer`}
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      {/* 🚀 External Buttons */}
      <div className="mt-16 w-full flex flex-col md:flex-row md:justify-center gap-4 md:gap-6 px-4">
        {[
          { label: "CoinMarketCap", url: "https://coinmarketcap.com/currencies/pink/", bg: "bg-blue-600", bgHover: "hover:bg-blue-800" },
          { label: "Dex Screener", url: "https://dexscreener.com/search?q=pink", bg: "bg-gray-600", bgHover: "hover:bg-gray-800" },
          { label: "Burn Tracker", url: "https://moonscan.io/token/0xffffffff30478fafbe935e466da114e14fb3563d?a=0x000000000000000000000000000000000000dead", bg: "bg-red-600", bgHover: "hover:bg-red-800" },
        ].map((btn, index) => (
          <motion.a
            key={index}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full md:w-auto px-6 py-3 text-center rounded-lg text-lg font-semibold ${btn.bg} text-white ${btn.bgHover} hover:shadow-xl transition-all flex items-center justify-center space-x-2`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Visit ${btn.label}`}
            title={`Visit ${btn.label}`}
          >
            <span>{btn.label}</span>
          </motion.a>
        ))}
      </div>

    </section>
  );
});

Pinkonomics.displayName = "Pinkonomics";
export default Pinkonomics;
