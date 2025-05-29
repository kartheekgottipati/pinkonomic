import { FaTelegram } from "react-icons/fa";
import GamePage from "~/components/GamePage";
import pinkBulletImage from "~/images/games/pink-bullet-preview.jpg";

const PinkBulletPage = () => {
  return (
    <GamePage
      title="Pink Bullet"
      description="Take the role of **Sgt. Quackers** and blast your way through hordes of rogue validator nodes before you face the consequences of eating expired algae chips!"
      image={pinkBulletImage}
      platforms="Available on: Telegram"
      playLinks={[
        { icon: <FaTelegram />, label: "Play Pink Bullet on Telegram", href: "https://t.me/pinkbullet_bot" },
      ]}
    />
  );
};

export function meta() {
  return [
    { title: "Pink Bullet Game | Pinkonomic" },
    { name: "description", content: "Play Pink Bullet: Become Sgt. Quackers and blast rogue validators in this fun Pinkiverse shooter game on Telegram!" }
  ];
}

export default PinkBulletPage;
