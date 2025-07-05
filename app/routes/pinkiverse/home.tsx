import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaQuestionCircle, FaPlay, FaStar } from "react-icons/fa";


import pinkDropPreview from "~/images/games/pinkdrop-preview.jpg";
import pinknessOverdrivePreview from "~/images/games/pinkness-overdrive-preview.jpg";
import pinkBulletPreview from "~/images/games/pink-bullet-preview.jpg";
import pinkamolePreview from "~/images/games/pink-a-mole-preview.jpg";
import HomeButton from "~/components/buttons/HomeButton";


interface Game {
	name: string;
	tagline: string;
	image: string | null;
	link: string;
	featured: boolean;
	playLink?: string;
	platform: "browser" | "mobile" | "telegram" | "coming-soon";
}


const games: Game[] = [
	{
		name: "Pink Drop",
		tagline: "Merge parachains, climb the leaderboard!",
		image: pinkDropPreview,
		link: "/pinkiverse/pinkdrop",
		featured: true,
		playLink: "/pinkdrop",
		platform: "browser"
	},
	{
		name: "Pinkness Overdrive",
		tagline: "Race through snow & dodge obstacles!",
		image: pinknessOverdrivePreview,
		link: "/pinkiverse/pinkness-overdrive",
		featured: true,
		playLink: "https://pink.racing",
		platform: "browser"
	},
	{
		name: "Pink Bullet",
		tagline: "Blast rogue validators & survive the chaos!",
		image: pinkBulletPreview,
		link: "/pinkiverse/pinkbullet",
		featured: false,
		playLink: "https://t.me/pinkbullet_bot",
		platform: "telegram"
	},
	{
		name: "Pink-a-mole",
		tagline: "Whack platypuses, but avoid the astronauts!",
		image: pinkamolePreview,
		link: "/pinkiverse/pink-a-mole",
		featured: false,
		playLink: "https://t.me/pinkamole_bot",
		platform: "telegram"
	},
	{
		name: "???",
		tagline: "A mysterious new challenge awaits...",
		image: null,
		link: "",
		featured: false,
		playLink: "",
		platform: "coming-soon"
	},
	{
		name: "???",
		tagline: "A legend in the making...",
		image: null,
		link: "",
		featured: false,
		playLink: "",
		platform: "coming-soon"
	},
];


const featuredGames = games.filter((game) => game.featured);
const regularGames = games.filter((game) => !game.featured);

const Pinkiverse = () => {
	return (
		<section className="relative min-h-screen flex flex-col items-center text-white py-12 px-4 md:px-8 lg:px-12 bg-black overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-b from-black via-pink-950/30 to-black -z-10"></div>
			<motion.div
				className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] bg-pink-500 rounded-full blur-[300px] opacity-20 -z-10"
				animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
			/>

			<div className="absolute inset-0 overflow-hidden -z-5">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 rounded-full bg-pink-400/30"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.2, 0.5, 0.2],
							scale: [1, 1.5, 1],
						}}
						transition={{
							duration: 5 + Math.random() * 5,
							repeat: Infinity,
							delay: Math.random() * 5,
						}}
					/>
				))}
			</div>

			<HomeButton aria-label="Return to home page" title="Return to home page" />

			<motion.div
				className="relative z-10 text-center flex flex-col items-center gap-6 px-4 md:px-8 max-w-4xl mx-auto mt-8 mb-16"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.div
					className="relative inline-block"
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.3 }}
				>
					<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide uppercase">
						The <span className="text-pink-500">Pinkiverse</span>
					</h1>
					<motion.div
						className="absolute -bottom-1 left-0 h-1 bg-pink-500 rounded-full"
						initial={{ width: "0%" }}
						animate={{ width: "100%" }}
						transition={{ duration: 1, delay: 0.5 }}
					/>
				</motion.div>

				<p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-2 md:px-6 max-w-3xl">
					Play, compete, connect. Your gateway to PINK's gaming universe.
				</p>
			</motion.div>

			{featuredGames.length > 0 && (
				<div className="w-full max-w-7xl px-4 mb-16">
					<div className="flex items-center mb-8 relative">
						<h2 className="text-2xl md:text-3xl font-bold text-white">
							Featured <span className="text-pink-500">Games</span>
						</h2>
						<div className="flex-grow h-[1px] bg-gradient-to-r from-pink-500/50 to-transparent ml-4" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{featuredGames.map((game, index) => (
							<FeaturedGameCard key={index} game={game} />
						))}
					</div>
				</div>
			)}

			<div className="w-full max-w-7xl px-4">
				<div className="flex items-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-white">
						All <span className="text-pink-500">Games</span>
					</h2>
					<div className="flex-grow h-[1px] bg-gradient-to-r from-pink-500/50 to-transparent ml-4" />
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{games.map((game, index) => (
						<GameCard key={index} game={game} />
					))}
				</div>
			</div>
		</section>
	);
};


const getPlayButtonText = (game: Game) => {
	switch (game.platform) {
		case "browser": return "Play in Browser";
		case "mobile": return "Download App";
		case "telegram": return "Open in Telegram";
		case "coming-soon": return "Coming Soon";
		default: return "Play Now";
	}
};


const shouldOpenInNewTab = (platform: string, link: string) => {
	return platform === "telegram" || platform === "mobile" || link.startsWith("http");
};

/* Featured Game Card with horizontal layout - Completely redesigned */
const FeaturedGameCard = ({ game }: { game: Game }) => (
	<motion.div
		className="relative flex flex-col overflow-hidden rounded-2xl shadow-lg border border-pink-500/30 
               bg-gradient-to-br from-gray-900 to-black h-full group"
		whileHover={{ scale: 1.02 }}
		transition={{ duration: 0.3, ease: "easeOut" }}
	>
		<div className="relative w-full h-52 md:h-64 overflow-hidden">
			{game.image ? (
				<motion.img
					src={game.image}
					alt={game.name}
					className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
				/>
			) : (
				<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
					<motion.div
						animate={{
							rotate: [0, 10, -10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<FaQuestionCircle className="text-6xl text-pink-400/70" />
					</motion.div>
				</div>
			)}

			<div className="absolute top-3 right-3 px-3 py-1 bg-pink-500 rounded-full text-xs font-bold text-white shadow-lg flex items-center">
				<FaStar className="mr-1" /> FEATURED
			</div>

			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

			<div className="absolute bottom-0 left-0 w-full p-4">
				<h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
					{game.name}
				</h2>
			</div>
		</div>

		<div className="relative flex-grow p-5 flex flex-col justify-between">
			<div className="mb-3">
				<span className="px-3 py-1 rounded-full bg-gray-800/80 text-xs text-white">
					{game.platform === "browser" ? "Web Game" :
						game.platform === "mobile" ? "Mobile App" :
							game.platform === "telegram" ? "Telegram Bot" : "Coming Soon"}
				</span>
			</div>

			<p className="text-gray-300 mb-4">{game.tagline}</p>

			<div className="grid grid-cols-2 gap-3">
				{game.playLink && game.platform !== "coming-soon" && (
					<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
						<a
							href={game.playLink}
							target={shouldOpenInNewTab(game.platform, game.playLink) ? "_blank" : "_self"}
							rel="noopener noreferrer"
							className="flex items-center justify-center px-4 py-3 bg-pink-500
                       rounded-lg text-white font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 
                       transition-all whitespace-nowrap"
							aria-label={`${getPlayButtonText(game)} ${game.name}`}
							title={`${getPlayButtonText(game)} ${game.name}`}
						>
							<FaPlay className="mr-2" /> Play Now
						</a>
					</motion.div>
				)}

				{game.link && (
					<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
						<Link
							to={game.link}
							className="flex items-center justify-center px-4 py-3 bg-gray-800 hover:bg-gray-700 
                       rounded-lg text-white font-medium shadow-lg transition-all whitespace-nowrap"
							aria-label={`Learn more about ${game.name}`}
							title={`Learn more about ${game.name}`}
						>
							Details
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	</motion.div>
);

/* Standard Game Card */
const GameCard = ({ game }: { game: Game }) => (
	<motion.div
		className="relative flex flex-col overflow-hidden rounded-xl shadow-lg border border-pink-500/20 bg-gradient-to-br from-gray-900 to-black h-full"
		whileHover={{
			scale: 1.03,
			boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)",
			borderColor: "rgba(236, 72, 153, 0.4)",
		}}
		transition={{ duration: 0.3, ease: "easeOut" }}
	>
		<div className="relative h-48 overflow-hidden">
			{game.image ? (
				<motion.img
					src={game.image}
					alt={game.name}
					className="w-full h-full object-cover"
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.5 }}
				/>
			) : (
				<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
					<motion.div
						animate={{
							rotate: [0, 10, -10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<FaQuestionCircle className="text-4xl text-pink-400/70" />
					</motion.div>
				</div>
			)}

			<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
		</div>

		<div className="p-5 flex-grow flex flex-col justify-between">
			<div>
				<h2 className="text-xl font-bold text-pink-400 mb-2">{game.name}</h2>
				<p className="text-sm text-gray-400 mb-2">{game.tagline}</p>

				<div className="mb-3">
					<span className="px-2 py-1 rounded-full bg-gray-800 text-xs text-white">
						{game.platform === "browser" ? "Web Game" :
							game.platform === "mobile" ? "Mobile App" :
								game.platform === "telegram" ? "Telegram Bot" : "Coming Soon"}
					</span>
				</div>
			</div>

			<div className="mt-4 flex flex-col gap-2">
				{game.playLink && game.platform !== "coming-soon" && (
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<a
							href={game.playLink}
							target={shouldOpenInNewTab(game.platform, game.playLink) ? "_blank" : "_self"}
							rel="noopener noreferrer"
							className="block w-full px-4 py-2 bg-pink-500 rounded-lg text-center text-white font-medium shadow-md shadow-pink-500/10 hover:shadow-pink-500/30 transition-all"
							aria-label={`${getPlayButtonText(game)} ${game.name}`}
							title={`${getPlayButtonText(game)} ${game.name}`}
						>
							<FaPlay className="inline-block mr-2" size={12} /> {getPlayButtonText(game)}
						</a>
					</motion.div>
				)}
				{game.link ? (
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Link
							to={game.link}
							className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-center text-white font-medium transition-all"
							aria-label={`Learn more about ${game.name}`}
							title={`Learn more about ${game.name}`}
						>
							Details
						</Link>
					</motion.div>
				) : (
					<motion.div
						className="block w-full px-4 py-2 bg-gray-800/50 rounded-lg text-center text-gray-500 font-medium cursor-not-allowed"
					>
						Coming Soon
					</motion.div>
				)}
			</div>
		</div>
	</motion.div>
);

export function meta() {
	return [
		{ title: "Pinkiverse Games Hub | Pinkonomic" },
		{
			name: "description",
			content:
				"Step into the Pinkiverse! Play PINK games, compete on leaderboards, and join the fun in the Pinkonomic gaming universe.",
		},
	];
}

export default Pinkiverse;
