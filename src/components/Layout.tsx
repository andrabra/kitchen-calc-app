// components/Layout.tsx
import Header from './Header';
import * as React from 'react';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main className='pt-2'>{children}</main>
  </>
);

export default Layout;
