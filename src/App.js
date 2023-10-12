import React from 'react';
import ReactDom from 'react-dom';
import "./App.css";
import Home from "./Home";
import Project from "./Project_Details";
import {Route, Routes, Router} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes basename='/'>
        <Route export path = "/gitpage" element = {<Home />} />
        <Route export path = "gitpage/projects" element = {<Project />} />
      </Routes>
    </div>
  );
}

export default App;
