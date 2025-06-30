import { useState } from "react";

export default function QuizApp() {
  const [defaultQuizzes] = useState([
    {
      type: "radio",
      question: "Which company developed React?",
      options: [
        { text: "Google", score: 0 },
        { text: "Facebook", score: 1 },
        { text: "Microsoft", score: 0 },
        { text: "Twitter", score: 0 },
      ],
    },
    {
      type: "checkbox",
      question: "Select frontend technologies:",
      options: [
        { text: "React", score: 1 },
        { text: "Node.js", score: 0 },
        { text: "Vue.js", score: 1 },
        { text: "Django", score: 0 },
      ],
    },
    {
      type: "truefalse",
      question: "HTML stands for HyperText Markup Language.",
      options: [
        { text: "True", score: 1 },
        { text: "False", score: 0 },
      ],
    },
  ]);

  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [useCustom, setUseCustom] = useState(false);

  const quizList = useCustom ? customQuizzes : defaultQuizzes;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState([]);
  const [finished, setFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const current = quizList[index];

  const handleSelect = (optionText) => {
    if (current.type === "checkbox") {
      setSelected((prev) =>
        prev.includes(optionText)
          ? prev.filter((t) => t !== optionText)
          : [...prev, optionText]
      );
    } else {
      setSelected([optionText]);
    }
  };

  const handleNext = () => {
    let earned = 0;
    current.options.forEach((opt) => {
      if (selected.includes(opt.text)) {
        earned += opt.score;
      }
    });
    setScore((prev) => prev + earned);

    if (index + 1 < quizList.length) {
      setIndex(index + 1);
      setSelected([]);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelected([]);
    setFinished(false);
    setQuizStarted(false);
  };

  const [newQ, setNewQ] = useState("");
  const [newOptions, setNewOptions] = useState([{ text: "", score: 0 }]);
  const [newType, setNewType] = useState("radio");

  const addCustomQuiz = () => {
    const cleaned = newOptions.filter((o) => o.text.trim() !== "");
    if (newQ.trim() && cleaned.length) {
      setCustomQuizzes((prev) => [
        ...prev,
        { type: newType, question: newQ, options: cleaned },
      ]);
      setNewQ("");
      setNewOptions([{ text: "", score: 0 }]);
    }
  };

  const startQuiz = (type) => {
    if (type === "custom" && customQuizzes.length === 0) return;
    setUseCustom(type === "custom");
    reset();
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-indigo-700 mb-8">🧠 Quiz Creator & Player</h2>

      {/* Start Buttons */}
      {!quizStarted && (
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => startQuiz("default")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Start Default Quiz
          </button>
          <button
            onClick={() => startQuiz("custom")}
            className={`px-6 py-3 rounded-lg transition ${
              customQuizzes.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            disabled={customQuizzes.length === 0}
          >
            Start Your Own Quiz
          </button>
        </div>
      )}

      {/* Quiz Panel */}
      {quizStarted && (
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl mb-10 animate-fade-in">
          {quizList.length === 0 ? (
            <p className="text-center text-red-500 font-semibold">No quizzes available.</p>
          ) : finished ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎉 Quiz Completed</h3>
              <p className="text-lg text-indigo-600 font-bold mb-4">Your Score: {score}</p>
              <button
                onClick={reset}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              >
                Restart
              </button>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-2">
                Question {index + 1} of {quizList.length}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{current.question}</h3>

              <div className="space-y-3">
                {current.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded border transition ${
                      selected.includes(opt.text)
                        ? "bg-indigo-100 border-indigo-400"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type={current.type === "checkbox" ? "checkbox" : "radio"}
                      name="quiz"
                      value={opt.text}
                      checked={selected.includes(opt.text)}
                      onChange={() => handleSelect(opt.text)}
                    />
                    {opt.text}
                  </label>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selected.length === 0}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {index + 1 === quizList.length ? "Finish" : "Next"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Create Quiz */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">➕ Create a Custom Quiz</h3>

        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        >
          <option value="radio">Single Choice</option>
          <option value="checkbox">Multiple Answers</option>
          <option value="truefalse">True/False</option>
        </select>

        <input
          type="text"
          placeholder="Enter your question"
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
        />

        {newOptions.map((opt, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Option"
              value={opt.text}
              onChange={(e) => {
                const copy = [...newOptions];
                copy[i].text = e.target.value;
                setNewOptions(copy);
              }}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              value={opt.score}
              onChange={(e) => {
                const copy = [...newOptions];
                copy[i].score = Number(e.target.value);
                setNewOptions(copy);
              }}
              className="w-20 p-2 border rounded"
              placeholder="Score"
            />
          </div>
        ))}

        <button
          onClick={() => setNewOptions([...newOptions, { text: "", score: 0 }])}
          className="mb-3 text-indigo-600 hover:underline"
        >
          + Add Option
        </button>

        <br />

        <button
          onClick={addCustomQuiz}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Quiz
        </button>
      </div>
    </div>
  );
}
