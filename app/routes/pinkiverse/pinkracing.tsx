import { FaGlobe } from "react-icons/fa";
import GamePage from "~/components/GamePage";
import pinknessOverdriveImage from "~/images/games/pinkness-overdrive-preview.jpg";

const PinknessOverdrivePage = () => {
  return (
    <GamePage
      title="Pinkness Overdrive"
      description="Take a high-speed snowboarding ride through treacherous terrain. Dodge obstacles, race against time, and dominate the leaderboard!"
      image={pinknessOverdriveImage}
      platforms="Available on: Desktop Browsers Only"
      playLinks={[
        { icon: <FaGlobe />, label: "Play Pinkness Overdrive in Browser", href: "https://pink.racing" },
      ]}
    />
  );
};

export function meta() {
  return [
    { title: "Pinkness Overdrive Game | Pinkonomic" },
    { name: "description", content: "Play Pinkness Overdrive: Race through snowy terrain, dodge obstacles, and climb the leaderboard in this high-speed Pinkiverse browser game!" }
  ];
}

export default PinknessOverdrivePage;
