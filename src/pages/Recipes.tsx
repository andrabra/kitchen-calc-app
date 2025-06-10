import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RecipeCard, { type Recipe } from '../components/RecipeCard';
import { getRandomRecipes, type RecipeApi } from '../services/api';
import { Button } from 'antd';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiRecipes: RecipeApi[] = await getRandomRecipes(3);

      const normalizedRecipes: Recipe[] = apiRecipes.map(r => ({
        title: r.title,
        img: r.image,
        description: r.summary,
        ingredients: r.extendedIngredients.map(i => i.original),
      }));

      // Добавляем новые рецепты к уже загруженным
      setRecipes(prev => [...prev, ...normalizedRecipes]);
    } catch (err) {
      setError('Не удалось загрузить рецепты');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      {loading && <p>Загрузка рецептов...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {recipes.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe, idx) => (
            <RecipeCard key={idx} recipe={recipe} />
          ))}
        </div>
      )}
      <Button
        className="w-full mx-auto mt-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-500 transition-colors"
        onClick={fetchRecipes}
        loading={loading}
        disabled={loading}
      >
        Загрузить еще
      </Button>
    </motion.div>
  );
};

export default Home;
