// src/pages/TypingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bottom from '../Side/Bottom'; // Impor komponen Bottom untuk navigasi
import '../HomePage.css'; // Impor CSS dari HomePage untuk gaya retro

function TypingPage() {
  const serviceName = "Pengetikan Kilat";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <div className="retro-homepage bg-cream-100 min-h-screen font-mono text-gray-800 flex flex-col">
      {/* Header Retro */}
      <header className="retro-header p-4 flex justify-between items-center border-b-2 border-gray-800">
        <Link to="/home" className="retro-button text-sm">
          &lt; Kembali
        </Link>
        <h1 className="text-xl font-bold text-center flex-grow truncate px-2">
          {serviceName}
        </h1>
        <div style={{ width: '80px' }}></div> {/* Spacer untuk menyeimbangkan judul */}
      </header>

      {/* Konten Utama */}
      <main className="p-4 md:p-8 flex-grow">
        <motion.div
          className="retro-card bg-white p-6 border-2 border-gray-800 shadow-retro max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gambar Layanan */}
          <img
            src="/image/typing.jpeg"
            alt={serviceName}
            className="w-full h-48 object-cover mb-4 border-2 border-gray-800"
          />

          {/* Deskripsi */}
          <h2 className="text-2xl font-bold mb-2">Deskripsi Layanan</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Butuh transkrip dokumen atau data entry dengan cepat dan akurat? Kami menyediakan jasa pengetikan dari file PDF, gambar, atau tulisan tangan dengan layanan kilat.
          </p>

          {/* Harga dan Tombol Aksi */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t-2 border-dashed border-gray-400">
            <span className="text-2xl font-bold mb-4 sm:mb-0">
              Harga: IDR 20K
            </span>
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button w-full sm:w-auto"
            >
              Order Now!
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer Navigasi */}
      {/* <Bottom /> */}
    </div>
  );
}

export default TypingPage;