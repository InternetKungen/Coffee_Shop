// Header.tsx
import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import Login from '../Login/Login';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Header</h1>
      <NavMenu />
      <Login />
    </header>
  );
};

export default Header;
