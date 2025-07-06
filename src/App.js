import React, { useState, useEffect } from 'react';
// Pastikan Navigate diimpor dari react-router-dom
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Pastikan auth diimpor dari firebase.js

// --- Import Halaman dan Komponen ---
import IndexAuth from './auth/IndexAuth';
// import Login from './auth/Login';
import Messages from './Messages';
import Notes from './Notes';
import HomePage from './HomePage';
import ProfilePage from './menu/ProfilePage';
import Market from './menu/Market';
import Donate from './menu/Donate';
import ProductDetail from './ProductDetail';
import Add from './menu/Add';
import ServicePage from './components/ServicePage';

// --- Import Halaman Layanan ---
import BannerPage from './pages/BannerPage';
import TypingPage from './pages/TypingPage';
import PowerPointPage from './pages/PowerPointPage';
import PortfolioPage from './pages/PortfolioPage';
import SocialMediaPage from './pages/SocialMediaPage';
import ThumbnailPage from './pages/ThumbnailPage';
import WebsitePage from './pages/WebsitePage';
import PhotoEditingPage from './pages/PhotoEditingPage';
import VideoEditingPage from './pages/VideoEditingPage';

// --- Import Animasi dan CSS ---
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'; // Pastikan CSS utama diimpor

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Durasi loader
    // NONAKTIFKAN SEMENTARA: Cek status login pengguna
    // const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => {
      clearTimeout(timer);
      // unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="calm-loader">
        <div className="loader-content">
          <div className="loader-logo">Komplet<span className="accent">In</span></div>
          <div className="dots-container">
            <motion.div className="dot" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="dot" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
            <motion.div className="dot" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          </div>
        </div>
      </div>
    );
  }

  // --- Aplikasi Utama ---
  return (
    <Router>
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="calm-alert"
          >
            {alert}
          </motion.div>
        )}
      </AnimatePresence>

        <main className="relative z-10">
            <Routes>
              {/* --- TAMBAHKAN BARIS INI --- */}
              {/* Rute ini akan mengalihkan dari path "/" ke "/home" */}
              <Route path="/" element={<Navigate to="/home" />} />

              {/* Rute Autentikasi dan Utama */}
              {/* <Route path="/" element={<IndexAuth />} /> */}
              {/* <Route path="/login" element={<Login setAlert={setAlert} />} /> */}
              <Route path="/home" element={<HomePage />} />

              {/* Rute Menu */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/market" element={<Market />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/addyours" element={<Add />} />

              {/* Rute Layanan */}
              <Route path="/powerpoint" element={<PowerPointPage />} />
              <Route path="/banner" element={<BannerPage />} />
              <Route path="/website" element={<WebsitePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/social-media" element={<SocialMediaPage />} />
              <Route path="/thumbnail" element={<ThumbnailPage />} />
              <Route path="/photo-editing" element={<PhotoEditingPage />} />
              <Route path="/video-editing" element={<VideoEditingPage />} />
              <Route path="/typing" element={<TypingPage />} />
              
              {/* Rute Generik dan Terproteksi (Login Dinonaktifkan) */}
              <Route path="/service/:serviceName" element={<ServicePage />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
        </main>
      
    </Router>
  );
}

export default App;