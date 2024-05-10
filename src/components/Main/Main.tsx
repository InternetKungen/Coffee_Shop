// Main.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';


const Main: React.FC = () => {
  return (
    <main>
      <Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
    </main>
  );
};

export default Main;