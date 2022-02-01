import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import IndexPage from './pages';
import { Route, Router, Routes } from 'react-router-dom';
import FavouritesPage from './pages/favourites';
import SeeMorePage from './pages/seeMore';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/seemore/:imageId" element={<SeeMorePage />} />
      </Routes>
    </div>
  );
}

export default App;
