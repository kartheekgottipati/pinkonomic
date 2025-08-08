import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaTelegram, FaTwitter, FaReddit, FaDiscord, FaUsers } from "react-icons/fa";
import { PiWaveSquareBold } from "react-icons/pi";

interface SocialPlatform {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
}

const socials: SocialPlatform[] = [
  {
    name: "Telegram",
    icon: FaTelegram,
    url: "https://t.me/PINKonomic"
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://x.com/pinkonomic"
  },
  {
    name: "Reddit",
    icon: FaReddit,
    url: "https://www.reddit.com/r/pinkonomic/"
  },
  {
    name: "Warpcast",
    icon: PiWaveSquareBold,
    url: "https://warpcast.com/pinkonomic"
  },
  {
    name: "Discord",
    icon: FaDiscord,
    url: "https://discord.com/invite/Hn7xKSxZPb"
  }
];

const Socials = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="socials"
    ref={ref}
    className="relative py-24 bg-black overflow-hidden"
  >
    {/* Background gradients */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black -z-10"></div>

    {/* Subtle glow effects */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-pink-500/5 blur-[150px] -z-5"></div>

    {/* Animated background particles */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-pink-500/20"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}

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
          <FaUsers className="text-pink-400 mr-2" size={14} />
          <span className="text-sm text-pink-300 font-medium">COMMUNITY</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Connect with <span className="text-pink-500">Us</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Join our growing community across these platforms
        </p>
      </motion.div>

      {/* Social platforms grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl flex flex-col items-center justify-center py-8 px-4 backdrop-blur-sm border border-gray-800/50 hover:border-pink-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              {/* Background gradient for all social platforms */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-filter backdrop-blur-sm border border-gray-700/50 shadow-lg group-hover:border-white/20 transition-all duration-300 mb-4">
                <Icon className="text-4xl text-white/80 group-hover:text-white transition-all duration-300" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {social.name}
              </h3>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Engagement prompt */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p className="text-gray-400 italic">
          "Stay connected for exclusive updates, events, and community contests"
        </p>
      </motion.div>
    </div>
  </section>
));

Socials.displayName = "Socials";
export default Socials;