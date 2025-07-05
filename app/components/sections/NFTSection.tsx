import { motion } from "framer-motion";
import { forwardRef } from "react";
import PinkPassImage from "~/images/pinkpass.avif";
import PinkPlatypusImage from "~/images/playtypus.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

// Define NFT collection type
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
    {/* Background elements */}
    <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5 -z-10"></div>
    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-900/10 via-transparent to-black -z-5"></div>
    
    {/* Animated glow */}
    <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[120px]"></div>
    <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]"></div>
    
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Section header */}
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
              PINK <span className="text-pink-500">NFTs</span>
            </h2>
            <HiSparkles className="text-pink-500 text-3xl" />
          </span>
          <div className="h-1 w-1/2 bg-gradient-to-r from-pink-500 to-transparent mx-auto mt-3"></div>
        </motion.div>
        
        <motion.p 
          className="text-gray-300 mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Explore our exclusive digital collectibles with real utility in the PINK ecosystem
        </motion.p>
      </div>

      {/* Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {NFT_COLLECTIONS.map((collection, index) => (
          <NFTCard key={index} collection={collection} index={index} />
        ))}
      </div>
    </div>
  </section>
));

// NFT Card Component
const NFTCard = ({ collection, index }: { collection: NFTCollection; index: number }) => (
  <motion.div 
    className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/30 transition-all"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
  >
    {/* Image container with hover effect */}
    <div className="relative h-[280px] overflow-hidden">
      <motion.img 
        src={collection.image} 
        alt={collection.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      {/* Floating title */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-2xl font-bold text-white">{collection.name}</h3>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-6">
      <p className="text-gray-300 mb-6">{collection.description}</p>
      
      {/* Stats */}
      {collection.stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {collection.stats.items && (
            <div className="text-center">
              <div className="text-xl font-bold text-white">{collection.stats.items.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Items</div>
            </div>
          )}
          
          {collection.stats.owners && (
            <div className="text-center">
              <div className="text-xl font-bold text-white">{collection.stats.owners.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Owners</div>
            </div>
          )}
          
          {collection.stats.floorPrice && (
            <div className="text-center">
              <div className="text-xl font-bold text-white">{collection.stats.floorPrice}</div>
              <div className="text-xs text-gray-400">Floor Price</div>
            </div>
          )}
        </div>
      )}
      
      {/* View button */}
      <motion.a
        href={collection.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 rounded-lg text-white font-medium transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View on OpenSea
        <FaExternalLinkAlt className="ml-2 text-sm" />
      </motion.a>
    </div>
  </motion.div>
);

NFTSection.displayName = "NFTSection";
export default NFTSection;
