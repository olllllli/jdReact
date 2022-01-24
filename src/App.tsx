import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'routes/LandingPage';
import AdvPage from 'routes/AdvPage';
import PlayersPage from 'routes/PlayersPage';
import StatsPage from 'routes/StatsPage';
import ErrorPage from 'routes/ErrorPage';

console.log("App Loading");

function App() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<LandingPage />} />

            <Route path="/advancements" element={<AdvPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/stats" element={<StatsPage />} />
        </Routes>
    );
}

export default App;
