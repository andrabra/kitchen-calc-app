import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import BurgerMenu from './BurgerMenu';

const getPageTitle = (pathname: string) => {
  if (pathname.startsWith('/recipes')) return 'Рецепты';
  return 'Главная';
};

const Header = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 border-b bg-white dark:bg-zinc-600 dark:border-zinc-500 transition-colors">
      <div className="flex justify-between items-center gap-4 w-full">
        <h1 className="text-base font-medium text-black dark:text-white">{title}</h1>
        <BurgerMenu theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
