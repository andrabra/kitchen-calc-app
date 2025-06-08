import { motion } from 'framer-motion';
import IngredientsList from "../components/IngredientsList.tsx";

export default () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <IngredientsList />

  </motion.div>
);
