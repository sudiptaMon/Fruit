import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonCard = ({ title, color, textColor = "blue", icon = null, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      return onClick(); 
    }
    
    // Navigation based on the title
    switch (title.toLowerCase()) {
      case 'chat':
        navigate('/chat');
        break;
      case 'translate':
        navigate('/translate');
        break;
      case 'faqs':
        navigate('/faqs');
        break;
      
      default:
        navigate('/');
    }
  };

  return (
    <div 
      className="button-card" 
      style={{ backgroundColor: color }} 
      onClick={handleClick}
    >
      {icon ? (
        <i className={`fa ${icon} icon`} style={{ color: textColor }}></i>
      ) : (
        <h2 style={{ color: textColor }}>{title}</h2>
      )}
    </div>
  );
};

export default ButtonCard;
