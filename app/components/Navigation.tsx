import React from "react";
import { motion } from "framer-motion";

export interface SectionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  sections: SectionItem[];
  currentElementIndexInViewport: number;
}

const handleSectionClick = (id: string) => {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth" });
};

export const Sidebar: React.FC<NavigationProps> = ({ sections, currentElementIndexInViewport }) => {
  return (
    <motion.aside
      className="fixed left-6 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md text-white rounded-xl p-4 border border-white/15 flex flex-col items-center space-y-3 z-50 
      lg:block"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-cy="nav-wrapper"
    >
      {sections.map((section, idx) => {
        return (
          <motion.button
            key={idx}
            className={`
              relative flex items-center justify-center w-12 h-12 rounded-lg transition-all
              ${currentElementIndexInViewport === idx ? "bg-pink-500 text-white" : "bg-white/10 hover:bg-white/20"}
              group
            `}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSectionClick(section.id)}
            aria-label={`Go to ${section.label} section`}
            title={`Go to ${section.label} section`}
          >
            {section.icon}
            {/* Tooltip - Only visible on hover */}
            <motion.span
              className="absolute left-full ml-4 px-3 py-1 rounded text-xs bg-black/50 backdrop-blur-sm text-white opacity-0 
  shadow-sm group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10"
            >
              {section.label}
            </motion.span>
          </motion.button>
        );
      })}
    </motion.aside>
  );
};

Sidebar.displayName = "Sidebar";


export const MobileNav: React.FC<NavigationProps> = ({ sections, currentElementIndexInViewport }) => {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md text-white 
      flex items-center justify-around px-4 py-3 shadow-lg"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-cy="nav-wrapper"
    >
      <div className="w-full flex overflow-x-auto no-scrollbar px-2 py-3 space-x-6">
      {sections.map((section, idx) => {
        return (
          <button
            key={idx}
            className={`flex flex-col items-center justify-center text-xs p-2 rounded-md transition-all
              ${currentElementIndexInViewport === idx ? "text-pink-500" : "text-white/60 hover:text-white"}`}
            onClick={() => handleSectionClick(section.id)}
            aria-label={`Go to ${section.label} section`}
            title={`Go to ${section.label} section`}
          >
            {section.icon}
            <span className="text-[10px] sm:text-xs md:text-sm">{section.label}</span>
          </button>
        );
      })}
      </div>
    </motion.nav>
  );
};

MobileNav.displayName = "MobileNav";
