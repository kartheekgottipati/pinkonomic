import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi"; // Import bidirectional arrow icon
import baseLight from "~/images/teleport/base-light.svg";
import moonbeamLight from "~/images/teleport/moonbeam-light.svg";
import { Link } from "react-router";

const TELEPORT_APP_URL = "/teleportapp";

const Teleport = forwardRef<HTMLDivElement>((props, ref) => (
  <section 
    id="teleport" 
    ref={ref} 
    className="relative flex flex-col items-center justify-center min-h-screen bg-black/40 text-white py-24 px-6 md:px-12"
  >
    {/* 🔥 Background Glow Effects */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-60 -z-10"></div> */}
    {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-pink-500 rounded-full blur-[160px] opacity-30 -z-10"></div> */}

    {/* 🎯 Section Header */}
    <motion.div
      className="text-center max-w-4xl px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-500 text-transparent bg-clip-text">
        Teleport PINK
      </h2>
      <p className="text-base md:text-lg text-gray-300 mt-4 leading-relaxed">
        Seamlessly transfer your PINK tokens between Moonbeam and Base using LayerZero interoperability.
      </p>
    </motion.div>

    {/* 🚀 Teleport Portal Box */}
    <motion.div
      className="relative mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg shadow-pink-500/30 w-full max-w-3xl text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full p-6 rounded-lg bg-black bg-opacity-70 shadow-inner shadow-white/10 border border-pink-500">
        {/* 🏦 Network Logos */}
        <div className="flex flex-col items-center w-full md:w-1/3 mb-4 md:mb-0">
          <img src={moonbeamLight} alt="Moonbeam" className="w-10 md:w-14 mb-2 object-contain" />
          <p className="text-sm md:text-md text-gray-200">Moonbeam</p>
        </div>

        {/* 🔁 Animated Teleport Icon */}
        <motion.div
          className="text-pink-500 text-2xl md:text-4xl mb-4 md:mb-0"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <BiTransferAlt />
        </motion.div>

        <div className="flex flex-col items-center w-full md:w-1/3">
          <img src={baseLight} alt="Base" className="w-10 md:w-14 mb-2 object-contain" />
          <p className="text-sm md:text-md text-gray-200">Base</p>
        </div>
      </div>
      
      {/* 🚀 CTA Button */}
      <motion.div className="mt-8 w-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          to={TELEPORT_APP_URL}
          className="inline-flex items-center justify-center w-full px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg md:text-xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 transition-all"
          aria-label="Open the Teleport App to transfer PINK tokens between Moonbeam and Base"
          title="Open the Teleport App to transfer PINK tokens between Moonbeam and Base"
        >
          <FaExternalLinkAlt className="mr-2" />
          Open Teleport App
        </Link>
      </motion.div>
    </motion.div>
  </section>
));

Teleport.displayName = "Teleport";
export default Teleport;
