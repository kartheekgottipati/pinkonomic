import { useState, useEffect, useRef, type RefObject } from "react";
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
  
  // Fix the ref type by creating specific section refs - no need to store refs actually
  const sectionRefs = useRef<Record<string, RefObject<HTMLElement>>>({});
  
  // Initialize section refs
  useEffect(() => {
    // We're using id-based scrolling instead of refs, so we don't need to store refs
    // Just use the scroll event to determine active section
  }, []);
  
  // Handle scroll and intersection observation
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
      
      // Find which section is currently in view
      const currentSectionId = sections.find(section => {
        const element = document.getElementById(section.id);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      })?.id;
      
      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
      setShowMobileNav(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cosmic background */}
      <div className="fixed inset-0 bg-[url('/images/cosmos-bg.jpg')] bg-cover bg-center opacity-20 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0"></div>
      
      {/* Animated gradient blob */}
      <div className="fixed -top-1/2 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px]">
        <motion.div 
          className="w-full h-full rounded-full bg-gradient-to-br from-pink-600/20 via-purple-600/10 to-transparent blur-[150px]"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Simplified Header - just the logo and mobile menu button */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-pink-900/10' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">
            <span className="text-pink-500">Pink</span>onomic
          </Link>
          
          {/* Mobile menu button - only visible on mobile */}
          <button 
            className="lg:hidden bg-gray-900 p-2 rounded-lg text-pink-400"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <FaBook />
          </button>
        </div>
      </header>
      
      {/* Mobile navigation overlay - now contains all sections */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-end p-4">
              <button 
                className="text-gray-400 hover:text-white p-2"
                onClick={() => setShowMobileNav(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-4">
                {sections.map((section) => (
                  <motion.li 
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sections.indexOf(section) * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full p-3 rounded-xl text-left ${
                        activeSection === section.id
                          ? 'bg-pink-900/30 text-pink-300 border border-pink-500/30'
                          : 'text-gray-300 hover:bg-gray-900/50'
                      }`}
                    >
                      <span className="text-2xl mr-3">{section.icon}</span>
                      <span className="text-lg">{section.title}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-center space-x-6">
                <a href="https://discord.gg/pink" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400">
                  <FaDiscord size={24} />
                </a>
                <a href="https://t.me/pinkeconomic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400">
                  <FaTelegram size={24} />
                </a>
                <a href="https://twitter.com/pinkonomic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 lg:px-8 pb-20">
          <div className="lg:flex">
            {/* Left sidebar - the only navigation on desktop */}
            <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-24 pr-6">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full p-3 rounded-xl text-left transition-all ${
                        activeSection === section.id
                          ? 'bg-pink-900/30 text-pink-300 border border-pink-500/30'
                          : 'text-gray-300 hover:bg-gray-900/50 hover:text-white'
                      }`}
                    >
                      <span className="text-xl mr-3">{section.icon}</span>
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-medium text-pink-300 mb-4">Join the Community</h3>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://discord.gg/pink" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full text-pink-400"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDiscord size={20} />
                    </motion.a>
                    <motion.a 
                      href="https://t.me/pinkeconomic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full text-pink-400"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTelegram size={20} />
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com/pinkonomic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 hover:bg-gray-800 p-3 rounded-full text-pink-400"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTwitter size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area - Same as before */}
            <div className="lg:flex-1 max-w-3xl lg:max-w-none mx-auto">
              {/* Hero section */}
              <section 
                id="intro" 
                className="min-h-[50vh] flex flex-col justify-center py-16"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-12">
                    <motion.h1 
                      className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent pb-2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      The Pink Paper
                    </motion.h1>
                    <motion.div 
                      className="h-1 w-20 md:w-40 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto my-4 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    <motion.p 
                      className="text-xl text-gray-300 max-w-2xl mx-auto mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      A community-driven document outlining the vision, tokenomics, and future of $PINK.
                    </motion.p>
                  </div>
                  
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-[1px]">
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-pink-300 mb-4">Welcome to PINK</h2>
                        <p className="text-gray-300 leading-relaxed">
                          This document outlines the vision, tokenomics, and roadmap of $PINK - the meme community
                          for the Polkadot ecosystem. Before diving into the details, remember that $PINK is for 
                          entertainment purposes only, with no formal team or roadmap - just an open community of 
                          volunteers spreading PINK vibes.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
              
              {/* WTF is PINK section */}
              <section 
                id="wtf-is-pink" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        🔍
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        WTF is PINK?
                      </h2>
                    </div>
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p>
                        PINK is a meme community for the Polkadot ecosystem with the goal of gaining net new eyeballs on Polkadot,
                        and introducing the PINK gaming universe.
                      </p>
                      <p>
                        PINK captures new mindshare by reinforcing the image that Polkadot is Pink, a color of positivity and
                        laughter. Once we capture mindshare around a simple ecosystem narrative, it becomes easier to discuss
                        Polkadot's compelling tech narratives.
                      </p>
                      <p>
                        Polkadot - and crypto more generally - needs simpler, more engaging narratives. Our space also
                        needs simple tech to allow for experimentation and fun to increase adoption.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                      <motion.div 
                        className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-pink-500/20"
                        whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(236, 72, 153, 0.2)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-pink-900/40 rounded-lg text-xl mb-3">
                          👥
                        </div>
                        <h3 className="text-xl font-medium text-pink-300 mb-2">Community</h3>
                        <p className="text-gray-400">Bringing together enthusiasts from across the Polkadot ecosystem</p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-pink-500/20"
                        whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(236, 72, 153, 0.2)" }}
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
                        whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(236, 72, 153, 0.2)" }}
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
              
              {/* Pinkonomics section */}
              <section 
                id="pinkonomics" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        📊
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        $PINKonomics
                      </h2>
                    </div>
                    
                    <div className="mb-10">
                      <PinkonomicsChart />
                    </div>
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p>
                        The Pinkonomics of $PINK have been carefully thought through with the objective to fulfill the
                        primary mission of PINK, which is to bring more users to Polkadot in the most frictionless and
                        fun way possible.
                      </p>
                      <p>
                        $PINK has been minted on the Polkadot Asset Hub, a relatively unknown but powerful chain in the
                        ecosystem. The reason for this is for the PINK community to be at the heart of Polkadot and
                        proliferate out from there, touching every Parachain that will have it.
                      </p>
                      <p>
                        There are five clearly defined buckets for the token supply which will have no inflation and a
                        total supply of 2,300,001,221.
                      </p>
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
              
              {/* Airdrop Tranches */}
              <section 
                id="airdrop-tranches" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        🪂
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Airdrop Tranches
                      </h2>
                    </div>
                    
                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-[1px] rounded-xl mb-10">
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
              
              {/* Future Tranches */}
              <section 
                id="future-tranches" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-pink-900/40 rounded-xl text-2xl">
                        🔮
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Future Tranches
                      </h2>
                    </div>
                    
                    <div className="space-y-4 text-gray-300">
                      <p>
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
                  </motion.div>
                </div>
              </section>

              {/* Pools & Treasury */}
              <section 
                id="pools" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
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

              {/* The Future is PINK */}
              <section 
                id="future" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
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

              {/* $PINKdrop Won't Stop */}
              <section 
                id="pinkdrop-wont-stop" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
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

              {/* Final Thoughts */}
              <section 
                id="final-thoughts" 
                className="py-16 scroll-mt-20"
              >
                <div className="max-w-3xl mx-auto">
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
              
              {/* Footer */}
              <footer className="border-t border-gray-800 mt-20 py-12">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="flex justify-center space-x-6 mb-6">
                    <motion.a 
                      href="https://discord.gg/pink" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400"
                      whileHover={{ y: -3 }}
                    >
                      <FaDiscord size={24} />
                    </motion.a>
                    <motion.a 
                      href="https://t.me/pinkeconomic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400"
                      whileHover={{ y: -3 }}
                    >
                      <FaTelegram size={24} />
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com/pinkonomic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400"
                      whileHover={{ y: -3 }}
                    >
                      <FaTwitter size={24} />
                    </motion.a>
                  </div>
                  <p className="text-gray-500">© 2024 Pinkonomic. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
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