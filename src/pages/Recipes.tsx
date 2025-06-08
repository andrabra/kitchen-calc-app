// pages/Home.tsx
import { motion } from 'framer-motion';

export default () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <div className="text-center">Coming soon...</div>
  </motion.div>
);
