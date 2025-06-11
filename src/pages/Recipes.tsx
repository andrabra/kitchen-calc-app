import { useState } from 'react';
import { motion } from 'framer-motion';
import RecipeCard, { type Recipe } from '../components/RecipeCard';
import { getRandomRecipes, searchRecipes, type RecipeApi } from '../services/api';
import { Button } from 'antd';
import SearchBar from '../components/SearchBar';
import { ClearOutlined } from '@ant-design/icons';

const Recipes = () => {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRandom, setShowRandom] = useState(false); // когда true — показываем блок случайных рецептов
  const [lastQuery, setLastQuery] = useState('');
  const [searchOffset, setSearchOffset] = useState(0);

  const normalizeRecipes = (apiRecipes: RecipeApi[]): Recipe[] =>
    apiRecipes.map(r => ({
      title: r.title,
      img: r.image,
      description: r.summary,
      ingredients: Array.from(
        new Set(
          r.analyzedInstructions?.[0]?.steps?.flatMap(step =>
            step.ingredients?.map(ing => ing.name),
          ) || [],
        ),
      ),
      steps: r.analyzedInstructions?.[0]?.steps?.length
        ? r.analyzedInstructions[0].steps.map(step => step.step)
        : [],
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

  const fetchSearchRecipes = async (query: string, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchRecipes({
        query,
        number: 4,
        offset: append ? searchOffset : 0,
      });

      const normalized = normalizeRecipes(result.results);

      setSearchResults(prev => (append ? [...normalized, ...prev] : normalized));
      setShowRandom(false);
      setRandomRecipes([]);
      setLastQuery(query);

      // обновляем offset
      setSearchOffset(prev => (append ? prev + 4 : 4));
    } catch (err) {
      setError('Ошибка при поиске рецептов');
      console.error('err', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const isRepeat = query === lastQuery;
    fetchSearchRecipes(query, isRepeat);
  };

  const handleRandomClick = () => {
    if (!showRandom) {
      setSearchResults([]); // очищаем результаты поиска
      fetchRandomRecipes();
      setShowRandom(true);
    }
  };

  const recipesToDisplay = showRandom ? randomRecipes : searchResults;

  const handleClearSearch = () => {
    setSearchResults([]);
    setLastQuery('');
    setSearchOffset(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <SearchBar onSearch={handleSearch} loading={loading} />
      {!showRandom && searchResults.length > 0 && (
        <div className="flex  sm:flex-row justify-center items-center gap-2 mt-4">
          <Button
            type="default"
            className="w-full sm:w-auto mx-auto text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors"
            onClick={() => fetchSearchRecipes(lastQuery, true)}
            loading={loading}
            disabled={loading}
          >
            Загрузить ещё
          </Button>
          <Button
            type="default"
            className="w-full sm:w-auto mx-auto text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors"
            onClick={handleClearSearch}
            disabled={loading}
            icon={<ClearOutlined />}
          >
            Очистить поиск
          </Button>
        </div>
      )}

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
