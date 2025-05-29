import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import HomeButton from "~/components/buttons/HomeButton";

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
  const hasTournaments = tournaments && tournaments.length > 0;

  return (
    <section className="relative bg-black text-white min-h-screen overflow-hidden flex flex-col">
      {/* Header with Home Button */}
      <header className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <HomeButton />
      </header>

      {/* Static Background */}
      <div className="absolute inset-0 bg-black -z-10" />
      {/* Animated Overlay */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-pink-500 rounded-full blur-[250px] opacity-20 -z-10"
        animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.25, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Game Image Section */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 to-blue-500/15 rounded-2xl -z-10 group-hover:scale-102 transition-transform duration-300" />
            <motion.img
              src={image}
              alt={title}
              className="w-full h-auto rounded-2xl shadow-xl border border-gray-800 object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Game Info Section */}
          <motion.div
            className="flex flex-col justify-center gap-6 text-center md:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
              {title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">{description}</p>
            <p className="text-xs sm:text-sm text-gray-400 italic">{platforms}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {playLinks.map((link, index) => (
                <GameButton key={index} icon={link.icon} label={link.label} href={link.href} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tournaments Section */}
      {hasTournaments ? (
        <TournamentTable tournaments={tournaments} />
      ) : (
        <NoTournaments />
      )}
    </section>
  );
};

/********************************
 * Play Now Button
 ********************************/
const GameButton = ({ icon, label, href }: { icon: JSX.Element; label: string; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm sm:text-base shadow-md transition-all duration-300"
    whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(236, 72, 153, 0.4)" }}
    whileTap={{ scale: 0.95 }}
    aria-label={`Play ${label}`}
    title={`Play ${label}`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </motion.a>
);

/********************************
 * Tournament Table
 ********************************/
const TournamentTable = ({ tournaments }: { tournaments: Tournament[] }) => {
  const [activeTab, setActiveTab] = useState<"Live" | "Upcoming" | "Past">("Live");

  const now = new Date();
  const categorizedTournaments: Record<"Live" | "Upcoming" | "Past", Tournament[]> = {
    Live: tournaments.filter(t => new Date(t.startTime) <= now && new Date(t.endTime) >= now),
    Upcoming: tournaments.filter(t => new Date(t.startTime) > now),
    Past: tournaments.filter(t => new Date(t.endTime) < now),
  };

  return (
    <div className="w-full bg-black py-10 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-400 text-center mb-8">Tournaments</h2>
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {Object.keys(categorizedTournaments).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab as "Live" | "Upcoming" | "Past")}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700 text-pink-400">
                <th className="p-3 sm:p-4">Tournament</th>
                <th className="p-3 sm:p-4">Prize</th>
                <th className="p-3 sm:p-4">Start Time</th>
                <th className="p-3 sm:p-4">End Time</th>
              </tr>
            </thead>
            <tbody>
              {categorizedTournaments[activeTab].map((tournament, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="p-3 sm:p-4 text-gray-200">{tournament.name}</td>
                  <td className="p-3 sm:p-4 text-gray-300">{tournament.prize}</td>
                  <td className="p-3 sm:p-4 text-gray-400">{tournament.startTime}</td>
                  <td className="p-3 sm:p-4 text-gray-400">{tournament.endTime}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

/********************************
 * No Tournaments Section
 ********************************/
const NoTournaments = () => (
  <motion.div
    className="w-full bg-black py-10 px-4 sm:px-6 md:px-8 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-pink-400">🏆 No Tournaments Yet</h2>
    <p className="text-sm sm:text-lg text-gray-300 mt-4 max-w-xl mx-auto">
      Stay tuned! Exciting tournaments are coming soon. Check back for updates.
    </p>
  </motion.div>
);

export default GamePage;