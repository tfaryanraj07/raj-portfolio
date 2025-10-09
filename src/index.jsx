import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css'; // Import the new global CSS file

// Find the root element and create the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);