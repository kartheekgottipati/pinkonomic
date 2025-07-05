import { motion } from "framer-motion";

const Sparkle = () => {

  const sparkles = [
    { size: 32, x: 0, y: 0, delay: 0 }, // Large sparkle (center)
    { size: 12, x: -8, y: -8, delay: 0.4 }, // Small sparkle (top-left)
    { size: 12, x: -10, y: 18, delay: 0.8 }, // Small sparkle (bottom-left)
  ];

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {sparkles.map((sparkle, index) => (
        <motion.svg
          key={index}
          width={sparkle.size}
          height={sparkle.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.6, 1, 1.2, 1, 0.6],
          }}
          transition={{
            duration: 1.8,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
          }}
        >
          {/* Star-like sparkle shape */}
          <path
            d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
            fill="url(#grad1)"
            stroke="white"
            strokeWidth="1"
          />
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF33AA" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF0099" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF0066" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </motion.svg>
      ))}
    </div>
  );
};

export default Sparkle;