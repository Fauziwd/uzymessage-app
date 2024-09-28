import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Pastikan auth diimpor dari firebase.js
import IndexAuth from './auth/IndexAuth';
import Login from './auth/Login';
import Messages from './Messages';
import Notes from './Notes';
import HomePage from './HomePage';
import ProfilePage from './menu/ProfilePage';
import Market from './menu/Market';
import Donate from './menu/Donate';
import ProductDetail from './ProductDetail';
import './App.css'; // Pastikan file CSS diimpor

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log('User state updated:', user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span className="loader-text">tunggu..</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {alert && (
        <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {alert}
        </div>
      )}
      <Routes>
        <Route path="/" element={<IndexAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/notes"
          element={user ? <Notes /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
