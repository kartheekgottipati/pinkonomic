import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FaHome, FaGamepad } from "react-icons/fa";

const ANIMATION_DURATION = 4000;

const PinkDrop = forwardRef<HTMLDivElement>((props, ref) => {

  const [gameUrl] = useState(`https://pink.frictionlessgaming.com/?v=${Date.now()}`);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, ANIMATION_DURATION);

    return () => {
      document.body.style.overflow = originalStyle;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (iframeLoaded && animationComplete) {
      setIsLoading(false);
    }
  }, [iframeLoaded, animationComplete]);

  return (
    <section
      id="pinkdrop"
      ref={ref}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-950"
    >
      <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 sm:px-8 z-40 bg-gradient-to-b from-gray-900/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-pink-500/30 text-white hover:bg-black/80 hover:border-pink-500/50 transition-all"
          >
            <FaHome size={16} />
            <span className="text-sm font-medium hidden sm:inline">Home</span>
          </Link>

          <Link
            to="/pinkiverse"
            aria-label="All Games"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-pink-500/30 text-white hover:bg-black/80 hover:border-pink-500/50 transition-all"
          >
            <FaGamepad size={16} />
            <span className="text-sm font-medium hidden sm:inline">All Games</span>
          </Link>
        </div>

        <h1 className="font-bold text-xl bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
          PinkDrop
        </h1>

        <Link
          to="/pinkiverse/pinkdrop"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-pink-500/30 text-white hover:bg-black/80 hover:border-pink-500/50 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-400">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Game Info</span>
        </Link>
      </div>

      <div className="w-[1026px] h-[601px] relative">

        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-pink-500/10 blur-md -z-10"></div>
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-pink-500/30 via-transparent to-purple-500/20 pointer-events-none"></div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`atom-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-pink-500"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.5 + Math.random() * 1.5,
                    opacity: 0.3 + Math.random() * 0.7
                  }}
                  animate={{
                    x: [0, Math.sin(i * 45) * 250, 0],
                    y: [0, Math.cos(i * 45) * 250, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}

              <motion.div
                className="relative flex items-center justify-center mb-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >

                <motion.div
                  className="text-6xl font-bold text-pink-500"
                  animate={{ scale: [1, 1.1, 1], textShadow: ['0 0 10px rgba(236,72,153,0.3)', '0 0 20px rgba(236,72,153,0.6)', '0 0 10px rgba(236,72,153,0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  PINK
                </motion.div>
              </motion.div>

              <motion.div
                className="text-pink-400 font-medium text-lg mt-4 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>{animationComplete && iframeLoaded ? "Ready to play" : "Loading PinkDrop"}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ...
                </motion.span>
              </motion.div>

              <motion.div
                className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: animationComplete && iframeLoaded ? "100%" : ["0%", "95%"]
                  }}
                  transition={
                    animationComplete && iframeLoaded
                      ? { duration: 0.3 }
                      : { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                  }
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          src={gameUrl}
          title="PinkDrop Game"
          className="w-full h-full bg-black rounded-xl overflow-hidden"
          style={{ display: "block" }}
          onLoad={() => setIframeLoaded(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-pink-900/15 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-[50vh] bg-gradient-to-t from-pink-900/15 to-transparent"></div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-pink-500/5 rounded-full blur-[180px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
});

PinkDrop.displayName = "PinkDrop";
export default PinkDrop;

export function meta() {
  return [
    { title: "Play PinkDrop | Pinkonomic" },
    {
      name: "description",
      content: "Play PinkDrop, the addictive blockchain game in the Pinkonomic ecosystem. Merge parachains, climb leaderboards, and enjoy the Pinkiverse!",
    },
  ];
}