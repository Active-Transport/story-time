import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./Components/NavHeader";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <NavHeader />
        <Routes>
          <Route path="/StoryTime/" element={<Home />} />
          <Route path="ActiveTransport/storytime" />
        </Routes>
      </Router>
    </>
  );
}


export default App;
