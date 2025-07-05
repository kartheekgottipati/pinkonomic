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
    {/* Background elements */}
    <div className="absolute inset-0 bg-gradient-to-b from-pink-950/10 via-black to-black -z-10"></div>
    
    {/* Subtle glow effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-pink-500/10 blur-[120px] -z-5"></div>
    
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column: Content */}
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
          
          {/* Features */}
          <div className="space-y-4 mb-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-900/30 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">User-Friendly</h3>
                <p className="text-gray-400">Simple interface with clear instructions for seamless transfers</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
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
        
        {/* Right column: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Card with border glow */}
            <div className="absolute -inset-1 bg-pink-500/30 rounded-2xl blur-sm"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 overflow-hidden">
              <h3 className="text-xl font-medium text-white mb-8 text-center">Transfer Between Networks</h3>
              
              {/* Network Display */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {/* Moonbeam Side */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full p-4 mb-3">
                    <img src={moonbeamLight} alt="Moonbeam" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Moonbeam</h4>
                  <p className="text-sm text-gray-400">Polkadot Parachain</p>
                </div>
                
                {/* Transfer Animation */}
                <div className="relative">
                  <div className="w-full h-0.5 bg-pink-500 my-2"></div>
                  
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center z-10 border border-gray-700 shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FaExchangeAlt className="text-pink-400" />
                  </motion.div>
                  
                  {/* Animated particles */}
                  <motion.div
                    className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-pink-500"
                    animate={{ 
                      x: ["0%", "100%"],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-purple-500"
                    animate={{ 
                      x: ["0%", "-100%"],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Base Side */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full p-4 mb-3">
                    <img src={baseLight} alt="Base" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Base</h4>
                  <p className="text-sm text-gray-400">Ethereum L2</p>
                </div>
              </div>
              
              {/* Supporting text */}
              <div className="mt-10 p-4 bg-gray-800/50 rounded-lg text-center">
                <p className="text-sm text-gray-400">Bridge your tokens securely between Moonbeam and Base networks with full cross-chain support</p>
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
