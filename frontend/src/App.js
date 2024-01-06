import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./Components/NavHeader";

function App() {
  return (
    <>
      <Router>
        <NavHeader />
        {/* <Hero></Hero>
        <LandingContent></LandingContent> */}
        <Routes>
          <Route path="/StoryTime/" />
          <Route path="ActiveTransport/storytime" />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}


export default App;
