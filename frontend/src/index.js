import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Ponto de entrada da aplicação React
 * 
 * Por quê este arquivo?
 * - É o primeiro arquivo JavaScript executado
 * - Renderiza o componente App dentro do elemento HTML com id="root"
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);