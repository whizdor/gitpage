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
          <Route export path = "/" element = {<Home />} />
          <Route export path = "/project_details" element = {<Project />} />
        </Routes>
    </div>
  );
}

export default App;
