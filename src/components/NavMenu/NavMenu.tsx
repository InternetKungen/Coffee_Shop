import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.module.css';

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <button onClick={toggleMenu}>Toggle Menu</button>
            {isOpen && (
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavMenu;