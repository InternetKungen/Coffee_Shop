import './App.css';
import React from 'react';
import AddItem from './components/AddItem/AddItem';
import SignIn from './views/auth/SignIn';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import About from './views/pages/About';
import Menu from './views/pages/Menu';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <div>
                    <Header />
                    <Main />
                </div>
            </Router>
        </>
    );
};

export default App;
