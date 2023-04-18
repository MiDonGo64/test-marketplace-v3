import React from 'react';

import Menu from '../menu/Menu';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <div className="body">
        <main className="main">{children}</main>
        <Footer />
      </div>
      <Menu />
    </div>
  );
};

export default Layout;
