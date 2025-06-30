import { useState } from "react";

export default function Accordion() {
  const defaultFaqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces developed by Facebook.",
    },
    {
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript used with React to describe UI elements.",
    },
    {
      question: "What is useState?",
      answer: "`useState` is a React Hook that allows you to add state to functional components.",
    },
  ];

  const [faqs, setFaqs] = useState([...defaultFaqs]);
  const [openIndex, setOpenIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleDelete = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    if (openIndex === index) setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">🌸 Frequently Asked Questions 🌸</h2>

      <div className="bg-white/90 backdrop-blur-md border border-rose-200 rounded-xl shadow-2xl w-full max-w-2xl p-6 space-y-6">
        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-pink-100 hover:bg-pink-200 px-4 py-3 transition">
                <button
                  className="text-left w-full font-medium text-pink-800 flex justify-between items-center"
                  onClick={() => toggle(index)}
                >
                  {item.question}
                  <span className="text-xl font-bold">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {/* Show delete only for custom FAQs (after default ones) */}
                {index >= defaultFaqs.length && (
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 p-4 bg-white text-gray-700" : "max-h-0 overflow-hidden"
                }`}
              >
                {openIndex === index && <p>{item.answer}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Add FAQ Section */}
        <div className="mt-6 pt-4 border-t border-rose-200">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Add Your Own FAQ</h3>
          <input
            type="text"
            placeholder="Your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded-md border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <textarea
            placeholder="Answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows="3"
          ></textarea>
          <button
            onClick={handleAddFAQ}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
