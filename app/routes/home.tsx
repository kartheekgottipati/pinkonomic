import { useRef } from "react";
import { Scrollspy } from "@makotot/ghostui";
import {
  FaHome,
  FaChartLine,
  FaGamepad,
  FaRocket,
  FaHandshake,
  FaShareAlt,
  FaExchangeAlt,
  FaImage
} from "react-icons/fa";
import { Sidebar, MobileNav } from "~/components/Navigation";
import Hero from "~/components/sections/Hero";
import Games from "~/components/sections/Games";
import Teleport from "~/components/sections/Teleport";
import Partnerships from "~/components/sections/Partnerships";
import Socials from "~/components/sections/Socials";
import Pinkonomics from "~/components/sections/Pinkonomics";
import Exchanges from "~/components/sections/Exchanges";
import NFTSection from "~/components/sections/NFTSection";
import Footer from "~/components/Footer";
import type { SectionItem } from "~/types";



const sections: SectionItem[] = [
  { id: "hero", label: "Hero", icon: <FaHome size={20} /> },
  { id: "pinkonomics", label: "Pinkonomics", icon: <FaChartLine size={20} /> },
  { id: "games", label: "Games", icon: <FaGamepad size={20} /> },
  { id: "nft", label: "NFT", icon: <FaImage size={20} /> },
  { id: "teleport", label: "Teleport", icon: <FaRocket size={20} /> },
  { id: "exchanges", label: "Exchanges", icon: <FaExchangeAlt size={20} /> },
  { id: "partnerships", label: "Partnerships", icon: <FaHandshake size={20} /> },
  { id: "socials", label: "Socials", icon: <FaShareAlt size={20} /> },
];

export default function Home() {
  const sectionRefs = sections.map(() => useRef<HTMLDivElement>(null));

  return (
    <Scrollspy sectionRefs={sectionRefs as React.RefObject<Element>[]} offset={-100}>
      {({ currentElementIndexInViewport }) => (
        <div className="relative overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="lg:block hidden" data-cy="nav-wrapper">
            <Sidebar
              sections={sections}
              currentElementIndexInViewport={currentElementIndexInViewport}
              aria-label="Main site navigation"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50" data-cy="nav-wrapper">
            <MobileNav
              sections={sections}
              currentElementIndexInViewport={currentElementIndexInViewport}
              aria-label="Mobile site navigation"
            />
          </div>

          {/* Main content area */}
          <div className="flex-1" data-cy="section-wrapper">
            {/* 1. Hero Section */}
            <Hero ref={sectionRefs[0]} />

            {/* 2. Pinkonomics Section */}
            <Pinkonomics ref={sectionRefs[1]} />

            {/* 3. Games Section */}
            <Games ref={sectionRefs[2]} />

            {/* 4. NFT Section */}
            <NFTSection ref={sectionRefs[3]} />

            {/* 5. Teleport Section */}
            <Teleport ref={sectionRefs[4]} />

            {/* 6. Exchanges Section */}
            <Exchanges ref={sectionRefs[5]} />

            {/* 7. Partnerships Section */}
            <Partnerships ref={sectionRefs[6]} />

            {/* 8. Socials Section */}
            <Socials ref={sectionRefs[7]} />

            {/* Footer */}
            <Footer />
          </div>
        </div>
      )}
    </Scrollspy>
  );
}

export function meta() {
  return [
    { title: "Pinkonomic | The PINK Ecosystem Hub" },
    { name: "description", content: "Discover Pinkonomic: the hub for PINK token, games, NFTs, exchanges, partnerships, and more. Explore the Pinkiverse and join the community!" }
  ];
}