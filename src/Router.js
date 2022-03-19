import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={ <HomePage /> } />
        </Routes>
    )
}

export default Router;