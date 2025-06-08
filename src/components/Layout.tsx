// components/Layout.tsx
import Header from './Header';
import * as React from 'react';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main className="p-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-500">
      {children}
    </main>
  </>
);

export default Layout;
