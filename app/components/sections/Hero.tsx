import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaGamepad, FaLink, FaDice, FaUsers } from "react-icons/fa";
import PinkLogoCircular from "~/images/brandassets/pink_transparent.svg";

const Hero = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="hero"
    ref={ref}
    className="relative min-h-screen flex items-center bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-black overflow-hidden"
  >

    <div className="absolute inset-0 bg-black -z-10"></div>

    {/* Main background glow */}
    <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/15 to-purple-500/15 blur-[100px] -z-5"></div>

    {/* Subtle floating particles - reduced count for cleaner look */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/30"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}

    <div className="container mx-auto px-6 py-12 relative z-10">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <motion.div
            className="inline-block bg-pink-500/10 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-medium text-pink-400">
              POLKADOT'S FIRST MEME TOKEN
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Welcome to <span className="text-pink-500">PINK</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Where memes meet utility. A vibrant ecosystem with cross-chain capabilities, games, and NFTs.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/teleportapp"
                className="px-6 py-3 bg-pink-500 rounded-full text-white font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all flex items-center gap-2"
              >
                <FaRocket size={16} /> Bridge Tokens
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/pinkiverse"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-medium border border-gray-700 transition-colors flex items-center gap-2"
              >
                <FaGamepad size={16} /> Play Games
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
            {[
              { label: "Cross-Chain", value: "Moonbeam, Base & Polkadot", icon: FaLink },
              { label: "Fun Games", value: "Play & Earn Rewards", icon: FaDice },
              { label: "Community", value: "Token-Powered Governance", icon: FaUsers }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center lg:text-left bg-gray-900/30 rounded-xl p-3 border border-gray-800"
                whileHover={{ y: -5, borderColor: "rgba(236, 72, 153, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-pink-400 font-medium mb-1 flex items-center justify-center lg:justify-start gap-2">
                  {feature.icon && <feature.icon className="text-pink-400" size={16} />}
                  {feature.label}
                </h3>
                <p className="text-sm text-gray-400">{feature.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">

            <div className="relative w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center border-[3px] border-pink-500/40 shadow-[0_0_60px_rgba(236,72,153,0.25)] overflow-hidden">

              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-pink-500/20 blur-[60px]"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              <div className="absolute inset-[3px] rounded-full border-4 border-gray-800/40 z-20" />


              {/* Removed floating rocket icon and $PINK label for a cleaner design */}

              <motion.div
                animate={{
                  rotateY: [-3, 3, -3],
                  rotateX: [2, -2, 2],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] flex items-center justify-center relative z-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={PinkLogoCircular}
                    alt="PINK Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]"
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"
                    animate={{
                      rotate: [0, 360],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut", times: [0, 0.2, 1] }
                    }}
                    style={{ filter: "blur(6px)" }}
                  />
                </div>
              </motion.div>

              {/* Removed HODL label for a cleaner design */}
            </div>

            <div className="absolute -inset-10 -z-10 opacity-30">
              {/* Reduced number of rays for cleaner look */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute top-1/2 left-1/2 h-full w-[2px] bg-gradient-to-t from-transparent via-pink-500/50 to-transparent"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg)` }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
export default Hero;