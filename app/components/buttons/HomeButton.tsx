import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";

interface HomeButtonProps {
  "aria-label"?: string;
  title?: string;
}

const HomeButton = (props: HomeButtonProps) => (
  <motion.div
    className="fixed top-6 left-6 z-50"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <Link
      to="/"
      aria-label={props["aria-label"] || "Return to homepage"}
      title={props.title || "Return to homepage"}
      className="group flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-pink-500/30 
                 rounded-full text-white hover:bg-black/60 hover:border-pink-500/50 transition-all duration-300"
    >
      <motion.div
        className="text-pink-400 group-hover:text-pink-300"
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronLeft size={14} />
      </motion.div>

      <motion.span
        className="text-sm font-medium opacity-80 group-hover:opacity-100"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        Home
      </motion.span>
    </Link>
  </motion.div>
);

export default HomeButton;
