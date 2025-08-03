import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaGamepad, FaLink, FaDice, FaUsers, FaChevronDown } from "react-icons/fa";
import PinkLogoCircular from "~/images/brandassets/pink_transparent.svg";

const Hero = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="hero"
    ref={ref}
    className="relative min-h-screen flex items-center bg-black overflow-hidden"
  >
    {/* Fun meme-style background elements */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.2),transparent_70%)] -z-10"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_70%)] -z-10"></div>

    {/* Retro-style grid for meme vibe */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(236,72,153,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(236,72,153,0.2) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
        }}
      ></div>
    </div>

    {/* Neon-style glow blobs for fun meme aesthetic */}
    <motion.div
      className="absolute top-1/3 left-[15%] w-[400px] h-[400px] rounded-full bg-pink-500/25 blur-[100px] -z-5"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-1/3 right-[15%] w-[450px] h-[450px] rounded-full bg-purple-500/20 blur-[130px] -z-5"
      animate={{
        scale: [1.2, 0.9, 1.2],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />

    <div className="container mx-auto px-6 py-12 relative z-10">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full px-5 py-2 border border-pink-500/40 backdrop-blur-sm shadow-lg shadow-pink-500/10">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse mr-2"></div>
                <span className="text-sm font-bold text-white">
                  POLKADOT'S FIRST MEME TOKEN
                </span>
                <span className="ml-2 -mr-1">🚀</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-7xl sm:text-[8rem] md:text-[11rem] font-black text-white tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 animate-gradient-x">PINK</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="text-pink-400 font-bold">Memes meet utility</span> in a vibrant ecosystem with <span className="text-purple-400 font-bold">cross-chain capabilities</span>, <span className="text-blue-400 font-bold">fun games</span>, and exciting <span className="text-pink-400 font-bold">NFT projects</span>.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3, rotate: [-1, 1, -1] }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/teleportapp"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full text-white font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center gap-2 border border-pink-300/30"
              >
                <FaRocket size={16} className="animate-bounce" /> Bridge Tokens 🌉
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3, rotate: [1, -1, 1] }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/pinkiverse"
                className="px-6 py-3 bg-gradient-to-br from-gray-900 to-purple-900/90 hover:from-gray-800 hover:to-purple-800 rounded-full text-white font-bold border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <FaGamepad size={16} className="text-purple-400 animate-pulse" /> Play Games 🎮
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {[
              { label: "Cross-Chain", value: "Moonbeam, Base & Polkadot", icon: FaLink, color: "from-pink-500/20 to-purple-500/20", iconColor: "text-pink-400" },
              { label: "Fun Games", value: "Play & Earn Rewards", icon: FaDice, color: "from-purple-500/20 to-blue-500/20", iconColor: "text-purple-400" },
              { label: "Community", value: "Token-Powered Governance", icon: FaUsers, color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + (index * 0.1), duration: 0.5 }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-pink-500/30 p-4 shadow-lg shadow-black/20"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                  borderColor: "rgba(236, 72, 153, 0.3)"
                }}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} mb-3 flex items-center justify-center shadow-inner border border-white/10`}>
                  {feature.icon && <feature.icon className={feature.iconColor} size={18} />}
                </div>
                <h3 className="text-white font-semibold text-lg">{feature.label}</h3>
                <p className="text-gray-400 mt-1 text-sm">{feature.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            {/* Modern glassmorphism container */}
            <div className="relative w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full flex items-center justify-center overflow-hidden">
              {/* Glass effect base */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent backdrop-blur-sm rounded-full border border-white/10"></div>

              {/* Inner ring with animation */}
              <motion.div
                className="absolute inset-[20px] rounded-full border-[1px] border-pink-500/20"
                animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Middle ring with reverse animation */}
              <motion.div
                className="absolute inset-[40px] rounded-full border-[1px] border-purple-500/20"
                animate={{ scale: [1.02, 1, 1.02], opacity: [0.7, 0.4, 0.7] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Animated background glow */}
              <motion.div
                className="absolute inset-[60px] rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-[30px]"
                animate={{
                  rotate: [0, 360],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Floating orbital particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`orbital-${i}`}
                  className="absolute rounded-full bg-white w-1.5 h-1.5 shadow-lg shadow-pink-500/30"
                  initial={{
                    scale: 0.5 + Math.random() * 0.5
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: {
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'center',
                    transform: `translateX(-50%) translateY(-50%) rotate(${i * 72}deg) translateX(${180 + i * 15}px)`,
                  }}
                />
              ))}

              <motion.div
                animate={{
                  rotateY: [-3, 3, -3],
                  rotateX: [2, -2, 2],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center relative z-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Logo container with better glow */}
                <div className="relative w-full h-full group">
                  <motion.div
                    className="w-full h-full absolute rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <img
                    src={PinkLogoCircular}
                    alt="PINK Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(236,72,153,0.6)] relative z-10"
                  />

                  {/* Shine effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent rounded-full pointer-events-none"
                    animate={{
                      rotate: [0, 360],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
                    }}
                    style={{ filter: "blur(8px)" }}
                  />
                </div>
              </motion.div>
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