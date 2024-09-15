import { useState } from "react";
import "../styles/homepage.css";
import ButtonCard from "./bottoncards";
import Navbar from "./navbar";
const HomePage = () => {
  const [showAbout, setShowAbout] = useState(false);

  // Toggle the about paragraph
  const toggleAbout = () => {
    setShowAbout((prev) => !prev);
  };

  return (
    <div className="container">
      <Navbar username={"Sudipta Mondal"} />
      <div className="header">
        <h1>Fruit.AI</h1>
        <p>"Be Healthy!"</p>
      </div>
      <div className="grid">
        <ButtonCard title="Chat" color="lightyellow" textColor="deeppink" />
        <ButtonCard title="Translate" color="lightgreen" textColor="white" />
        <ButtonCard title="FAQs" color="lightpurple" />
        <ButtonCard
          title="About"
          color="lightpink"
          textColor="deeppink"
          onClick={toggleAbout}
        />
      </div>

      {/* About Section */}
      <div className={`about-section ${showAbout ? 'show' : ''}`}>
        <div className="about-content">
          <h2>Fruit.AI</h2>
          <p>
            Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, 
            our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, 
            making it easier for you to integrate the best fruits into your daily routine.
          </p>
          <button className="close-btn" onClick={toggleAbout}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
