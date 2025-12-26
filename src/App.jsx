// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

// ===================================
// 1. Components (Header & Footer)
// ===================================
import Header from './components/Header'; 
import Footer from './components/Footer'; 

// ===================================
// 2. Pages (Application Routes)
// ===================================
// Note: Assuming these files exist in './pages/' directory
import Home from './pages/Home'; 
import Frauds from './pages/Frauds'; 
import SafetyTips from './pages/SafetyTips'; 
import About from './pages/About'; 
import Contact from './pages/Contact';
import Resources from './pages/Resources'; 

/**
 * Main application layout component.
 * Sets up the fixed Header and Footer, and the dynamic content area (main) 
 * for routing based on URL. The 'App' class uses CSS to ensure a full-height, 
 * column-based layout, which is essential for mobile-first design (Header-Main-Footer stack).
 */
function App() {
  return (
    // .App CSS class ensures flex column layout and min-height: 100vh
    <div className="App">
      
      <Header />
      
      {/* The 'container' CSS class ensures the content is centered and 
        has proper side padding, especially crucial for mobile view.
      */}
      <main className="container"> 
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Home />} /> 

          {/* Core Navigation Routes */}
          <Route path="/frauds" element={<Frauds />} /> 
          <Route path="/safety" element={<SafetyTips />} /> 
          
          {/* Information Routes */}
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />

          {/* Optional: Add a 404/Not Found route here if needed */}
          {/* <Route path="*" element={<div>404 Page Not Found</div>} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;