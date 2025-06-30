import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Counter from "./pages/Counter";
import Clock from "./pages/Clock";
import Weather from "./pages/Weather";
import Quote from "./pages/Quote";
import Calculator from "./pages/Calculator";
import ColorPicker from "./pages/ColorPicker";
import FormValidation from "./pages/FormValidation";
import ImageGallery from "./pages/ImageGallery";
import ThemeToggle from "./pages/ThemeToggle";
import Stopwatch from "./pages/Stopwatch";
import Accordion from "./pages/Accordion";
import BMI from "./pages/BMI";
import Currency from "./pages/Currency";
import SearchFilter from "./pages/SearchFilter";
import Quiz from "./pages/Quiz";
import Cards from "./pages/Cards";
import Emoji from "./pages/Emoji";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/colorpicker" element={<ColorPicker />} />
        <Route path="/formvalidation" element={<FormValidation />} />
        <Route path="/imagegallery" element={<ImageGallery />} />
        <Route path="/themetoggle" element={<ThemeToggle />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/searchfilter" element={<SearchFilter />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/emoji" element={<Emoji />} />
      </Routes>
    </Router>
  );
}

export default App;
