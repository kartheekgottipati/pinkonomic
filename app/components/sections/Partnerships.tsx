import { forwardRef } from "react";
import { motion } from "framer-motion";


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
    className="relative py-24 bg-black overflow-hidden"
  >

    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black -z-10"></div>


    <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-pink-500/5 rounded-bl-full blur-3xl -z-5"></div>
    <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-purple-500/5 rounded-tr-full blur-3xl -z-5"></div>

    <div className="container mx-auto px-4 relative z-10">

      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center px-5 py-1.5 bg-pink-500/10 rounded-full mb-4">
            <span className="text-sm font-medium text-pink-400">
              ECOSYSTEM
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Our <span className="text-pink-500">Partners</span>
          </h2>
        </motion.div>
      </div>


      <motion.div
        className="flex flex-wrap justify-center items-center gap-x-4 gap-y-8 md:gap-x-10 md:gap-y-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {partners.map((partner, index) => (
          <PartnerLogoCard key={index} partner={partner} index={index} />
        ))}
      </motion.div>
    </div>
  </section>
));


const PartnerLogoCard = ({ partner, index }: { partner: { name: string; image: string; link: string }; index: number }) => {

  const variants = [
    "bg-gray-900 hover:bg-gray-800 hover:border-pink-500/30",
    "bg-gray-900 hover:bg-gray-800 hover:border-purple-500/30",
    "bg-gray-900 hover:bg-gray-800 hover:border-blue-500/30",
  ];

  const variant = variants[index % variants.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] ${variant} 
                   rounded-2xl p-0.5 shadow-lg transition-all duration-300`}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Visit ${partner.name} website`}
      >
        <div className="absolute inset-0 rounded-2xl backdrop-blur-[1px] bg-black/40"></div>

        <div className="relative h-full rounded-xl flex flex-col items-center justify-center p-4 bg-gray-900/80 border border-white/5">

          <div className="w-full h-[70%] flex items-center justify-center mb-2">
            <img
              src={partner.image}
              alt=""
              className="max-w-[80%] max-h-[80%] object-contain filter drop-shadow-lg"
            />
          </div>


          <p className="text-white text-sm font-medium text-center mt-auto">{partner.name}</p>
        </div>
      </motion.a>
    </motion.div>
  );
};

Partnerships.displayName = "Partnerships";
export default Partnerships;