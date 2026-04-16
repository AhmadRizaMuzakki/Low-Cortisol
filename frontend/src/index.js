import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './route/AppRoute'; // 👈 Tambahkan import ini

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 👇 Ubah App menjadi AppRouter */}
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
