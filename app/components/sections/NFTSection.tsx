import { motion } from "framer-motion";
import { forwardRef } from "react";
import PinkPassImage from "~/images/pinkpass.avif"; // Ensure correct path
import PinkPlatypusImage from "~/images/playtypus.png"; // Ensure correct path

const NFT_COLLECTIONS = [
    {
        name: "PINK Pass Collection",
        description: "Your exclusive access to the PINK ecosystem. Holders enjoy benefits, early access, and more!",
        image: PinkPassImage,
        link: "https://opensea.io/collection/pink-pass-1",
    },
    {
        name: "PINK Platypuses",
        description: "The legendary Platypuses of PINK! A high-utility collection with gaming integrations & community perks.",
        image: PinkPlatypusImage,
        link: "https://opensea.io/collection/pink-platypuses",
    },
];

const NFTSection = forwardRef<HTMLDivElement>((props, ref) => (
    <section
        id="nft"
        ref={ref}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-16 py-24 bg-black overflow-hidden"
    >
        {/* 🔥 Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-700/50 to-black opacity-80 -z-10"></div>

        {/* 🚀 Section Title */}
        <motion.h2
            className="text-4xl md:text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 text-center drop-shadow-xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            PINK NFT Collection
        </motion.h2>

        {/* 🎨 NFT Collection Grid */}
        <div className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl">
            {NFT_COLLECTIONS.map((nft, index) => (
                <motion.a
                    key={index}
                    href={nft.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full rounded-2xl overflow-hidden shadow-xl border border-pink-500 transition-all hover:scale-105"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    aria-label={`View ${nft.name} NFT collection on OpenSea`}
                    title={`View ${nft.name} NFT collection on OpenSea`}
                >
                    {/* 🖼 NFT Image with Overlay */}
                    <div className="relative">
                        <img src={nft.image} alt={nft.name} className="w-full h-[300px] sm:h-[400px] object-cover rounded-2xl" />
                        <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                    </div>

                    {/* 🔥 Collection Info */}
                    <div className="absolute bottom-0 w-full px-6 py-4 bg-black/80 text-white backdrop-blur-lg rounded-b-2xl">
                        <h3 className="text-xl md:text-2xl font-bold text-pink-400">{nft.name}</h3>
                        <p className="text-sm md:text-base text-gray-300">{nft.description}</p>
                    </div>

                    {/* ✨ Neon Glow Effect */}
                    <div className="absolute inset-0 border-4 border-transparent rounded-2xl group-hover:border-pink-500/50 transition-all"></div>
                </motion.a>
            ))}
        </div>
    </section>
));

export default NFTSection;
