// components/Layout.tsx
import Header from './Header';
import * as React from 'react';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;
