import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";

import n3musIconColor from "~/images/partnerships/n3mus-icon-color.png";
import evrlootIcon from "~/images/partnerships/evrloot-icon-color.svg";
import playtgeIcon from "~/images/partnerships/playtge-icon.png";
import polkadotIconPink from "~/images/partnerships/polkadot-icon-pink.svg";
import moonbeamIconLight from "~/images/teleport/moonbeam-light.svg";
import darwiniaBlack from "~/images/partnerships/darwinia-black.svg";
import phalaIconGreen from "~/images/partnerships/phala_icon_grn.png";
import bifrostIcon from "~/images/partnerships/bifrost.svg";
import astarColor from "~/images/partnerships/astar_color.png";
import crustNetwork from "~/images/partnerships/crust.jpg";
import acalaLogoGradient from "~/images/partnerships/acala_logo_gradient.svg";

interface Partner {
  name: string;
  image: string;
  link: string;
  description?: string;
}

const partners: Partner[] = [
  {
    name: "N3MUS",
    image: n3musIconColor,
    link: "https://n3mus.com",
    description: "Web3 music platform"
  },
  {
    name: "Evrloot",
    image: evrlootIcon,
    link: "https://evrloot.com",
    description: "NFT inventory system"
  },
  {
    name: "The Great Escape",
    image: playtgeIcon,
    link: "https://www.playtge.com",
    description: "Gaming ecosystem"
  },
  {
    name: "Polkadot",
    image: polkadotIconPink,
    link: "https://polkadot.com",
    description: "Blockchain platform"
  },
  {
    name: "Moonbeam",
    image: moonbeamIconLight,
    link: "https://moonbeam.network",
    description: "Smart contract parachain"
  },
  {
    name: "Darwinia",
    image: darwiniaBlack,
    link: "https://darwinia.network",
    description: "Cross-chain bridge and NFT platform"
  },
  {
    name: "Phala Network",
    image: phalaIconGreen,
    link: "https://phala.network",
    description: "Privacy-preserving cloud computing"
  },
  {
    name: "Bifrost",
    image: bifrostIcon,
    link: "https://bifrost.io",
    description: "Liquid staking and DeFi platform"
  },
  {
    name: "Astar Network",
    image: astarColor,
    link: "https://astar.network",
    description: "Multi-chain dApp hub"
  },
  {
    name: "Crust Network",
    image: crustNetwork,
    link: "https://crust.network",
    description: "Decentralized storage network"
  },
  {
    name: "Acala",
    image: acalaLogoGradient,
    link: "https://acala.network",
    description: "DeFi hub and stablecoin platform"
  }
];

const Partnerships = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="partnerships"
    ref={ref}
    className="relative py-24 bg-black overflow-hidden"
  >
    {/* Background gradients */}
    <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 via-black to-black -z-10"></div>

    {/* Subtle glow effect */}
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] -z-5"></div>

    <div className="container mx-auto px-4 max-w-6xl relative z-10">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
          <FaHandshake className="text-purple-400 mr-2" size={14} />
          <span className="text-sm text-purple-300 font-medium">ECOSYSTEM</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Our <span className="text-pink-500">Partners</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Building the future of web3 together with industry leaders
        </p>
      </motion.div>

      {/* Partners showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <motion.a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-purple-500/30 hover:bg-gray-800/40 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center">
              <div className="mr-5 flex-shrink-0 h-16 w-16 rounded-xl bg-gray-800/70 backdrop-blur-sm flex items-center justify-center p-2.5 border border-gray-700/30">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-semibold text-xl mb-1">{partner.name}</h3>
                {partner.description && (
                  <p className="text-gray-400 text-sm">{partner.description}</p>
                )}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
));

Partnerships.displayName = "Partnerships";
export default Partnerships;