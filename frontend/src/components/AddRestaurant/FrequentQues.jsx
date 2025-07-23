import React, { useState } from "react";
import "./FrequentQues.css";

const FrequentQues = () => {
  // Array of questions and answers
  const questions = [
    {
      question: "What are the documents and details required to start deliveries through Bitescape?",
      answer: "You will need a PAN card, FSSAI license, bank account details, GST number (if applicable), and a profile food image.",
    },
    {
      question: "How long will it take for a restaurant to go live on Bitescape after submitting the documents?",
      answer: "It usually takes 24-48 hours for your restaurant to go live after successfully submitting all required documents.",
    },
    {
      question: "What is the one-time onboarding fee? Do I have to pay it at the time of registration?",
      answer: "The one-time onboarding fee is ₹2000. You can pay this fee after your registration process is completed.",
    },
    {
      question: "How can I get help and support from Bitescape if I get stuck?",
      answer: "You can contact our support team through the Bitescape app or email us at support@bitescape.com for assistance.",
    },
    {
      question: "How much commission will I be charged by Bitescape?",
      answer: "The commission depends on your restaurant category and agreement. Typically, it's between 15%-20%.",
    },
    {
      question: "How will I get my payouts?",
      answer: "Payouts are transferred weekly to your registered bank account. You can also track payouts in the Bitescape app.",
    },
  ];

  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function for dropdown
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open it
  };

  return (
    <section className="frequent-ques-section">
      <h2>Frequently Asked Questions</h2>
      <div className="questions-container">
        {questions.map((item, index) => (
          <div className="question-item" key={index}>
            {/* Question Title */}
            <div className="question-title" onClick={() => toggleDropdown(index)}>
              {item.question}
              <span className={`dropdown-arrow ${openIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </div>
            {/* Answer (Visible if dropdown is open) */}
            {openIndex === index && <div className="question-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrequentQues;
