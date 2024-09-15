// src/components/NotFound.js
import React from 'react';
import '../styles/notfound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Page Not Found</p>
      <p className="notfound-description">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
