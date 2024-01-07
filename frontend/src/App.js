import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./Components/NavHeader";
import Home from "./Components/Home";
import Characters from "./Components/Characters";

function App() {
  return (
    <>
      <Router>
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="StoryTime/" element={<Characters />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
