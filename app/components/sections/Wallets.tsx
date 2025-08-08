import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import BaseSquareBlue from "~/images/wallets/base_square_blue.svg";
import talismanRed from "~/images/wallets/talisman_red.png";
import subwalletWhiteDarkBlue from "~/images/wallets/subwallet_white_dark_blue.svg";
import novaIconRadial from "~/images/wallets/nova_icon_radial.svg";
import metamaskIconFox from "~/images/wallets/metamask_icon_fox.svg";
import ledgerWhiteLogo from "~/images/wallets/white_ledger_logo.svg";

interface Wallet {
    name: string;
    image: string;
    link: string;
    description?: string;
    platform?: string;
}

const wallets: Wallet[] = [
    {
        name: "MetaMask",
        image: metamaskIconFox,
        link: "https://metamask.io",
        platform: "Browser Extension"
    },
    {
        name: "Talisman",
        image: talismanRed,
        link: "https://talisman.xyz",
        platform: "Browser Extension"
    },
    {
        name: "Base Wallet",
        image: BaseSquareBlue,
        link: "https://join.base.app",
        platform: "Mobile"
    },
    {
        name: "Nova Wallet",
        image: novaIconRadial,
        link: "https://novawallet.io",
        platform: "Mobile"
    },
    {
        name: "Subwallet",
        image: subwalletWhiteDarkBlue,
        link: "https://subwallet.app",
        platform: "Mobile & Extension"
    },
    {
        name: "Ledger",
        image: ledgerWhiteLogo,
        link: "https://www.ledger.com",
        platform: "Hardware"
    }
];

const Wallets = forwardRef<HTMLDivElement>((props, ref) => (
    <section
        id="wallets"
        ref={ref}
        className="relative py-24 bg-black overflow-hidden"
    >
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/5 via-black to-black -z-10"></div>

        {/* Subtle glow effect */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/5 rounded-full blur-[120px] -z-5"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
            {/* Section header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                    <FaWallet className="text-pink-400 mr-2" size={14} />
                    <span className="text-sm text-pink-300 font-medium">WALLETS</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Supported <span className="text-pink-500">Wallets</span>
                </h2>

                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Connect with your favorite wallet to access the PINK ecosystem
                </p>
            </motion.div>

            {/* Wallets showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wallets.map((wallet, index) => (
                    <motion.a
                        key={index}
                        href={wallet.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-pink-500/30 hover:bg-gray-800/40 transition-all duration-300"
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
                                    src={wallet.image}
                                    alt={wallet.name}
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        const fallback = document.createElement('div');
                                        fallback.innerHTML = '💳';
                                        fallback.className = 'text-2xl';
                                        (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-xl mb-1">{wallet.name}</h3>
                                <p className="text-gray-400 text-sm">{wallet.platform}</p>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    </section>
));

Wallets.displayName = "Wallets";
export default Wallets;