import { forwardRef } from "react";
import { motion } from "framer-motion";

// Partner Logos (Make sure these are high-resolution)
import n3musIconColor from "~/images/partnerships/n3mus-icon-color.png";
import evrlootIcon from "~/images/partnerships/evrloot-icon-color.svg";
import playtgeIcon from "~/images/partnerships/playtge-icon.png";
import polkadotIconPink from "~/images/partnerships/polkadot-icon-pink.svg";
import moonbeamIconLight from "~/images/teleport/moonbeam-light.svg";

const partners = [
  { name: "N3MUS", image: n3musIconColor, link: "https://n3mus.com" },
  { name: "Evrloot", image: evrlootIcon, link: "https://evrloot.com" },
  { name: "The Great Escape", image: playtgeIcon, link: "https://www.playtge.com" },
  { name: "Polkadot", image: polkadotIconPink, link: "https://polkadot.com" },
  { name: "Moonbeam", image: moonbeamIconLight, link: "https://moonbeam.network" },
];

const Partnerships = forwardRef<HTMLDivElement>((props, ref) => (
  <section 
    id="partnerships" 
    ref={ref} 
    className="relative min-h-screen flex flex-col items-center justify-center bg-black/40 text-white py-24 px-6 md:px-12 overflow-hidden"
  >
    {/* 🔥 Background Effects */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-60 -z-10"></div> */}
    {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] bg-pink-500 rounded-full blur-[160px] opacity-30 -z-10"></div> */}

    {/* 🏆 Section Title */}
    <motion.h1 
      className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-500 text-transparent bg-clip-text text-center mt-12 md:mt-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      Our Partners
    </motion.h1>

    {/* 🌟 Scrolling Partner Showcase with Natural Flow */}
    <div className="relative w-full max-w-6xl mt-12 md:mt-16 overflow-hidden">
      {/* ✨ Soft Fading Edge for a Natural Look */}
      <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-black via-transparent to-transparent z-10"></div>

      {/* Moving Partner Logos */}
      <motion.div
        className="flex space-x-6 md:space-x-10 items-center w-[300%] md:w-[200%]" // Wider for smooth animation
        animate={{ x: ["0%", "-50%", "0%"] }} // Moves back and forth naturally
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {partners.concat(partners).map((partner, index) => (
          <motion.a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-center text-center w-28 md:w-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Visit ${partner.name} website`}
            title={`Visit ${partner.name} website`}
          >
            {/* Glowing Logo */}
            <motion.div 
              className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full shadow-lg bg-black bg-opacity-60 transition duration-300"
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              <img
                src={partner.image}
                alt=""
                className="w-16 md:w-28 h-16 md:h-28 object-contain"
              />
            </motion.div>
            {/* Partner Name */}
            <p className="text-white text-sm md:text-lg font-medium mt-2 md:mt-3 opacity-80">{partner.name}</p>
          </motion.a>
        ))}
      </motion.div>
    </div>

    {/* ✨ Floating Animated Background Text */}
    <motion.div 
      className="absolute w-full h-full pointer-events-none flex justify-center items-center opacity-20"
      animate={{ x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-7xl md:text-9xl font-bold text-gray-500 opacity-5">PARTNERS</span>
    </motion.div>
  </section>
));

Partnerships.displayName = "Partnerships";
export default Partnerships;
