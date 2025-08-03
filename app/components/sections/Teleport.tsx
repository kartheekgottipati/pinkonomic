import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaExchangeAlt } from "react-icons/fa";
import baseLight from "~/images/teleport/base-light.svg";
import moonbeamLight from "~/images/teleport/moonbeam-light.svg";
import { Link } from "react-router";

const TELEPORT_APP_URL = "/teleportapp";

const Teleport = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="teleport"
    ref={ref}
    className="relative py-28 overflow-hidden bg-black"
  >

    <div className="absolute inset-0 bg-gradient-to-b from-pink-950/10 via-black to-black -z-10"></div>


    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-pink-500/10 blur-[120px] -z-5"></div>

    <div className="container mx-auto px-4 md:px-6 max-w-6xl">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bridge your <span className="text-pink-500">PINK</span> tokens
          </h2>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Seamlessly transfer your PINK between blockchain networks with our secure cross-chain bridge powered by LayerZero.
          </p>


          <div className="space-y-4 mb-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-900/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Fast & Secure</h3>
                <p className="text-gray-400">Transfer tokens in minutes with LayerZero's secure messaging protocol</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-900/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">User-Friendly</h3>
                <p className="text-gray-400">Simple interface with clear instructions for seamless transfers</p>
              </div>
            </div>
          </div>


          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to={TELEPORT_APP_URL}
              className="inline-flex items-center px-8 py-4 bg-pink-600 rounded-lg text-white font-medium shadow-lg shadow-pink-600/20"
            >
              <FaRocket className="mr-2" />
              Launch Teleport App
            </Link>
          </motion.div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full"
        >
          {/* Transfer Networks Card */}
          <div className="h-full">
            {/* Main card content */}
            <div className="relative flex flex-col bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 h-full">
              {/* Header with badge */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                  <FaExchangeAlt className="text-pink-400 mr-2" size={12} />
                  <span className="text-xs text-pink-300 font-medium">CROSS-CHAIN</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-8">Transfer Between Networks</h3>
              </div>

              {/* Network transfer visualization - flexbox with proper flex-grow */}
              <div className="flex-grow flex flex-col justify-center items-center py-6">
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-3 lg:gap-6">
                  {/* Moonbeam Network */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-gray-800/70 flex items-center justify-center p-2.5 border border-gray-700/30 mb-3">
                      <img src={moonbeamLight} alt="Moonbeam" className="h-full w-full object-contain" />
                    </div>
                    <h4 className="text-white font-medium">Moonbeam</h4>
                    <p className="text-sm text-gray-400">Polkadot Parachain</p>
                  </div>

                  {/* Transfer connection visualization */}
                  <div className="flex items-center justify-center w-full max-w-[100px] my-4 md:my-0">
                    <div className="h-[40px] flex items-center justify-center relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                      </div>

                      <div className="relative z-10 w-10 h-10 rounded-xl bg-gray-800/70 backdrop-blur-sm flex items-center justify-center border border-gray-700/30">
                        <FaExchangeAlt className="text-pink-500" />
                      </div>
                    </div>
                  </div>

                  {/* Base Network */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-gray-800/70 flex items-center justify-center p-2.5 border border-gray-700/30 mb-3">
                      <img src={baseLight} alt="Base" className="h-full w-full object-contain" />
                    </div>
                    <h4 className="text-white font-medium">Base</h4>
                    <p className="text-sm text-gray-400">Ethereum L2</p>
                  </div>
                </div>
              </div>

              {/* Info panel */}
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-300">
                  Bridge your tokens securely between Moonbeam and Base networks with full cross-chain support
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

Teleport.displayName = "Teleport";
export default Teleport;
