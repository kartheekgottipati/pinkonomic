import { FaGooglePlay, FaTelegram, FaGlobe } from "react-icons/fa";
import GamePage from "~/components/GamePage";
import pinkDropImage from "~/images/games/pinkdrop-preview.jpg";

const tournamentData = [
	{
		name: "🔥 Fusion Fun Fest",
		prize: "🏆 1,000 USD",
		startTime: "Feb 12, 2025, 3:00 PM",
		endTime: "Feb 19, 2025, 3:00 PM",
		link: "https://hub.n3mus.com/tournaments/FUSION-FUN-FEST",
	},
	{
		name: "🏅 Pinkdrop it like it's hot",
		prize: "🥇 1,000 USD",
		startTime: "Dec 5, 2024, 5:00 PM",
		endTime: "Dec 12, 2024, 5:00 PM",
		link: "https://hub.n3mus.com/tournaments/Pinkdrop-it-like-it's-hot",
	},
	{
		name: "🎖️ Pinkmas Magic Drop",
		prize: "🥇 1,000 USD",
		startTime: "Dec 17, 2024, 5:00 PM",
		endTime: "Dec 24, 2024, 5:00 PM",
		link: "https://hub.n3mus.com/tournaments/Pinkmas-Magic-Drop",
	},
	{
		name: "🏆 Pinkdrop Gaming Day",
		prize: "🥇 1,000 USD",
		startTime: "Jan 16, 2025, 4:00 PM",
		endTime: "Jan 23, 2025, 4:00 PM",
		link: "https://hub.n3mus.com/tournaments/Pinkdrop-Gaming-Day",
	},
	{
		name: "🏅 Pinkdrop Frenzy",
		prize: "🥇 1,000 USD",
		startTime: "Jan 22, 2025, 5:00 PM",
		endTime: "Jan 29, 2025, 5:00 PM",
		link: "https://hub.n3mus.com/tournaments/Pinkdrop-Frenzy",
	},
	{
		name: "🏆 Pinkdrop's Merge Madness",
		prize: "🥇 1,000 USD",
		startTime: "Jan 29, 2025, 3:00 PM",
		endTime: "Feb 5, 2025, 3:00 PM",
		link: "https://hub.n3mus.com/tournaments/Pinkdrop's-Merge-Madness",
	},
	{
		name: "🏅 Ball Fusion Challenge",
		prize: "🥇 1,000 USD",
		startTime: "Feb 5, 2025, 3:00 PM",
		endTime: "Feb 12, 2025, 3:00 PM",
		link: "https://hub.n3mus.com/tournaments/Ball-Fusion-Challenge",
	},
];

const PinkDropPage = () => {
	return (
		<GamePage
			title="Pink Drop"
			description="Merge Parachains to reach the ultimate Polkadot ball! A casual, blockchain-powered game built for fun and competition."
			image={pinkDropImage}
			platforms="Available on: Desktop Browsers, Android, Telegram"
			playLinks={[
				{
					icon: <FaGooglePlay />,
					label: "Play Pink Drop on Android",
					href: "https://play.google.com/store/apps/details?id=com.dotispink.pinkdrop",
				},
				{
					icon: <FaTelegram />,
					label: "Play Pink Drop on Telegram",
					href: "https://t.me/pinkdrop_bot",
				},
				{ icon: <FaGlobe />, label: "Play Pink Drop in Browser", href: "/game" },
			]}
			tournaments={tournamentData}
		/>
	);
};

export function meta() {
	return [
		{ title: "Pink Drop Game | Pinkonomic" },
		{
			name: "description",
			content:
				"Play Pink Drop: Merge parachains, compete in tournaments, and reach the ultimate Polkadot ball! Available on Android, Telegram, and browser.",
		},
	];
}

export default PinkDropPage;
