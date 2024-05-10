// Header.tsx
import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import Login from '../Login/Login';
import './Header.module.css';

const Header: React.FC = () => {
  return (
    <header>
      <NavMenu />
      <h1>Header</h1>
      <Login />
    </header>
  );
};

export default Header;
