import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import Home from './components/pages/Home';
import Suksess from './components/pages/Suksess';

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Suksess" element={<Suksess />} />
          </Routes>
        </main>
      </Router>
    );
  }
}
