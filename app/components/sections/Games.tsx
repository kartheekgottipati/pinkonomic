import { forwardRef, type JSX } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaGamepad, FaTrophy, FaUsers } from "react-icons/fa";
import { GiJoystick } from "react-icons/gi";

// Import game images
import pinkDropPreview from "~/images/games/pinkdrop-preview.jpg";
import pinknessOverdrivePreview from "~/images/games/pinkness-overdrive-preview.jpg";
import pinkBulletPreview from "~/images/games/pink-bullet-preview.jpg";
import pinkamolePreview from "~/images/games/pink-a-mole-preview.jpg";

// Games Data
const games = [
  { name: "Pink Drop", tagline: "Merge parachains, climb the leaderboard!", image: pinkDropPreview, link: "/pinkiverse/pinkdrop" },
  { name: "Pinkness Overdrive", tagline: "Race through snow & dodge obstacles!", image: pinknessOverdrivePreview, link: "/pinkiverse/pinkness-overdrive" },
  { name: "Pink Bullet", tagline: "Blast rogue validators & survive the chaos!", image: pinkBulletPreview, link: "/pinkiverse/pinkbullet" },
  { name: "Pink-a-mole", tagline: "Whack platypuses, but avoid the astronauts!", image: pinkamolePreview, link: "/pinkiverse/pink-a-mole" },
];

const Games = forwardRef<HTMLDivElement>((props, ref) => (
  <section 
    id="games" 
    ref={ref} 
    className="relative flex flex-col items-center text-white py-20 px-4 md:px-8 bg-black/40 overflow-hidden">
    
    {/* Background Elements */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-pink-900 opacity-60 -z-10"></div> */}
    {/* <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] bg-pink-600 rounded-full blur-[160px] opacity-20 -z-10"></div> */}

    {/* 🎮 Section Title */}
    <motion.div className="text-center max-w-5xl mx-auto space-y-6 md:space-y-8 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text flex items-center justify-between gap-3">
        <GiJoystick className="text-4xl md:text-5xl text-pink-400" />
        <span>Enter the Pinkiverse</span>
        <span className="text-4xl md:text-5xl">🎮</span>
      </h2>
      <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
        The ultimate gaming experience awaits. 🏆 Dominate leaderboards. 🎮 Play thrilling blockchain-powered games. 🚀 Compete in tournaments & claim rewards!
      </p>
    </motion.div>

    {/* 🚀 Game Cards Grid */}
    <motion.div className="relative w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 px-4 mt-12 md:mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {games.map((game, index) => (
        <GameCard key={index} game={game} index={index} />
      ))}
    </motion.div>

    {/* 🎯 Key Features */}
    <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <FeatureCard icon={<FaGamepad />} title="Competitive Gameplay" description="Tournaments, leaderboards, and non-stop action!" />
      <FeatureCard icon={<FaTrophy />} title="Earn & Win" description="Play for fun or compete for rewards and prizes." />
      <FeatureCard icon={<FaUsers />} title="Community & Partners" description="Teams, streamers, and collaborations power the Pinkiverse!" />
    </motion.div>

    {/* 🚀 Call-to-Action */}
    <motion.div className="mt-16 md:mt-20" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link to="/pinkiverse"
        className="flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg md:text-xl font-semibold hover:shadow-lg hover:scale-105 transition">
        <FaRocket />
        Explore the Pinkiverse
      </Link>
    </motion.div>
  </section>
));

/* 🎮 Game Feature Card */
const GameCard = ({ game, index }: { game: any; index: number }) => (
  <motion.div
    className={`relative flex flex-col items-center text-center bg-black bg-opacity-50 backdrop-blur-lg rounded-3xl border border-pink-500/20 shadow-lg p-7 md:p-8 w-full max-w-sm ${
      index % 2 === 0 ? "rotate-1" : "-rotate-1"
    } transition hover:shadow-pink-400/30`}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
  >
    {/* Game Image */}
    <div className="relative w-full h-44 md:h-48 overflow-hidden rounded-2xl shadow-lg">
      <motion.img
        src={game.image}
        alt={game.name}
        className="w-full h-full object-cover"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    {/* Game Title */}
    <h3 className="text-lg md:text-xl font-bold text-pink-400 mt-5">{game.name}</h3>

    {/* Game Tagline */}
    <p className="text-sm md:text-md text-gray-300 mt-4 md:mt-5 px-4">
      {game.tagline}
    </p>

    {/* Learn More Button - Spaced Better */}
    <motion.div className="mt-6 md:mt-8" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={game.link}
        className="px-6 md:px-8 py-2 md:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm md:text-md font-semibold hover:shadow-lg transition"
        aria-label={`Learn more about ${game.name} - ${game.tagline}`}
        title={`Learn more about ${game.name}`}
      >
        Learn More
      </Link>
    </motion.div>
  </motion.div>
);

/* 🎯 Feature Card */
const FeatureCard = ({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
  <motion.div className="flex flex-col items-center p-5 md:p-6 bg-black bg-opacity-40 backdrop-blur-lg rounded-3xl border border-pink-500/10 shadow-lg hover:shadow-pink-400/20 transition duration-300">
    <div className="text-pink-400 text-3xl md:text-4xl mb-3 md:mb-4">{icon}</div>
    <h4 className="text-md md:text-lg font-semibold text-white">{title}</h4>
    <p className="text-sm md:text-md text-gray-300 mt-2 md:mt-3">{description}</p>
  </motion.div>
);

export default Games;
