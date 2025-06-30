import { useState } from "react";
import happyCat from "../assets/happy-cat.gif";
import "./Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showCat, setShowCat] = useState(false);

  const addTask = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: input } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, done: false }]);
    }

    setInput("");
  };

  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);

    if (!tasks[index].done) {
      setShowCat(true);
      setTimeout(() => setShowCat(false), 3000);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setInput("");
    }
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const clearAll = () => {
    setTasks([]);
    setInput("");
    setEditIndex(null);
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-visible">
      
      {/* 🎉 Animated Cat */}
      {showCat && (
        <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-50 cat-popup pointer-events-none">
          <img
            src={happyCat}
            alt="Happy classical cat"
            className="w-28 md:w-32 h-auto object-contain drop-shadow-xl"
          />
        </div>
      )}

      {/* 📋 To-Do Box */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-rose-200 relative z-10">
        <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">🌸 To-Do List 🌸</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="What's on your mind?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <div className="text-sm text-rose-600 mb-2 text-center">
          {tasks.length > 0
            ? `${completedCount} / ${tasks.length} completed`
            : "No tasks yet 🌱"}
        </div>

        <ul className="space-y-3 max-h-72 overflow-auto scroll-smooth">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between px-4 py-2 border border-rose-200 rounded-lg shadow-sm ${
                task.done ? "bg-green-100/60" : "bg-white"
              }`}
            >
              <span
                onClick={() => toggleDone(index)}
                className={`cursor-pointer flex-1 ${
                  task.done ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => toggleDone(index)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md text-sm shadow"
                >
                  Done
                </button>
                <button
                  onClick={() => editTask(index)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm shadow"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-4 block mx-auto text-sm bg-pink-200 text-pink-800 px-4 py-2 rounded-lg hover:bg-pink-300 transition shadow"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
