import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  loading?: boolean;
};

const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl mx-auto mt-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onPressEnter={handleSubmit}
        placeholder="Введите название ингридиента или рецепта на английском"
        className="flex-grow"
      />
      <Button
        className='w-full sm:w-auto mx-auto text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-900 transition-colors'
        type="default"
        icon={<SearchOutlined />}
        onClick={handleSubmit}
        loading={loading}
      >
        Найти
      </Button>
    </div>
  );
};

export default SearchBar;
