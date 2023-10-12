import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/index.scss';
import App from './App'

function Index() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

createRoot(document.getElementById('app')).render(Index())

