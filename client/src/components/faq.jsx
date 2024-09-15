import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/faq.css";
import Navbar from "./navbar";

function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null); 
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/faqs");
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const addFaq = async () => {
    if (!question || !answer || !author || !category) {
      setError("All fields are required!");
      return;
    }

    const newFaq = { question, answer, author, category };

    try {
      await axios.post("http://127.0.0.1:5000/faqs", newFaq);
      alert("Successfully added");
      clearForm();
      await fetchFaqs();
    } catch (err) {
      console.error("Error adding FAQ:", err);
      setError("Error adding FAQ. Please try again.");
    }
  };

  const editFaq = (id) => {
    const faq = faqs.find((faq) => faq._id === id);
    setEditingFaqId(id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setEditAuthor(faq.author);
    setEditCategory(faq.category);
    setIsFormVisible(true);
    setError(""); // Clear any previous error
  };

  const updateFaq = async () => {
    if (!editQuestion || !editAnswer || !editAuthor || !editCategory) {
      setError("All fields are required!");
      return;
    }

    const updatedFaq = { question: editQuestion, answer: editAnswer, author: editAuthor, category: editCategory };

    try {
      await axios.put(`http://127.0.0.1:5000/faqs/${editingFaqId}`, updatedFaq);
      alert("Successfully updated");
      clearForm();
      await fetchFaqs();
    } catch (err) {
      console.error("Error updating FAQ:", err);
      setError("Error updating FAQ. Please try again.");
    }
  };

  const deleteFaq = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/faqs/${id}`);
      alert("FAQ deleted");
      await fetchFaqs();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      setError("Error deleting FAQ. Please try again.");
    }
  };

  const clearForm = () => {
    setQuestion("");
    setAnswer("");
    setAuthor("");
    setCategory("");
    setEditQuestion("");
    setEditAnswer("");
    setEditAuthor("");
    setEditCategory("");
    setIsFormVisible(false);
    setEditingFaqId(null);
    setError(""); // Clear errors when form is cleared
  };

  return (
    <div className="faqcontainer">
        <Navbar/>
      <div className="faq-card">
        <h1 className="faq-header">FAQ Section</h1>
        {!isFormVisible && (
          <div className="text-center mb-4">
            <button
              onClick={() => setIsFormVisible(true)}
              className="button"
            >
              Add FAQ
            </button>
          </div>
        )}

        {isFormVisible && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter question"
              value={editingFaqId ? editQuestion : question}
              onChange={(e) => editingFaqId ? setEditQuestion(e.target.value) : setQuestion(e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Enter answer"
              value={editingFaqId ? editAnswer : answer}
              onChange={(e) => editingFaqId ? setEditAnswer(e.target.value) : setAnswer(e.target.value)}
              className="textarea-field"
            ></textarea>
            <input
              type="text"
              placeholder="Enter author"
              value={editingFaqId ? editAuthor : author}
              onChange={(e) => editingFaqId ? setEditAuthor(e.target.value) : setAuthor(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter category"
              value={editingFaqId ? editCategory : category}
              onChange={(e) => editingFaqId ? setEditCategory(e.target.value) : setCategory(e.target.value)}
              className="input-field"
            />

            {error && <p className="error-message">{error}</p>}

            <div className="text-center mt-4">
              <button
                onClick={editingFaqId ? updateFaq : addFaq}
                className="button"
              >
                {editingFaqId ? "Update FAQ" : "Add FAQ"}
              </button>
              <button
                onClick={clearForm}
                className="button button-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="faq-item"
            >
              <h2 className="faq-title">
                {faq.question}
              </h2>
              <p className="faq-answer">{faq.answer}</p>
              <p className="faq-author">Author: {faq.author}</p>
              <p className="faq-category">Category: {faq.category}</p>
              <div className="faq-actions">
                <button
                  onClick={() => editFaq(faq._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaq(faq._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
