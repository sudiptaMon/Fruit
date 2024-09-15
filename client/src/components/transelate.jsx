import React, { useState } from "react";
import Navbar from "./navbar"; // Import the Navbar component
import "../styles/transelate.css";
import axios from "axios";

const TranslateA = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en"); // Default input language is English
  const [targetLanguage, setTargetLanguage] = useState("hi"); // Default output language is Hindi
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setErrorMessage("Please enter some text to translate.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setTranslatedText("");

    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      setErrorMessage("Error translating text. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translate-container">
      <Navbar username="Sudipta Mondal" />

      <h1>Translate </h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="language-select">
        <label htmlFor="sourceLanguage">Select Input Language:</label>
        <select
          id="sourceLanguage"
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chinese</option>
          <option value="ar">Arabic</option>
          {/* Add more language options as needed */}
        </select>

        <label htmlFor="targetLanguage">Select Output Language:</label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chinese</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <button onClick={handleTranslate} disabled={loading} className="button">
        {loading ? "Translating..." : "Translate"}
      </button>

      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslateA;
