import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense,  } from 'react';
import Home from './pages/Home';
import Loader from './components/Loader';
import * as React from 'react';
import Layout from './components/Layout.tsx';

// Ленивая загрузка компонентов
const Recipes = lazy(() => import('./pages/Recipes'));

// Кастомный ErrorBoundary с использованием Ant Design
const AppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  // const [hasError, setHasError] = useState(false);

  // const handleOnError = (error: Error, info: { componentStack: string }) => {
  //   console.error('Error caught by ErrorBoundary:', error, info);
  //   setHasError(true);
  // };

  // if (hasError) {
  //   return (
  //     <Alert
  //       message="Произошла ошибка"
  //       description="Попробуйте перезагрузить страницу или вернуться позже"
  //       type="error"
  //       showIcon
  //       style={{ margin: 24 }}
  //     />
  //   );
  // }

  return children;
};

const App = () => {

  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Layout>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </Layout>
        </Suspense>
      </AppErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
