import { motion } from 'framer-motion';
import ResponsiveCard from "../components/Card.tsx";

export default () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <ResponsiveCard ></ResponsiveCard>

  </motion.div>
);
