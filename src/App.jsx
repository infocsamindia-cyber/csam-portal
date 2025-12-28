import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Firebase import zaruri hai
import { onAuthStateChanged } from "firebase/auth";
import './App.css'; 

import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Home from './pages/Home'; 
import Auth from './pages/Auth'; 
import Frauds from './pages/Frauds';
import SafetyTips from './pages/SafetyTips';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yeh effect check karega ki user pehle se logged in hai ya nahi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Check poora hone par loading band
    });
    return () => unsubscribe();
  }, []);

  // Jab tak check ho raha hai tab tak ek loading screen dikhayenge
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020617', color: '#fff' }}>
        <h3>Verifying Security Credentials...</h3>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header tabhi dikhega jab user session active hoga */}
      {user && <Header />}
      
      <main className="container"> 
        <Routes>
          {/* Agar user login hai aur /auth par jane ki koshish kare toh Home par bhej do */}
          <Route path="/auth" element={!user ? <Auth onLogin={() => setUser(auth.currentUser)} /> : <Navigate to="/" />} />

          {/* Protected Routes: Sirf login users ke liye */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} /> 
          <Route path="/frauds" element={user ? <Frauds /> : <Navigate to="/auth" />} /> 
          <Route path="/safety" element={user ? <SafetyTips /> : <Navigate to="/auth" />} /> 
          <Route path="/resources" element={user ? <Resources /> : <Navigate to="/auth" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/auth" />} />
          <Route path="/about" element={user ? <About /> : <Navigate to="/auth" />} />

          {/* Galat URL handle karne ke liye */}
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
        </Routes>
      </main>

      {user && <Footer />}
    </div>
  );
}

export default App;