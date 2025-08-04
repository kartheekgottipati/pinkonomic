import React, { useState, useEffect, useRef, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PinkonomicsChart from "~/components/PinkonomicsChart";
import ParachainPointsTable from "~/components/ParachainPointsTable";
import { FaDiscord, FaTelegram, FaTwitter, FaBook } from "react-icons/fa";
import { Link } from "react-router";

const sections = [
  { id: "intro", title: "Introduction", icon: "📌" },
  { id: "wtf-is-pink", title: "WTF is PINK?", icon: "🔍" },
  { id: "pinkonomics", title: "$PINKonomics", icon: "📊" },
  { id: "airdrop-tranches", title: "Airdrop Tranches", icon: "🪂" },
  { id: "future-tranches", title: "Future Tranches", icon: "🔮" },
  { id: "pools", title: "Pools & Treasury", icon: "💰" },
  { id: "future", title: "The Future is $PINK", icon: "🚀" },
  { id: "pinkdrop-wont-stop", title: "$PINKdrop Won't Stop", icon: "🎮" },
  { id: "final-thoughts", title: "Final Thoughts", icon: "💭" },
];

const PinkPaper = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);


  // Using createRef for section elements
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLElement | null>>>({});

  useEffect(() => {
    // Initialize section refs on component mount
    sections.forEach((section) => {
      sectionRefs.current[section.id] = React.createRef<HTMLElement>();
    });

    // Set initial active section after a brief delay
    setTimeout(() => {
      handleScroll();
    }, 500);
  }, []);


  // Function to handle scrolling and active section updates
  const handleScroll = () => {
    setHasScrolled(window.scrollY > 100);

    // Calculate scroll progress percentage
    const scrollableHeight = document.body.scrollHeight - window.innerHeight;
    const currentProgress = (window.scrollY / scrollableHeight) * 100;
    setScrollProgress(Math.min(currentProgress, 100));

    // Find the current active section based on scroll position
    // Check each section ref and find the one closest to the top viewport
    const currentSections = sections
      .map(section => {
        const ref = sectionRefs.current[section.id];
        if (!ref || !ref.current) return { id: section.id, distance: Infinity };

        const rect = ref.current.getBoundingClientRect();
        // Calculate how far this element is from the ideal position (100px from top)
        const distance = Math.abs(rect.top - 100);

        // Only consider elements that are either above the viewport or visible
        return { id: section.id, distance: rect.bottom > 0 ? distance : Infinity };
      })
      .sort((a, b) => a.distance - b.distance);

    if (currentSections.length > 0 && currentSections[0].distance !== Infinity) {
      setActiveSection(currentSections[0].id);
    }
  };

  useEffect(() => {

    // Throttle scroll event for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);

    // Run once on initial load
    handleScroll();

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];

    if (ref && ref.current) {
      const element = ref.current;
      const offset = 100; // Adjust for header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });

      // Immediately update active section for better UX
      setActiveSection(sectionId);
      // Close mobile nav if open
      setShowMobileNav(false);
    } else {
      console.warn(`Could not find ref for section: ${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background elements */}
      <div className="fixed inset-0 bg-[url('/images/cosmos-bg.jpg')] bg-cover bg-center opacity-10 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0"></div>

      {/* Simplified grid background - reduced opacity and size */}
      <div className="fixed inset-0 opacity-15 z-0">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(236,72,153,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Background glow effects removed */}

      {/* Static subtle dots instead of animated particles */}
      <div className="fixed inset-0 z-0 opacity-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.3) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        ></div>
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'backdrop-blur-xl bg-black/30' : 'bg-gradient-to-b from-black/30 to-transparent'}`}>
        {/* Full-width background and effects that stretch across the entire width */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-pink-50/5 to-white/5 backdrop-blur-sm"></div>
        <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-pink-500/30 via-pink-500/50 to-purple-500/30 w-full shadow-lg shadow-pink-500/20"></div>

        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">

          <Link to="/" className="text-2xl font-bold hover:text-pink-400 transition-all relative z-10">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">PINK</span>
          </Link>

          <button
            className="lg:hidden relative z-10 bg-gradient-to-br from-white/10 to-pink-50/10 p-3 rounded-lg text-pink-400 backdrop-blur-md border border-white/20"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <motion.div
              animate={{
                rotate: showMobileNav ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <FaBook />
            </motion.div>
          </button>
        </div>
      </header>


      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glassmorphism layered background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80 backdrop-blur-xl z-0"></div>
            <div className="absolute inset-0 z-0 opacity-50">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            {/* Mobile nav glow effects removed */}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Pink Paper
                </div>
                <motion.button
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-[1px] rounded-full border border-white/10"
                  onClick={() => setShowMobileNav(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="bg-gradient-to-br from-black/40 to-black/60 hover:from-black/50 hover:to-black/70 p-3 rounded-full text-pink-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-3">
                  {sections.map((section, index) => (
                    <motion.li
                      key={section.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.button
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center w-full p-4 rounded-xl text-left transition-all ${activeSection === section.id
                          ? 'bg-gradient-to-br from-white/10 to-pink-200/5 backdrop-blur-md text-pink-200 border border-white/20'
                          : 'text-gray-300 hover:bg-white/5 hover:border-white/10 hover:border hover:text-white'
                          }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`text-2xl mr-4 ${activeSection === section.id ? 'text-pink-300' : 'text-gray-400'}`}>{section.icon}</span>
                        <span className="text-xl font-medium">{section.title}</span>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-8 border-t border-white/10">
                <div className="flex justify-center space-x-8">
                  <motion.a
                    href="https://discord.gg/pink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-white/10 to-white/5 p-[1px] rounded-full border border-white/10"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-gradient-to-br from-black/30 to-black/50 hover:from-pink-500/20 hover:to-pink-500/40 p-4 rounded-full text-pink-300">
                      <FaDiscord size={24} />
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://t.me/pinkeconomic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-white/10 to-white/5 p-[1px] rounded-full border border-white/10"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-gradient-to-br from-black/30 to-black/50 hover:from-pink-500/20 hover:to-pink-500/40 p-4 rounded-full text-pink-300">
                      <FaTelegram size={24} />
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/pinkonomic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-white/10 to-white/5 p-[1px] rounded-full border border-white/10"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-gradient-to-br from-black/30 to-black/50 hover:from-pink-500/20 hover:to-pink-500/40 p-4 rounded-full text-pink-300">
                      <FaTwitter size={24} />
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <main className="relative z-10 pt-20 w-full">
        <div className="container mx-auto pb-20">
          <div className="lg:flex lg:gap-8 lg:min-h-screen relative">

            <div className="hidden lg:block lg:sticky lg:top-0 w-72 xl:w-80 h-screen overflow-y-auto z-30">
              {/* Sticky sidebar that properly aligns with content */}
              <div className="h-full pt-24 pb-6 flex flex-col"
                style={{
                  filter: 'drop-shadow(0px 0px 20px rgba(0,0,0,0.2))'
                }}>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative flex-1 flex flex-col"
                >
                  {/* Animated glow effect */}
                  {/* Removed animated glow effect */}

                  <div className="bg-gradient-to-br from-white/10 to-white/5 p-[2px] rounded-2xl backdrop-blur-xl border border-white/10 flex-1 flex flex-col">
                    <div className="bg-gradient-to-b from-black/30 to-black/40 backdrop-blur-xl rounded-2xl p-5 overflow-hidden relative flex-1 flex flex-col">
                      {/* Decorative background patterns */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0"
                          style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center mb-4">
                          <div className="w-7 h-7 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full p-[2px] mr-2 border border-white/10">
                            <div className="bg-black/40 backdrop-blur-md w-full h-full rounded-full flex items-center justify-center">
                              <div
                                className="w-2 h-2 bg-pink-300 rounded-full opacity-80"
                              ></div>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                            Table of Contents
                          </h3>
                        </div>

                        <nav className="space-y-1.5 relative flex-1">
                          {/* Animated highlight line */}
                          <motion.div
                            className="absolute left-0 w-1.5 bg-gradient-to-b from-pink-300 to-purple-400 rounded-full"
                            animate={{
                              top: sections.findIndex(s => s.id === activeSection) * 36, // Adjusted for smaller buttons
                              height: 36,
                              opacity: 1
                            }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />

                          {sections.map((section, index) => (
                            <motion.button
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className={`flex items-center w-full py-2 px-3 rounded-xl text-left transition-all ${activeSection === section.id
                                ? 'bg-gradient-to-r from-white/5 to-pink-500/10 text-pink-200 border border-white/10 pl-4'
                                : 'text-gray-200 hover:bg-white/5 hover:text-pink-100 hover:pl-4 hover:border hover:border-white/5'
                                }`}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: 1,
                                x: activeSection === section.id ? 3 : 0,
                                transition: {
                                  type: activeSection === section.id ? "spring" : "tween",
                                  stiffness: 300,
                                  damping: 20
                                }
                              }}
                              transition={{ delay: index * 0.05 + 0.5 }}
                            >
                              <motion.span
                                className={`text-xl mr-2 ${activeSection === section.id ? 'text-pink-300' : 'text-gray-300'}`}
                                animate={activeSection === section.id ? {
                                  scale: 1.1,
                                  y: [0, -1, 0]
                                } : {
                                  scale: 1
                                }}
                                transition={{
                                  y: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                    repeat: 0
                                  },
                                  scale: {
                                    duration: 0.3,
                                    ease: "easeOut"
                                  }
                                }}
                              >
                                {section.icon}
                              </motion.span>
                              <span className="font-medium text-sm">{section.title}</span>
                            </motion.button>
                          ))}
                        </nav>

                        <div className="mt-6 pt-4 border-t border-pink-900/30 relative">
                          {/* Static decorative line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
                          />

                          <h3 className="text-sm font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">Join the Community</h3>
                          <div className="flex space-x-3 justify-center">
                            <motion.a
                              href="https://discord.gg/pink"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 p-[1px] rounded-full"
                              whileHover={{ y: -3, scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="bg-gray-900 hover:bg-gray-800 p-2 rounded-full text-pink-400">
                                <FaDiscord size={18} />
                              </div>
                            </motion.a>
                            <motion.a
                              href="https://t.me/pinkeconomic"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 p-[1px] rounded-full"
                              whileHover={{ y: -3, scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="bg-gray-900 hover:bg-gray-800 p-2 rounded-full text-pink-400">
                                <FaTelegram size={18} />
                              </div>
                            </motion.a>
                            <motion.a
                              href="https://twitter.com/pinkonomic"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 p-[1px] rounded-full"
                              whileHover={{ y: -3, scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="bg-gray-900 hover:bg-gray-800 p-2 rounded-full text-pink-400">
                                <FaTwitter size={18} />
                              </div>
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>


            <div className="lg:flex-1 w-full mx-auto px-4 lg:px-8">
              {/* Full width content with proper spacing */}
              <section
                id="intro"
                ref={sectionRefs.current["intro"]}
                className="min-h-[75vh] flex flex-col justify-center pt-24 pb-16 relative overflow-hidden"
              >
                {/* Enhanced background elements */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
                  <div className="w-[800px] h-[800px] border-[40px] border-pink-500/10 rounded-full animate-pulse"></div>
                  <div className="absolute w-[600px] h-[600px] border-[30px] border-purple-500/10 rounded-full"></div>
                  <div className="absolute w-[400px] h-[400px] border-[20px] border-fuchsia-500/10 rounded-full"></div>
                </div>

                {/* Decorative glow elements removed */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="relative z-10"
                >
                  <div className="text-center mb-16 relative max-w-5xl mx-auto px-6">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                      <div
                        className="w-32 h-32 -mt-12"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-full p-1">
                          <div className="bg-gray-900 w-full h-full rounded-full flex items-center justify-center">
                            <span className="text-6xl">📜</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.h1
                      className="text-6xl sm:text-7xl md:text-9xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent pb-4 tracking-tighter mt-16 relative z-10"
                      initial={{ opacity: 0, y: -30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                    >
                      <span className="relative inline-block">
                        The
                      </span>{" "}
                      <span className="relative inline-block">
                        Pink
                      </span>{" "}
                      <span className="relative inline-block">
                        Paper
                      </span>
                    </motion.h1>

                    <motion.div
                      className="h-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 mx-auto my-8 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", maxWidth: "500px", opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1.2 }}
                    />

                    <motion.p
                      className="text-2xl md:text-3xl text-pink-100 w-full mx-auto mt-8 leading-relaxed font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      A community-driven document outlining the vision, tokenomics, and future of $PINK.
                    </motion.p>
                  </div>

                  <div className="w-full mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1, type: "spring" }}
                    >
                      <div className="bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-purple-500/30 rounded-2xl p-[2px] relative">
                        {/* Static border without animation */}

                        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
                          {/* Corner glow effects removed */}

                          {/* Static light accents instead of animated streaks */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" style={{ top: '20%', left: 0, right: 0, transform: "rotate(-5deg)" }}></div>
                            <div className="absolute h-[1px] bg-gradient-to-r from-transparent via-pink-500/15 to-transparent" style={{ top: '50%', left: 0, right: 0, transform: "rotate(-5deg)" }}></div>
                            <div className="absolute h-[1px] bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" style={{ top: '80%', left: 0, right: 0, transform: "rotate(-5deg)" }}></div>
                          </div>

                          <div className="relative z-10">
                            <div className="flex items-center mb-6">
                              <div
                                className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-400 rounded-xl p-[1px] mr-4 border border-white/10"
                              >
                                <div className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md w-full h-full rounded-[9px] flex items-center justify-center">
                                  <span className="text-2xl">✨</span>
                                </div>
                              </div>

                              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                                Welcome to PINK
                              </h2>
                            </div>

                            <p className="text-pink-100 leading-relaxed text-xl mb-6">
                              This document outlines the vision, tokenomics, and roadmap of $PINK - the meme community
                              for the Polkadot ecosystem.
                            </p>

                            <div className="bg-gradient-to-br from-white/5 to-pink-500/10 p-6 rounded-xl border border-white/10 text-gray-200 text-lg backdrop-blur-sm">
                              Before diving into the details, remember that $PINK is for
                              <span className="text-pink-300 font-medium"> entertainment purposes only</span>, with no formal team or roadmap - just an open community of
                              volunteers spreading <span className="text-pink-200 font-medium">PINK vibes</span> across the ecosystem.
                            </div>

                            {/* Decorative particles removed */}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>


              <section
                id="wtf-is-pink"
                ref={sectionRefs.current["wtf-is-pink"]}
                className="py-16 scroll-mt-20 relative"
              >
                {/* Decorative blur elements removed */}

                <div className="w-full mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl text-2xl">
                        <div className="bg-gray-900/80 w-12 h-12 rounded-lg flex items-center justify-center">
                          🔍
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-200 to-purple-300 bg-clip-text text-transparent">
                        WTF is PINK?
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-white/10 to-white/5 p-[1px] rounded-2xl border border-white/10">
                      <div className="bg-gradient-to-b from-black/30 to-black/40 backdrop-blur-lg rounded-2xl p-6 md:p-8 prose prose-lg prose-invert max-w-none">
                        <p className="text-xl leading-relaxed">
                          PINK is a meme community for the Polkadot ecosystem with the goal of gaining net new eyeballs on Polkadot,
                          and introducing the PINK gaming universe.
                        </p>

                        <div className="my-6 border-l-4 border-pink-300/40 pl-6 py-2 bg-gradient-to-r from-pink-500/5 to-transparent rounded-r-lg">
                          <p className="text-lg text-pink-100 italic">
                            PINK captures new mindshare by reinforcing the image that Polkadot is Pink, a color of positivity and
                            laughter. Once we capture mindshare around a simple ecosystem narrative, it becomes easier to discuss
                            Polkadot's compelling tech narratives.
                          </p>
                        </div>

                        <p>
                          Polkadot - and crypto more generally - needs simpler, more engaging narratives. Our space also
                          needs simple tech to allow for experimentation and fun to increase adoption.
                        </p>

                        {/* Decorative pixel art */}
                        <div className="absolute bottom-4 right-4 opacity-30">
                          <div className="w-8 h-8 grid grid-cols-4">
                            {[...Array(16)].map((_, i) => (
                              <div
                                key={i}
                                className={`${Math.random() > 0.5 ? 'bg-pink-500' : 'bg-purple-500'} opacity-${Math.floor(Math.random() * 80) + 20}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                      <motion.div
                        className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm p-5 rounded-xl border border-white/10"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg text-xl mb-3 border border-white/5">
                          ✨
                        </div>
                        <h3 className="text-xl font-medium text-pink-300 mb-2">Community</h3>
                        <p className="text-gray-400">Bringing together enthusiasts from across the Polkadot ecosystem</p>
                      </motion.div>

                      <motion.div
                        className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-pink-500/20"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-pink-900/40 rounded-lg text-xl mb-3">
                          🎮
                        </div>
                        <h3 className="text-xl font-medium text-pink-300 mb-2">Games</h3>
                        <p className="text-gray-400">Fun, accessible games introducing new users to the ecosystem</p>
                      </motion.div>

                      <motion.div
                        className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-pink-500/20"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-pink-900/40 rounded-lg text-xl mb-3">
                          📈
                        </div>
                        <h3 className="text-xl font-medium text-pink-300 mb-2">Growth</h3>
                        <p className="text-gray-400">Creating narratives that expand Polkadot's reach and accessibility</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="pinkonomics"
                className="py-16 scroll-mt-20 relative"
              >
                {/* Static decorative pattern - no animation */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="w-full mx-auto relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-gray-900/80 w-14 h-14 rounded-lg flex items-center justify-center text-3xl">
                          📊
                        </div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        $PINKonomics
                      </h2>
                    </div>

                    <div className="mb-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-2xl overflow-hidden">
                      <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6">
                        <PinkonomicsChart />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-2xl overflow-hidden">
                      <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 prose prose-lg prose-invert max-w-none relative">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-bl-[100%] -z-10"></div>

                        <p className="text-xl leading-relaxed">
                          The Pinkonomics of $PINK have been carefully thought through with the objective to fulfill the
                          primary mission of PINK, which is to bring more users to Polkadot in the most frictionless and
                          fun way possible.
                        </p>

                        <p className="text-lg">
                          $PINK has been minted on the Polkadot Asset Hub, a relatively unknown but powerful chain in the
                          ecosystem. The reason for this is for the PINK community to be at the heart of Polkadot and
                          proliferate out from there, touching every Parachain that will have it.
                        </p>
                        <p>
                          There are five clearly defined buckets for the token supply which will have no inflation and a
                          total supply of 2,300,001,221.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl mt-8">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-pink-900/60 flex items-center justify-center text-3xl mr-6">
                          💎
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-pink-300">Total Supply</h3>
                          <p className="text-3xl font-bold text-white mt-1">2,300,001,221 $PINK</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="airdrop-tranches"
                className="py-16 scroll-mt-20 relative"
              >
                {/* Background glow removed */}

                <div className="w-full mx-auto relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center"
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="bg-gray-900/80 w-14 h-14 rounded-lg flex items-center justify-center text-3xl">
                          🪂
                        </div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        Airdrop Tranches
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-2xl mb-10 overflow-hidden">
                      <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl">
                        <h3 className="text-2xl font-bold text-pink-300 mb-2">50% Airdrops</h3>
                        <p className="text-gray-300">
                          This is by far the largest category and supports PINK's core mission of sharing $PINK to as many
                          participants as possible across ecosystems.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div className="relative">
                        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-transparent"></div>
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-xl mb-4">
                            1
                          </div>
                          <div className="pl-16 -mt-12">
                            <h4 className="text-xl font-semibold text-pink-300 mb-3">
                              Tranche 1: 15% Total Supply - PINKdrop [The Game]
                            </h4>
                            <div className="prose prose-lg prose-invert">
                              <p>
                                The first airdrop campaign was focused on the popular game PINKdrop and is aimed to bootstrap pinkness.
                                All that was required was to connect an EVM wallet and record a high score.
                              </p>
                              <p>
                                What easier way to spread $PINK across ecosystems than with a fun addictive game? The stats have spoken for
                                themselves with over 14,140 players and 226k games in the first month.
                              </p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg mt-4 border border-pink-500/10">
                              <p className="text-sm text-gray-400">
                                <span className="text-pink-400 font-medium">How it works:</span> $PINK has been registered on Moonbeam,
                                an EVM parachain on Polkadot, enabling the PINK Community to send it to all eligible EVM wallets on their chain.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-xl mb-4">
                          2
                        </div>
                        <div className="pl-16 -mt-12">
                          <h4 className="text-xl font-semibold text-pink-300 mb-3">
                            Tranche 2: 12.5% Total Supply - Parachain teams
                          </h4>
                          <div className="prose prose-lg prose-invert">
                            <p>
                              Every team with a parachain on Polkadot is and always will be eligible to claim a % of supply from this
                              tranche. Memecoins are about the culture, and the native memecoin of Polkadot should be available to all teams.
                            </p>
                          </div>

                          <div className="my-6">
                            <ParachainPointsTable />
                          </div>

                          <div className="bg-black/30 p-4 rounded-lg mt-4 border border-pink-500/10">
                            <p className="text-sm text-gray-400">
                              <span className="text-pink-400 font-medium">Distribution model:</span> The allocation per team decreases by 10%
                              each time a slot is filled with the first team eligible to claim 10% of the total pot (1.25% of supply).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="future-tranches"
                className="py-16 scroll-mt-20 relative"
              >
                {/* Decorative blur elements removed */}

                <div className="w-full mx-auto relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center"
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="bg-gray-900/80 w-14 h-14 rounded-lg flex items-center justify-center text-3xl">
                          🔮
                        </div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        Future Tranches
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-[1px] rounded-2xl">
                      <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 prose prose-lg prose-invert max-w-none">
                        <p className="text-lg text-gray-200">
                          These are still being finalized and will be guided by the PINK community once $PINK is live. The
                          main aim will be to target non-native communities to Polkadot in order to draw them into the
                          ecosystem as well as share more pinkness with the most loyal PINK community members.
                        </p>
                        <p>
                          These rolling airdrops have been delivered with great success in other notable meme projects as they create
                          sustainability and the ability to have ongoing engagement and excitement for the project rather than giving
                          it all out on Day 1.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="pools"
                className="py-16 scroll-mt-20"
              >
                <div className="w-full mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        💰
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Pools & Treasury
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-semibold text-pink-400 mb-4">30% Pools</h3>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-pink-500/20">
                          <p className="text-gray-300">
                            Enabling opportunities for anyone to join the $PINK community in a totally open, decentralized manner
                            is critical. Pools keep the world hydrated and are key onboarding mechanisms for new community members,
                            as pools make it easier for new people to engage with PINK in an above-board manner. Though, to be clear,
                            there is no need to access pools to enjoy Pink community vibes.
                          </p>
                          <p className="mt-4 text-gray-300">
                            However, by committing 30% of $PINK for multiple pools across ecosystems, $PINK will have the best chance
                            of maximizing participation in the PINK community.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-pink-400 mb-4">10% Treasury</h3>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-pink-500/20">
                          <p className="text-gray-300">
                            Every great project needs reserves from a community-led Treasury to better the project as the holders see
                            fit and $PINK is no different in that respect. 10% of the supply is dedicated to this and it will be up to
                            the community and holders how this is shared as the project develops.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-pink-400 mb-4">5% C. Pools</h3>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-pink-500/20">
                          <p className="text-gray-300">
                            What may be viewed as a bit of a joke, this has been set aide with all seriousness. The day may come when
                            a Centralised Pool is appropriate. For this to be feasible, $PINK will need to be available to enable
                            onboarding to the right audience in an above board way.
                          </p>
                          <p className="mt-4 text-gray-300">
                            This will be a nice community decision to face at the time, as this $PINK will not be used for anything else,
                            so can be considered non-existent until the time comes.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-pink-400 mb-4">5% Pink Vibes</h3>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-pink-500/20">
                          <p className="text-gray-300">
                            5% is for approximately 45 volunteers from a wide range of existing Polkadot communities that have embraced
                            pinkness from the start by spreading pinkness. They vibe with PINK community values and, ultimately, they are
                            dedicated to the success of the Polkadot ecosystem.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="future"
                className="py-16 scroll-mt-20"
              >
                <div className="w-full mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        🚀
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        The Future is $PINK
                      </h2>
                    </div>

                    <div className="space-y-4 text-gray-300">
                      <p>
                        While all of the above sounds great and has the designs of a potentially successful memecoin, $PINK plans to be
                        much more than that. $PINK aims to develop a sustainable community model, so community participants feel a part
                        of something bigger than themselves. It is imagined that our community of volunteers will experiment, learn and
                        grow over time.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="pinkdrop-wont-stop"
                className="py-16 scroll-mt-20"
              >
                <div className="w-full mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        🎮
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        $PINKdrop Won't Stop
                      </h2>
                    </div>

                    <div className="space-y-4 text-gray-300">
                      <p>
                        The success and enjoyment of PINKdrop has been electric and there is an opportunity to promote even more pinkness
                        and positivity throughout the broader crypto ecosystem.
                      </p>
                      <p>
                        After the initial airdrop, PINKdrop will evolve to enable more sustainability for the PINK community. The aim of
                        this is to accomplish two things:
                      </p>
                      <p>
                        First, to create a new reason for people to join the PINK community. Within the first month of the game there
                        were more than 14k players with very little marketing and push outside of the Polkadot eco.
                      </p>
                      <p>
                        Second, by creating new ways to engage the PINK community with PINKdrop, it will offer existing community members
                        ongoing reasons to continue to benefit from and spread PINK vibes. This gives scope to create a variety of game
                        formats where players will pay to compete to earn prizes.
                      </p>
                      <p>
                        The future development of simple to play games could also allow more ways to grow the PINK community.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>


              <section
                id="final-thoughts"
                className="py-16 scroll-mt-20"
              >
                <div className="w-full mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        💭
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Final Thoughts
                      </h2>
                    </div>

                    <div className="space-y-4 text-gray-300">
                      <p>
                        What started as a way to try and bring some $PINKness back to Polkadot has fast become a thriving community
                        full of enthusiasts, dreamers, and builders.
                      </p>
                      <p>
                        As a community, we all have the chance to try and deliver a healthy dose of meme culture to Polkadot, which
                        we think we can admit takes itself too seriously sometimes (sorry GAV!)
                      </p>
                      <p>
                        We look forward to you joining us on this journey! Who knows where it will end, but if we shoot for the moon
                        hopefully we will land on a star!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative mt-32 pb-16">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

                {/* Decorative blobs */}
                <motion.div
                  className="absolute -top-20 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl opacity-60 z-0"
                  animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="absolute -top-10 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl opacity-60 z-0"
                  animate={{
                    scale: [1.1, 0.9, 1.1],
                    x: [0, -15, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                <div className="max-w-3xl mx-auto text-center relative z-10 pt-16">
                  {/* Pink Logo */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8"
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-full p-[3px]">
                      <div className="bg-gray-900 rounded-full w-full h-full flex items-center justify-center">
                        <span className="text-3xl">🌸</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mb-8">
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href="https://discord.gg/pink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-full"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full text-pink-400">
                          <FaDiscord size={24} />
                        </div>
                      </motion.a>
                      <motion.a
                        href="https://t.me/pinkeconomic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-full"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full text-pink-400">
                          <FaTelegram size={24} />
                        </div>
                      </motion.a>
                      <motion.a
                        href="https://twitter.com/pinkonomic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-[1px] rounded-full"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full text-pink-400">
                          <FaTwitter size={24} />
                        </div>
                      </motion.a>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm">© 2024 Pinkonomic. All rights reserved.</p>
                  <p className="text-gray-500 text-xs mt-2">Built with 💖 by the PINK community</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>

      {/* Back to top button */}
      <AnimatePresence>
        {hasScrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-gradient-to-br from-pink-500/80 to-purple-500/80 p-[1px] rounded-full shadow-lg shadow-pink-500/20 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gray-900/90 backdrop-blur-md p-3 rounded-full text-pink-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PinkPaper;

export function meta() {
  return [
    { title: "The Pink Paper | Pinkonomic" },
    { name: "description", content: "Read the Pink Paper: the community-driven document outlining the vision, tokenomics, airdrops, and future of $PINK in the Polkadot ecosystem." }
  ];
}