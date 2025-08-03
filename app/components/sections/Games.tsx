import { forwardRef, type JSX } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaPlay, FaTrophy, FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";


import pinkDropPreview from "~/images/games/pinkdrop-preview.jpg";
import pinknessOverdrivePreview from "~/images/games/pinkness-overdrive-preview.jpg";
import pinkBulletPreview from "~/images/games/pink-bullet-preview.jpg";
import pinkamolePreview from "~/images/games/pink-a-mole-preview.jpg";


interface Game {
  name: string;
  tagline: string;
  image: string;
  link: string;
}


const games: Game[] = [
  { name: "Pink Drop", tagline: "Merge parachains, climb the leaderboard!", image: pinkDropPreview, link: "/pinkiverse/pinkdrop" },
  { name: "Pinkness Overdrive", tagline: "Race through snow & dodge obstacles!", image: pinknessOverdrivePreview, link: "/pinkiverse/pinkness-overdrive" },
  { name: "Pink Bullet", tagline: "Blast rogue validators & survive the chaos!", image: pinkBulletPreview, link: "/pinkiverse/pinkbullet" },
  { name: "Pink-a-mole", tagline: "Whack platypuses, but avoid the astronauts!", image: pinkamolePreview, link: "/pinkiverse/pink-a-mole" },
];

const Games = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="games"
    ref={ref}
    className="relative py-24 bg-black overflow-hidden"
  >

    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-900/10 via-transparent to-black -z-5"></div>


    <div className="absolute top-40 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]"></div>
    <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

    <div className="container mx-auto px-4 max-w-6xl">

      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          <FaRocket className="text-pink-400 mr-2" size={14} />
          <span className="text-sm text-pink-300 font-medium">GAMING</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Game <span className="text-pink-500">Universe</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Dive into the world of PINK games, compete on leaderboards, and win exclusive rewards
        </p>
      </motion.div>


      {/* Featured Game Card */}
      <motion.div
        className="mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-gray-900/30 border border-gray-800/50 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Image */}
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img
                src={pinkDropPreview}
                alt="Pink Drop Game"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 bg-pink-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                <FaTrophy size={10} className="mr-1.5" /> FEATURED GAME
              </div>
            </div>

            {/* Game Info */}
            <div className="flex flex-col justify-center p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
                  <FaPlay className="text-pink-400" size={14} />
                </div>
                <h3 className="text-2xl font-bold text-white">Pink Drop</h3>
              </div>

              <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                Merge parachains to reach the ultimate Polkadot ball. Join thousands of players in this
                addictive, competitive game with regular tournaments and prizes.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/game"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-pink-600 hover:bg-pink-500 rounded-xl text-white font-medium transition-colors duration-300 shadow-lg shadow-pink-600/20"
                >
                  <FaPlay size={12} className="mr-2" /> Play Now
                </Link>

                <Link
                  to="/pinkiverse/pinkdrop"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-800/70 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


      {/* More Games Section */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
          <HiSparkles className="text-pink-400" size={14} />
        </div>
        <h3 className="text-2xl font-bold text-white">More Games</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.slice(1).map((game, index) => (
          <GameCard key={index} game={game} delay={index * 0.1} />
        ))}
      </div>


      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<FaPlay className="text-pink-400" />}
          title="Instant Play"
          description="No downloads needed. Play directly in your browser or Telegram."
        />
        <FeatureCard
          icon={<FaTrophy className="text-pink-400" />}
          title="Win Prizes"
          description="Compete in tournaments and win PINK rewards."
        />
        <FeatureCard
          icon={<FaUsers className="text-pink-400" />}
          title="Community"
          description="Join thousands of players in the PINK gaming universe."
        />
      </div>


      {/* Call to action */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          to="/pinkiverse"
          className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 hover:bg-pink-500 rounded-xl text-white font-bold text-lg transition-colors duration-300 shadow-lg shadow-pink-600/20"
        >
          <FaRocket className="mr-2" />
          Explore the Pinkiverse
        </Link>

        <p className="text-gray-500 text-sm mt-4">Discover all games and upcoming releases</p>
      </motion.div>
    </div>
  </section>
));


const GameCard = ({ game, delay = 0 }: { game: Game; delay?: number }) => (
  <motion.div
    className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 rounded-xl overflow-hidden transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
  >
    {/* Game Image */}
    <div className="h-48 overflow-hidden">
      <img
        src={game.image}
        alt={game.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>

    {/* Game Info */}
    <div className="p-5">
      {/* Game title with icon */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-2.5 border border-pink-500/30">
          <FaPlay className="text-pink-400" size={10} />
        </div>
        <h3 className="text-lg font-bold text-white">{game.name}</h3>
      </div>

      <p className="text-gray-400 text-sm mb-5 pl-10.5">{game.tagline}</p>

      <Link
        to={game.link}
        className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-800/70 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors duration-300"
      >
        Explore Game
      </Link>
    </div>
  </motion.div>
);


interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 p-6 rounded-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
  >
    <div className="w-12 h-12 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-pink-500/30">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

Games.displayName = "Games";
export default Games;
