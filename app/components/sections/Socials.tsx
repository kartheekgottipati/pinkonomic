import { forwardRef } from "react";
import { FaTelegram, FaTwitter, FaReddit, FaDiscord } from "react-icons/fa";
import { PiWaveSquareBold } from "react-icons/pi";

// Social platforms with minimal data
const socials = [
  { name: "Telegram", icon: FaTelegram, url: "https://t.me/PINKonomic" },
  { name: "Twitter", icon: FaTwitter, url: "https://x.com/pinkonomic" },
  { name: "Reddit", icon: FaReddit, url: "https://www.reddit.com/r/pinkonomic/" },
  { name: "Warpcast", icon: PiWaveSquareBold, url: "https://warpcast.com/pinkonomic" },
  { name: "Discord", icon: FaDiscord, url: "https://discord.com/invite/Hn7xKSxZPb" }
];

const Socials = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="socials"
    ref={ref}
    className="relative py-24 bg-black"
  >
    {/* Background effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black -z-10"></div>
    
    <div className="container mx-auto px-4">
      {/* Simple, clean header */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white text-center">
          Social <span className="text-pink-500">Media</span>
        </h2>
      </div>

      {/* Minimal social icons in a horizontal row */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 group-hover:border-pink-500 transition-colors duration-300">
                <Icon className="text-3xl md:text-4xl text-gray-300 group-hover:text-pink-400 transition-colors duration-300" />
              </div>
              <span className="mt-3 text-gray-400 group-hover:text-pink-400 transition-colors duration-300 font-medium">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
));

Socials.displayName = "Socials";
export default Socials;