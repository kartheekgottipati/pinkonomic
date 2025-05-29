import { FaTelegram } from "react-icons/fa";
import GamePage from "~/components/GamePage";
import pinkAMoleImage from "~/images/games/pink-a-mole-preview.jpg";

const PinkAMolePage = () => {
  return (
    <GamePage
      title="Pink-a-Mole"
      description="Whack as many platypuses as possible—but avoid the astronauts! A chaotic and fun take on the classic whack-a-mole game."
      image={pinkAMoleImage}
      platforms="Available on: Telegram"
      playLinks={[
        { icon: <FaTelegram />, label: "Play Pink-a-Mole on Telegram", href: "https://t.me/pinkamole_bot" },
      ]}
    />
  );
};

export function meta() {
  return [
    { title: "Pink-a-Mole Game | Pinkonomic" },
    { name: "description", content: "Play Pink-a-Mole: Whack platypuses, dodge astronauts! Enjoy this chaotic, fun whack-a-mole game in the Pinkiverse on Telegram." }
  ];
}

export default PinkAMolePage;
