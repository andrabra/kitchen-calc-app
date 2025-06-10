import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RecipeCard, { type Recipe } from '../components/RecipeCard';
import { getRandomRecipes, type RecipeApi } from '../services/api';
import { Button } from 'antd';
import SearchBar from '../components/SearchBar';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);

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

      setRecipes(prev => [...prev, ...normalizedRecipes]);
    } catch (err) {
      setError('Не удалось загрузить рецепты');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Загружаем заранее
  }, []);

  const handleSearch = (query: string) => {
    console.log('Поиск по запросу:', query);
    // Здесь можно добавить логику поиска
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <SearchBar onSearch={handleSearch} />
      {/* Todo: Поменять на лоадер */}
      {loading && <p>Загрузка рецептов...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!showRecipes && recipes.length > 0 && !loading && (
        <Button
          type="default"
          className="center mx-auto text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors mt-4"
          onClick={() => setShowRecipes(true)}
        >
          Мне повезет!
        </Button>
      )}

      {showRecipes && (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={idx} recipe={recipe} />
            ))}
          </div>
          <Button
            type="default"
            className="mx-auto mt-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors"
            onClick={fetchRecipes}
            loading={loading}
            disabled={loading}
          >
            Загрузить еще
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default Recipes;
