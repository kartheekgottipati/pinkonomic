import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

const HomeButton = () => (
  <motion.div
    className="fixed top-6 left-6 z-50 flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-pink-400/30 transition-all"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to="/" aria-label="Go to homepage" title="Go to homepage">
      <FaHome className="text-2xl" />
    </Link>
  </motion.div>
);

export default HomeButton;
