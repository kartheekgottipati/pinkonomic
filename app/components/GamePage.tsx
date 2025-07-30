import { useState, useEffect, useRef, type JSX } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FaClock, FaCalendarAlt, FaTrophy, FaGamepad, FaUser,
  FaChevronRight, FaArrowLeft, FaStar, FaDownload, FaInfoCircle,
  FaFire, FaGlobe, FaRobot, FaVideo, FaRocket, FaChartLine,
  FaPlay
} from "react-icons/fa";
import { Link } from "react-router";
import Footer from "~/components/Footer";

interface Tournament {
  name: string;
  prize: string;
  startTime: string;
  endTime: string;
  link?: string;
}

interface GamePageProps {
  title: string;
  description: string;
  image: string;
  platforms: string;
  playLinks: { icon: JSX.Element; label: string; href: string }[];
  tournaments?: Tournament[];
}

const GamePage = ({ title, description, image, platforms, playLinks, tournaments }: GamePageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });

  const hasTournaments = tournaments && tournaments.length > 0;
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.3, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  useEffect(() => {

    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);


  const generateSlogan = () => {
    const phrases = [
      `Enter the world of ${title}`,
      `The legend of ${title} awaits`,
      `Your journey into ${title} begins`,
      `Unleash the power of ${title}`,
      `Dive into the ${title} experience`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  return (
    <div className="relative bg-black min-h-screen text-white overflow-hidden" ref={mainRef}>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 mb-6 relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180],
                    borderRadius: ["50%", "40%", "50%"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.p
                className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {title}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="relative h-screen overflow-hidden">

        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            y: backgroundY,
            backgroundSize: "cover",
            filter: "brightness(0.6) contrast(1.1) saturate(1.4)"
          }}
        />


        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
          <div className="absolute inset-0">
            <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent opacity-70"></div>


            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-pink-400/50"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>
        </div>


        <div className="absolute top-8 left-8 z-40">
          <Link to="/pinkiverse" className="group">
            <motion.div
              className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-pink-500/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft className="text-pink-400 group-hover:text-pink-300 transition-colors" />
              <span className="text-gray-200 group-hover:text-white transition-colors">Back to Games</span>
            </motion.div>
          </Link>
        </div>


        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 z-30"
          style={{ y: textY, opacity }}
        >
          <div className="text-center max-w-5xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pb-2">
                {title}
              </h1>
              <div className="h-1 w-40 md:w-60 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-2 rounded-full" />
              <p className="mt-6 text-xl md:text-2xl text-pink-100 font-light tracking-wide text-shadow-sm">
                {generateSlogan()}
              </p>
            </motion.div>


            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {playLinks.length > 0 && (
                <HeroPlayButton href={playLinks[0].href} />
              )}
            </motion.div>


            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
              <div className="h-10 w-1 bg-gradient-to-b from-pink-500 to-transparent rounded-full mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </div>


      <div className="relative bg-gradient-to-b from-black via-gray-950/95 to-black min-h-screen">

        <div className="container max-w-7xl mx-auto pt-12 px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <PlatformBadge type="browser" isActive={platforms.includes("Browser")} />
            <PlatformBadge type="android" isActive={platforms.includes("Android")} />
            <PlatformBadge type="ios" isActive={platforms.includes("iOS")} />
            <PlatformBadge type="telegram" isActive={platforms.includes("Telegram")} />
          </div>
        </div>


        <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-pink-500/20 mt-8">
          <div className="container max-w-7xl mx-auto">
            <div className="flex justify-center">
              <div className="flex gap-1 overflow-x-auto px-2 scrollbar-hide">
                <TabButton label="Overview" icon={<FaInfoCircle />} isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                <TabButton label="Features" icon={<FaStar />} isActive={activeTab === "features"} onClick={() => setActiveTab("features")} />
                <TabButton label="How to Play" icon={<FaGamepad />} isActive={activeTab === "howtoplay"} onClick={() => setActiveTab("howtoplay")} />
                {hasTournaments && (
                  <TabButton label="Tournaments" icon={<FaTrophy />} isActive={activeTab === "tournaments"} onClick={() => setActiveTab("tournaments")} />
                )}
                <TabButton label="Gallery" icon={<FaVideo />} isActive={activeTab === "gallery"} onClick={() => setActiveTab("gallery")} />
              </div>
            </div>
          </div>
        </div>


        <div className="container max-w-7xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && <OverviewSection description={description} />}
                {activeTab === "features" && <FeaturesSection />}
                {activeTab === "howtoplay" && <HowToPlaySection />}
                {activeTab === "tournaments" && <TournamentsSection tournaments={tournaments || []} />}
                {activeTab === "gallery" && <GallerySection />}
              </AnimatePresence>
            </div>


            <div>
              <div className="sticky top-24 space-y-6">

                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-pink-500/30 shadow-lg shadow-pink-500/5">
                  <div className="p-5 border-b border-gray-800">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <FaRocket className="mr-2 text-pink-400" /> Play Now
                    </h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {playLinks.map((link, index) => (
                      <PlayLinkButton
                        key={index}
                        icon={link.icon}
                        label={link.label}
                        href={link.href}
                      />
                    ))}
                  </div>
                </div>


                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-pink-500/30 shadow-lg shadow-pink-500/5">
                  <div className="p-5 border-b border-gray-800">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <FaChartLine className="mr-2 text-pink-400" /> Game Stats
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-800">
                    <motion.div
                      className="p-5 text-center"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="text-pink-400 text-3xl font-bold">1.2K+</div>
                      <div className="text-gray-400 text-sm mt-1">Players</div>
                    </motion.div>
                    <motion.div
                      className="p-5 text-center"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="text-pink-400 text-3xl font-bold">58K+</div>
                      <div className="text-gray-400 text-sm mt-1">Games Played</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-pink-950/20" />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Play?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of players already enjoying {title}. Challenge yourself and climb the ranks today!
              </p>

              {playLinks.length > 0 && (
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={playLinks[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-xl font-bold text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all"
                  >
                    <FaPlay className="mr-2" /> Play Now
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};


const OverviewSection = ({ description }: { description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-pink-500/30 shadow-lg shadow-pink-500/5">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-6">
        Game Overview
      </h2>

      <div className="prose prose-invert max-w-none prose-pink">
        <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsBox icon={<FaUser />} value="10K+" label="Players" />
        <StatsBox icon={<FaChartLine />} value="4.8/5" label="Rating" />
        <StatsBox icon={<FaTrophy />} value="Daily" label="Tournaments" />
        <StatsBox icon={<FaFire />} value="Free" label="To Play" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureHighlight
        title="Exciting Gameplay"
        description="Dynamic, fast-paced action that keeps you coming back for more. Compete with friends or challenge yourself."
        icon={<FaGamepad />}
      />
      <FeatureHighlight
        title="Win Rewards"
        description="Participate in tournaments to win exclusive prizes and climb the global leaderboards."
        icon={<FaTrophy />}
      />
    </div>
  </motion.div>
);


const FeaturesSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-6">
      Game Features
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "Dynamic Gameplay",
          description: "Adaptive difficulty that evolves as you play, ensuring the perfect challenge level.",
          icon: <FaGamepad className="text-pink-400" />
        },
        {
          title: "Daily Challenges",
          description: "New challenges every day to keep the experience fresh and rewarding.",
          icon: <FaFire className="text-pink-400" />
        },
        {
          title: "Global Leaderboards",
          description: "Compete with players from around the world and climb the ranks.",
          icon: <FaChartLine className="text-pink-400" />
        },
        {
          title: "Exclusive Rewards",
          description: "Earn special rewards and achievements as you progress.",
          icon: <FaTrophy className="text-pink-400" />
        },
        {
          title: "Cross-Platform",
          description: "Play on multiple platforms with your progress synced across devices.",
          icon: <FaGlobe className="text-pink-400" />
        },
        {
          title: "Regular Updates",
          description: "Constant updates with new content and improvements based on player feedback.",
          icon: <FaRocket className="text-pink-400" />
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-pink-500/20 shadow-md"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="flex items-start">
            <div className="p-3 bg-gray-800 rounded-lg mr-4">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);


const HowToPlaySection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-10">
      How To Play
    </h2>

    <div className="space-y-12 max-w-3xl mx-auto">
      {[
        {
          step: 1,
          title: "Start Your Journey",
          description: "Download the game or access it through your browser. Create an account to save your progress.",
          color: "from-pink-600 to-pink-400"
        },
        {
          step: 2,
          title: "Learn the Basics",
          description: "Follow the tutorial to understand the core mechanics. Practice the fundamental skills needed.",
          color: "from-purple-600 to-purple-400"
        },
        {
          step: 3,
          title: "Challenge Yourself",
          description: "Complete daily challenges and missions to earn rewards and improve your skills.",
          color: "from-blue-600 to-blue-400"
        },
        {
          step: 4,
          title: "Compete & Win",
          description: "Join tournaments, compete with other players, and climb the global leaderboards.",
          color: "from-pink-600 to-blue-400"
        }
      ].map((step, index) => (
        <motion.div
          key={index}
          className="relative flex items-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >

          <div className="mr-6 flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {step.step}
            </motion.div>
            {index < 3 && (
              <div className="w-0.5 h-full bg-gradient-to-b from-pink-500/50 to-transparent mt-2" />
            )}
          </div>


          <div className="flex-1 pt-1.5">
            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>


            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <h4 className="text-lg font-medium text-pink-300 mb-2">Pro Tip:</h4>
              <p className="text-gray-400">
                {index === 0 && "Connect your wallet to unlock exclusive rewards and features."}
                {index === 1 && "Take your time to master the controls before jumping into competitions."}
                {index === 2 && "Focus on improving one skill at a time for the best progress."}
                {index === 3 && "Study top players' strategies to improve your own gameplay."}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);


const TournamentsSection = ({ tournaments }: { tournaments: Tournament[] }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'past'>('all');


  const now = new Date();
  const getFilteredTournaments = () => {
    if (filter === 'all') return tournaments;

    return tournaments.filter(t => {
      const startDate = new Date(t.startTime);
      const endDate = new Date(t.endTime);

      if (filter === 'active') return startDate <= now && endDate >= now;
      if (filter === 'upcoming') return startDate > now;
      if (filter === 'past') return endDate < now;
      return true;
    });
  };

  const filteredTournaments = getFilteredTournaments();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
          Tournaments
        </h2>

        <div className="flex bg-gray-900 p-1 rounded-lg">
          <FilterButton label="All" isActive={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterButton label="Active" isActive={filter === 'active'} onClick={() => setFilter('active')} />
          <FilterButton label="Upcoming" isActive={filter === 'upcoming'} onClick={() => setFilter('upcoming')} />
          <FilterButton label="Past" isActive={filter === 'past'} onClick={() => setFilter('past')} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament, index) => {
            const startDate = new Date(tournament.startTime);
            const endDate = new Date(tournament.endTime);
            const isActive = startDate <= now && endDate >= now;
            const isPast = endDate < now;
            const isUpcoming = startDate > now;

            let statusColor = "bg-blue-500/20 text-blue-300";
            if (isActive) statusColor = "bg-green-500/20 text-green-300";
            if (isPast) statusColor = "bg-gray-500/20 text-gray-300";

            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-pink-500/20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(236, 72, 153, 0.3)" }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusColor}`}>
                        {isActive && "Active Now"}
                        {isPast && "Completed"}
                        {isUpcoming && "Upcoming"}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {tournament.name}
                      </h3>

                      <p className="text-xl font-medium text-pink-400 mb-4">
                        {tournament.prize}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-400">
                          <FaCalendarAlt className="mr-2 text-gray-500" />
                          <span>Starts: {tournament.startTime}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <FaClock className="mr-2 text-gray-500" />
                          <span>Ends: {tournament.endTime}</span>
                        </div>
                      </div>
                    </div>

                    {tournament.link && !isPast && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a
                          href={tournament.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center px-5 py-2 rounded-lg font-medium whitespace-nowrap ${isActive
                            ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                            }`}
                        >
                          {isActive ? "Join Now" : "Register"}
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-gray-900/60 rounded-xl p-12 text-center border border-gray-800">
            <FaTrophy className="text-4xl text-gray-700 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No {filter !== 'all' ? filter : ''} tournaments available</p>
            <p className="text-gray-500 mt-2">Check back later for new competitions</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};


const GallerySection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-8">
      Gallery
    </h2>

    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Game Trailer</h3>
      <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="w-full h-full flex items-center justify-center">
          <FaPlay className="text-5xl text-gray-700" />
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Screenshots</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <motion.div
            key={num}
            className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 cursor-pointer"
            whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 0.5)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-700">
              Screenshot {num}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);




const HeroPlayButton = ({ href }: { href: string }) => (
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-all"></div>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-bold text-lg"
    >
      <FaPlay />
      <span>Play Now</span>
    </a>
  </motion.div>
);


const TabButton = ({ label, icon, isActive, onClick }: { label: string; icon: JSX.Element; isActive: boolean; onClick: () => void }) => (
  <motion.button
    className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors ${isActive
      ? "bg-pink-600 text-white"
      : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
    onClick={onClick}
    whileHover={{ scale: isActive ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </motion.button>
);


const FilterButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button
    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isActive
      ? "bg-pink-600 text-white"
      : "text-gray-400 hover:text-white"
      }`}
    onClick={onClick}
  >
    {label}
  </button>
);


const PlatformBadge = ({ type, isActive }: { type: string; isActive: boolean }) => {
  const getIcon = () => {
    switch (type) {
      case "browser": return <FaGlobe />;
      case "android": return <FaRobot />;
      case "ios": return <FaDownload />;
      case "telegram": return <FaUser />;
      default: return <FaGlobe />;
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${isActive
        ? "bg-pink-500/20 text-pink-300 border-pink-500/30"
        : "bg-gray-800/50 text-gray-500 border-gray-700"
        }`}
    >
      {getIcon()}
      <span className="capitalize">{type}</span>
    </div>
  );
};


const StatsBox = ({ icon, value, label }: { icon: JSX.Element; value: string; label: string }) => (
  <motion.div
    className="bg-gray-900/70 rounded-xl p-4 text-center border border-gray-800"
    whileHover={{ y: -5, borderColor: "rgba(236, 72, 153, 0.4)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-pink-400 mb-2">{icon}</div>
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </motion.div>
);


const FeatureHighlight = ({ title, description, icon }: { title: string; description: string; icon: JSX.Element }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-pink-500/20 shadow-lg"
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start">
      <div className="p-3 bg-pink-600/20 rounded-lg mr-4 text-pink-400">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </motion.div>
);


const PlayLinkButton = ({ icon, label, href }: { icon: JSX.Element; label: string; href: string }) => {

  const simplifiedLabel = label
    .replace("Play ", "")
    .replace(" in Browser", "")
    .replace(" on ", " ");

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600/20 mr-3 text-pink-400">
          {icon}
        </span>
        <span>{simplifiedLabel}</span>
      </span>
      <FaChevronRight className="text-gray-500" />
    </motion.a>
  );
};

export default GamePage;