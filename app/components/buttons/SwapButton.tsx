import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExchangeAlt, FaTimes } from "react-icons/fa";

const SwapButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMediumOrLarger(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const squidConfig = {
    integratorId: import.meta.env.VITE_SQUID_INTEGRATOR_ID,
    "theme": {
      "borderRadius": {
        "button-lg-primary": "1.25rem",
        "button-lg-secondary": "1.25rem",
        "button-lg-tertiary": "1.25rem",
        "button-md-primary": "0.9375rem",
        "button-md-secondary": "0.9375rem",
        "button-md-tertiary": "0.9375rem",
        "button-sm-primary": "1.25rem",
        "button-sm-secondary": "1.25rem",
        "button-sm-tertiary": "1.25rem",
        "container": "1.25rem",
        "input": "0.9375rem",
        "menu-sm": "0.65rem",
        "menu-lg": "0.65rem",
        "modal": "1.25rem"
      },
      "fontSize": {
        "caption": "0.875rem",
        "body-small": "1.14375rem",
        "body-medium": "1.40625rem",
        "body-large": "1.75625rem",
        "heading-small": "2.1875rem",
        "heading-medium": "3.08125rem",
        "heading-large": "4.40625rem"
      },
      "fontWeight": {
        "caption": "400",
        "body-small": "400",
        "body-medium": "400",
        "body-large": "400",
        "heading-small": "400",
        "heading-medium": "400",
        "heading-large": "400"
      },
      "fontFamily": {
        "squid-main": "Geist, sans-serif"
      },
      "boxShadow": {
        "container": "0px 2px 4px 0px rgba(0, 0, 0, 0.20), 0px 5px 50px -1px rgba(0, 0, 0, 0.33)"
      },
      "color": {
        "grey-100": "#FBFBFD",
        "grey-200": "#EDEFF3",
        "grey-300": "#D1D6E0",
        "grey-400": "#A7ABBE",
        "grey-500": "#8A8FA8",
        "grey-600": "#676B7E",
        "grey-700": "#4C515D",
        "grey-800": "#292C32",
        "grey-900": "#17191C",
        "royal-300": "#D9BEF4",
        "royal-400": "#B893EC",
        "royal-500": "#f6339a",
        "royal-600": "#8353C5",
        "royal-700": "#6B45A1",
        "status-positive": "#7AE870",
        "status-negative": "#FF4D5B",
        "status-partial": "#F3AF25",
        "highlight-700": "#E4FE53",
        "animation-bg": "#f6339a",
        "animation-text": "#FBFBFD",
        "button-lg-primary-bg": "#f6339a",
        "button-lg-primary-text": "#FBFBFD",
        "button-lg-secondary-bg": "#FBFBFD",
        "button-lg-secondary-text": "#292C32",
        "button-lg-tertiary-bg": "#292C32",
        "button-lg-tertiary-text": "#D1D6E0",
        "button-md-primary-bg": "#f6339a",
        "button-md-primary-text": "#FBFBFD",
        "button-md-secondary-bg": "#FBFBFD",
        "button-md-secondary-text": "#292C32",
        "button-md-tertiary-bg": "#292C32",
        "button-md-tertiary-text": "#D1D6E0",
        "button-sm-primary-bg": "#9E79D2",
        "button-sm-primary-text": "#FBFBFD",
        "button-sm-secondary-bg": "#FBFBFD",
        "button-sm-secondary-text": "#292C32",
        "button-sm-tertiary-bg": "#292C32",
        "button-sm-tertiary-text": "#D1D6E0",
        "input-bg": "#17191C",
        "input-placeholder": "#676B7E",
        "input-text": "#D1D6E0",
        "input-selection": "#D1D6E0",
        "menu-bg": "#17191CA8",
        "menu-text": "#FBFBFDA8",
        "menu-backdrop": "#FBFBFD1A",
        "modal-backdrop": "#17191C54"
      }
    },
    "themeType": "dark",
    "apiUrl": "https://v2.api.squidrouter.com",
    "priceImpactWarnings": {
      "warning": 3,
      "critical": 5
    },
    "initialAssets": {
      "from": {
        "chainId": "8453",
        "address": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
      },
      "to": {
        "chainId": "1284",
        "address": "0xffffffff30478fafbe935e466da114e14fb3563d"
      }
    },
    "loadPreviousStateFromLocalStorage": true
  };


  const iframeSrc = `https://studio.squidrouter.com/iframe?config=${encodeURIComponent(JSON.stringify(squidConfig))}`;

  if (!isMediumOrLarger) return null;

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 group overflow-hidden flex items-center justify-center px-5 py-2.5 
                  bg-black/70 backdrop-blur-md border border-pink-500/30 text-white font-medium 
                  rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close swap widget" : "Open swap widget"}
        title={isOpen ? "Close swap widget" : "Open swap widget"}
      >

        <div className="absolute inset-0 bg-pink-500/80 opacity-80" />


        <div className="relative flex items-center justify-center z-10">
          {isOpen ? (
            <FaTimes className="text-lg" />
          ) : (
            <>
              <FaExchangeAlt className="mr-2 text-sm" />
              <span className="font-medium">SWAP</span>
            </>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 w-[430px] h-[684px] bg-black/80 backdrop-blur-xl 
                      border border-pink-500/30 shadow-2xl rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
          >

            <div className="absolute inset-0 border border-pink-500/30 rounded-2xl z-0" />

            {isLoading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80 backdrop-blur-md z-10">
                <motion.div
                  className="w-12 h-12 border-4 border-t-pink-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-gray-300">Loading swap widget...</p>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/90 z-10 p-6">
                <span className="text-pink-500 text-4xl mb-4">!</span>
                <h3 className="text-xl mb-2">Connection Error</h3>
                <p className="text-center text-gray-400 mb-4">{error}</p>
                <button
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
            <div className="relative w-full h-full z-[1]">
              <iframe
                title="squid_widget"
                width="100%"
                height="100%"
                src={iframeSrc}
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SwapButton;