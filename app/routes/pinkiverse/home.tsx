import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaQuestionCircle } from "react-icons/fa";

// Import game images
import pinkDropPreview from "~/images/games/pinkdrop-preview.jpg";
import pinknessOverdrivePreview from "~/images/games/pinkness-overdrive-preview.jpg";
import pinkBulletPreview from "~/images/games/pink-bullet-preview.jpg";
import pinkamolePreview from "~/images/games/pink-a-mole-preview.jpg";
import HomeButton from "~/components/buttons/HomeButton";

// Game Data
const games = [
	{
		name: "Pink Drop",
		tagline: "Merge parachains, climb the leaderboard!",
		image: pinkDropPreview,
		link: "/pinkiverse/pinkdrop",
	},
	{
		name: "Pinkness Overdrive",
		tagline: "Race through snow & dodge obstacles!",
		image: pinknessOverdrivePreview,
		link: "/pinkiverse/pinkness-overdrive",
	},
	{
		name: "Pink Bullet",
		tagline: "Blast rogue validators & survive the chaos!",
		image: pinkBulletPreview,
		link: "/pinkiverse/pinkbullet",
	},
	{
		name: "Pink-a-mole",
		tagline: "Whack platypuses, but avoid the astronauts!",
		image: pinkamolePreview,
		link: "/pinkiverse/pink-a-mole",
	},
	{
		name: "???",
		tagline: "A mysterious new challenge awaits...",
		image: null,
		link: "",
	},
	{
		name: "???",
		tagline: "A legend in the making...",
		image: null,
		link: "",
	},
];

const Pinkiverse = () => {
	return (
		<section className="relative min-h-screen flex flex-col items-center text-white py-20 px-6 md:px-12 bg-black overflow-hidden">
			{/* 🌌 Animated Background */}
			<motion.div className="absolute inset-0 bg-gradient-to-b from-black to-pink-900 opacity-80 -z-10 animate-pulse" />
			<motion.div
				className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-pink-500 rounded-full blur-[200px] opacity-30 -z-10"
				animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
				transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* 🏠 Home Button (Subtle) */}
			<HomeButton />

			{/* 🔥 Pinkiverse Header */}
			<motion.div
				className="relative text-center flex flex-col items-center gap-6 px-4 md:px-12 max-w-4xl mx-auto mt-12"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
			>
				<h1 className="text-5xl md:text-7xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">
					Step Into The Pinkiverse
				</h1>
				<p className="text-lg md:text-2xl text-gray-300 leading-relaxed px-2 md:px-6">
					Where competition meets chaos,
					<br className="hidden md:block" />
					Memes fuel battles, and winners take all.
					<br className="hidden md:block" />
					Join forces, rise up the leaderboard, and claim your place!
				</p>
			</motion.div>

			{/* 🎮 Games Section - Keep Original Long Cards */}
			<motion.div
				className="relative w-full max-w-7xl flex flex-wrap justify-center gap-8 md:gap-12 px-6 mt-16"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0, y: 40 },
					visible: {
						opacity: 1,
						y: 0,
						transition: { staggerChildren: 0.2, ease: "easeOut", duration: 0.8 },
					},
				}}
			>
				{games.map((game, index) => (
					<GamePortal key={index} game={game} />
				))}
			</motion.div>
		</section>
	);
};

/* 🎮 Game Portal - Fixing Small Screen Visibility */
const GamePortal = ({
	game,
}: {
	game: { name: string; tagline: string; image: string | null; link: string };
}) => (
	<motion.div
		className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border-2 border-pink-500/20 w-full md:w-[45%] lg:w-[30%] transition-all hover:shadow-pink-500/30"
		whileHover={{ scale: 1.05 }}
		transition={{ duration: 0.3, ease: "easeOut" }}
	>
		{/* 🔥 Game Cover or Mystery Placeholder */}
		{game.image ? (
			<motion.img
				src={game.image}
				alt={game.name}
				className="w-full h-[450px] md:h-[550px] object-cover brightness-75 group-hover:brightness-100 transition-all"
			/>
		) : (
			<div className="w-full h-[450px] md:h-[550px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black border border-pink-400 rounded-2xl shadow-lg relative">
				<motion.div
					className="relative flex items-center justify-center w-20 md:w-32 h-20 md:h-32 text-pink-400"
					animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				>
					<FaQuestionCircle className="text-6xl md:text-9xl opacity-90 drop-shadow-lg" />
				</motion.div>
			</div>
		)}

		{/* 🏆 Hover Overlay with Portal Effect (Always Visible on Mobile) */}
		<motion.div
			className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black p-4 md:p-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all"
		>
			<h3 className="text-2xl md:text-4xl font-bold text-pink-400">{game.name}</h3>
			<p className="text-sm md:text-lg text-gray-300">{game.tagline}</p>

			{/* 🔗 Play Now Button - Always Visible on Small Screens */}
			{game.link && (
				<motion.div className="mt-3 md:mt-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
					<Link
						to={game.link}
						className="block w-full px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm md:text-lg font-semibold hover:shadow-lg transition text-center"
						aria-label={`Learn more about ${game.name} - ${game.tagline}`}
						title={`Learn more about ${game.name}`}
					>
						Enter the Portal
					</Link>
				</motion.div>
			)}
		</motion.div>
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
