import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaGamepad } from "react-icons/fa";
import PinkLogoCircular from "~/images/brandassets/pink_transparent.svg";

const Hero = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="hero"
    ref={ref}
    className="relative min-h-screen flex items-center bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-black overflow-hidden"
  >

    <div className="absolute inset-0 bg-black -z-10"></div>


    <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/15 to-purple-500/15 blur-[100px] -z-5"></div>


    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-pink-500/30"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4 + Math.random() * 4,
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
              { label: "Cross-Chain", value: "Moonbeam, Base & Polkadot" },
              { label: "Fun Games", value: "Play & Earn Rewards" },
              { label: "Community", value: "Token-Powered Governance" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center lg:text-left bg-gray-900/30 rounded-2xl p-4 border border-gray-800"
                whileHover={{ y: -5, borderColor: "rgba(236, 72, 153, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-pink-400 font-medium mb-1">{feature.label}</h3>
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
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-pink-500/20 blur-[70px]"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />


              <div className="absolute inset-[3px] rounded-full border-8 border-gray-800/40 z-20" />


              <motion.div
                className="absolute w-8 h-8 text-pink-500 z-30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <motion.div
                  animate={{
                    y: [-240, -260, -240],
                    rotate: [45, 35, 45],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53Z" />
                  </svg>
                </motion.div>
              </motion.div>


              <motion.div
                className="absolute text-pink-500 font-bold text-lg z-30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <motion.div
                  animate={{
                    y: [-200, -220, -200],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="bg-gray-900 px-3 py-1.5 rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20"
                >
                  $PINK
                </motion.div>
              </motion.div>


              <motion.div
                animate={{
                  rotateY: [-5, 5, -5],
                  rotateX: [3, -3, 3],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
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
                    className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"
                    animate={{
                      rotate: [0, 360],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut", times: [0, 0.2, 1] }
                    }}
                    style={{ filter: "blur(8px)" }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute text-pink-500 font-bold text-sm z-30"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <motion.div
                  animate={{
                    y: [-220, -240, -220],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="bg-gray-900 px-2 py-1 rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20"
                >
                  HODL
                </motion.div>
              </motion.div>
            </div>

            <div className="absolute -inset-10 -z-10 opacity-40">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute top-1/2 left-1/2 h-full w-[3px] bg-gradient-to-t from-transparent via-pink-500/50 to-transparent"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
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