import { motion } from "framer-motion";
import { forwardRef } from "react";
import PinkPassImage from "~/images/pinkpass.avif";
import PinkPlatypusImage from "~/images/playtypus.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";


interface NFTCollection {
  name: string;
  description: string;
  image: string;
  link: string;
  stats?: {
    items?: number;
    owners?: number;
    floorPrice?: string;
  };
}

const NFT_COLLECTIONS: NFTCollection[] = [
  {
    name: "PINK Pass Collection",
    description: "Your exclusive access to the PINK ecosystem. Holders enjoy benefits, early access, and more!",
    image: PinkPassImage,
    link: "https://opensea.io/collection/pink-pass-1",
    stats: {
      items: 777,
      owners: 450,
      floorPrice: "0.12 ETH"
    }
  },
  {
    name: "PINK Platypuses",
    description: "The legendary Platypuses of PINK! A high-utility collection with gaming integrations & community perks.",
    image: PinkPlatypusImage,
    link: "https://opensea.io/collection/pink-platypuses",
    stats: {
      items: 5000,
      owners: 2100,
      floorPrice: "0.08 ETH"
    }
  },
];

const NFTSection = forwardRef<HTMLDivElement>((props, ref) => (
  <section
    id="nft"
    ref={ref}
    className="relative py-24 overflow-hidden bg-black"
  >
    {/* Background gradients */}
    <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 via-black to-black -z-10"></div>

    {/* Subtle glow effect */}
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/5 rounded-full blur-[120px] -z-5"></div>

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
          <HiSparkles className="text-pink-400 mr-2" size={14} />
          <span className="text-sm text-pink-300 font-medium">COLLECTIBLES</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          PINK <span className="text-pink-500">NFTs</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Explore our exclusive digital collectibles with real utility in the PINK ecosystem
        </p>
      </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {NFT_COLLECTIONS.map((collection, index) => (
          <NFTCard key={index} collection={collection} index={index} />
        ))}
      </div>
    </div>
  </section>
));


const NFTCard = ({ collection, index }: { collection: NFTCollection; index: number }) => (
  <motion.div
    className="bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 rounded-2xl overflow-hidden transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
  >
    {/* NFT Image Container */}
    <div className="relative h-[240px] overflow-hidden">
      <img
        src={collection.image}
        alt={collection.name}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      {/* Collection Name Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-pink-500/30">
            <HiSparkles className="text-pink-400" size={18} />
          </div>
          <h3 className="text-xl font-bold text-white">{collection.name}</h3>
        </div>
      </div>
    </div>

    {/* NFT Details */}
    <div className="p-6">
      {/* Description */}
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">{collection.description}</p>

      {/* Stats Panel */}
      {collection.stats && (
        <div className="bg-gray-800/30 rounded-xl p-4 mb-6 flex justify-between">
          {collection.stats.items && (
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-white mb-1">{collection.stats.items.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Items</div>
            </div>
          )}

          {collection.stats.owners && (
            <div className="text-center flex-1 border-x border-gray-700/50">
              <div className="text-xl font-bold text-white mb-1">{collection.stats.owners.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Owners</div>
            </div>
          )}

          {collection.stats.floorPrice && (
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-white mb-1">{collection.stats.floorPrice}</div>
              <div className="text-xs text-gray-400">Floor Price</div>
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <motion.a
        href={collection.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-pink-600 hover:bg-pink-500 rounded-xl text-white font-medium transition-colors duration-300 shadow-lg shadow-pink-600/20"
        whileTap={{ scale: 0.98 }}
      >
        View on OpenSea
      </motion.a>
    </div>
  </motion.div>
);

NFTSection.displayName = "NFTSection";
export default NFTSection;
