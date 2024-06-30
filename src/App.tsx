import './App.css';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

// ErrorBoundary component, comment out during development
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// import ErrorThrowingComponent from './components/ErrorThrowingComponent/ErrorThrowingComponent';

const App: React.FC = () => {
    return (
        <>
            {/* ErrorBoundary component, comment out during development */}
            {/* <ErrorBoundary> */}
            <Router>
                <div>
                    <Header />
                    <Main />

                    {/* Render the error-throwing component */}
                    {/* <ErrorThrowingComponent />{' '} */}

                    <Footer />
                </div>
            </Router>
            {/* </ErrorBoundary> */}
        </>
    );
};

export default App;
