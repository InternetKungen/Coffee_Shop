// Header.tsx
import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import Login from '../Login/Login';
import './Header.module.css';

const Header: React.FC = () => {
  return (
    <header>
      <NavMenu />
      <h2>Header</h2>
      <Login />
    </header>
  );
};

export default Header;
