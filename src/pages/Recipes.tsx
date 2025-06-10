import { useState } from 'react';
import { motion } from 'framer-motion';
import RecipeCard, { type Recipe } from '../components/RecipeCard';
import { getRandomRecipes, searchRecipes, type RecipeApi } from '../services/api';
import { Button } from 'antd';
import SearchBar from '../components/SearchBar';

const Recipes = () => {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRandom, setShowRandom] = useState(false); // когда true — показываем блок случайных рецептов

  const normalizeRecipes = (apiRecipes: RecipeApi[]): Recipe[] =>
    apiRecipes.map(r => ({
      title: r.title,
      img: r.image,
      description: r.summary,
      ingredients: r.extendedIngredients.map(i => i.original),
    }));

  const fetchRandomRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiRecipes = await getRandomRecipes(3);
      const normalized = normalizeRecipes(apiRecipes);
      setRandomRecipes(prev => [...prev, ...normalized]);
    } catch (err) {
      setError('Не удалось загрузить случайные рецепты');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchRecipes = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchRecipes({ query, number: 10 });
      const normalized = normalizeRecipes(result.recipes);
      setSearchResults(normalized);
      setShowRandom(false); // скрываем случайные, если пользователь ищет
      setRandomRecipes([]); // очищаем случайные
    } catch (err) {
      setError('Ошибка при поиске рецептов');
      console.error('err', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchSearchRecipes(query);
  };

  const handleRandomClick = () => {
    if (!showRandom) {
      setSearchResults([]); // очищаем результаты поиска
      fetchRandomRecipes();
      setShowRandom(true);
    }
  };

  const recipesToDisplay = showRandom ? randomRecipes : searchResults;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && <p>Загрузка рецептов...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!showRandom && searchResults.length === 0 && (
        <Button
          type="default"
          className="mx-auto block mt-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors"
          onClick={handleRandomClick}
        >
          Мне повезёт!
        </Button>
      )}

      {recipesToDisplay.length > 0 && (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {recipesToDisplay.map((recipe, idx) => (
              <RecipeCard key={idx} recipe={recipe} />
            ))}
          </div>

          {showRandom && (
            <Button
              type="default"
              className="mx-auto block mt-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors"
              onClick={fetchRandomRecipes}
              loading={loading}
              disabled={loading}
            >
              Загрузить еще
            </Button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Recipes;
