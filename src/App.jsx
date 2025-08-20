import { useState } from 'react'
import './App.css'
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Experience from "./pages/experience.jsx";
import Posts from "./pages/posts.jsx";
import Home from "./pages/home.jsx";



function App() {

  return (
    <>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/posts/*" element={<Posts />} />
          </Routes>
        </Router>

    </>
  )
}

export default App
