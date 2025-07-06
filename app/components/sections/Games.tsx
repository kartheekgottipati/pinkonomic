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

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-block"
        >
          <span className="flex items-center justify-center gap-3">
            <HiSparkles className="text-pink-500 text-3xl" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Game <span className="text-pink-500">Universe</span>
            </h2>
            <HiSparkles className="text-pink-500 text-3xl" />
          </span>
          <div className="h-1 w-1/2 bg-pink-500 mx-auto mt-3"></div>
        </motion.div>

        <motion.p
          className="text-gray-300 mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Dive into the world of PINK games, compete on leaderboards, and win exclusive rewards.
        </motion.p>
      </div>


      <motion.div
        className="mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-pink-500/20 -z-10 blur-sm"></div>
          <div className="bg-gray-900/90 backdrop-blur-sm p-1 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="relative h-64 md:h-auto overflow-hidden rounded-xl">
                <img
                  src={pinkDropPreview}
                  alt="Pink Drop Game"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </div>
              </div>


              <div className="flex flex-col justify-center p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Pink Drop</h3>
                <p className="text-gray-300 mb-6">
                  Merge parachains to reach the ultimate Polkadot ball. Join thousands of players in this
                  addictive, competitive game with regular tournaments and prizes.
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/game"
                      className="flex items-center gap-2 px-6 py-3 bg-pink-500 rounded-lg text-white font-medium"
                    >
                      <FaPlay size={14} /> Play Now
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/pinkiverse/pinkdrop"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


      <h3 className="text-2xl font-bold text-white mb-8">More Games</h3>

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


      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/pinkiverse"
            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 rounded-lg text-white font-bold text-lg shadow-lg shadow-pink-500/20"
          >
            <FaRocket />
            Explore the Pinkiverse
          </Link>
        </motion.div>

        <p className="text-gray-500 text-sm mt-4">Discover all games and upcoming releases</p>
      </motion.div>
    </div>
  </section>
));


const GameCard = ({ game, delay = 0 }: { game: Game; delay?: number }) => (
  <motion.div
    className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-500/30 transition-all"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
  >

    <div className="h-48 overflow-hidden">
      <img
        src={game.image}
        alt={game.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>


    <div className="p-5">
      <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{game.tagline}</p>

      <Link
        to={game.link}
        className="inline-flex items-center text-pink-400 font-medium text-sm"
      >
        Explore Game
        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    whileHover={{ y: -5, borderColor: "rgba(236, 72, 153, 0.3)" }}
  >
    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

Games.displayName = "Games";
export default Games;
