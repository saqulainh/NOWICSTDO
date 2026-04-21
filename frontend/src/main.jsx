import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentProvider } from './context/ContentContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
