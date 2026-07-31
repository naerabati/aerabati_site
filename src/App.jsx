import { useState } from 'react'
import './App.css'
import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/posts.jsx";
import Home from "./pages/home.jsx";



function App() {

  return (
    <>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts/*" element={<Posts />} />
          </Routes>
        </Router>

    </>
  )
}

export default App


