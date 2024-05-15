import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <div>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </Router>
        </>
    );
};

export default App;
