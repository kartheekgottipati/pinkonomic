import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaTelegram, FaTwitter, FaReddit, FaDiscord } from "react-icons/fa";
import { PiWaveSquareBold } from "react-icons/pi";

const socials = [
  { name: "Telegram", icon: FaTelegram, url: "https://t.me/PINKonomic", color: "bg-blue-700", shadow: "shadow-blue-700/50" },
  { name: "Twitter (X)", icon: FaTwitter, url: "https://x.com/pinkonomic", color: "bg-gray-900", shadow: "shadow-gray-900/50" },
  { name: "Reddit", icon: FaReddit, url: "https://www.reddit.com/r/pinkonomic/", color: "bg-[#B80000]", shadow: "shadow-red-900/50" },
  { name: "Warpcast", icon: PiWaveSquareBold, url: "https://warpcast.com/pinkonomic", color: "bg-purple-900", shadow: "shadow-purple-900/50" },
  { name: "Discord", icon: FaDiscord, url: "https://discord.com/invite/Hn7xKSxZPb", color: "bg-indigo-900", shadow: "shadow-indigo-900/50" },
];

const Socials = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="socials"
    ref={ref}
    className="relative py-40 bg-black/40 text-white"
  >
    {/* 🔥 Background Glow */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-60 -z-10"></div> */}
    {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-pink-500 rounded-full blur-[160px] opacity-30 -z-10"></div> */}

    {/* Section Header with Glow Effect */}
    <div className="relative text-center max-w-4xl mx-auto px-6">
      <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text leading-tight sm:leading-normal">
        Join The Community
        {/* 🔥 Glowing Background Effect */}
        <motion.div
          className="absolute -z-10 inset-0 mx-auto w-60 sm:w-72 md:w-96 h-14 sm:h-16 md:h-24 bg-pink-500 opacity-20 blur-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </h2>
      <p className="text-base md:text-lg text-gray-400 mt-3 sm:mt-4">
        Stay updated and engage with PINK holders worldwide.
      </p>
    </div>

    {/* Socials Grid */}
    <div className="flex flex-wrap justify-center gap-6 mt-16 px-8">
      {socials.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative w-52 h-52 flex flex-col items-center justify-center rounded-xl ${social.color} shadow-lg ${social.shadow} transition`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            aria-label={`Join PINK on ${social.name}`}
            title={`Join PINK on ${social.name}`}
          >
            {/* Social Icon */}
            <Icon className="text-5xl text-white" />

            {/* Social Name */}
            <p className="mt-4 text-lg md:text-xl font-semibold text-white">{social.name}</p>
          </motion.a>
        );
      })}
    </div>
  </section>
));

Socials.displayName = "Socials";
export default Socials;
