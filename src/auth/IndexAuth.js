import React from 'react';
import { Link } from 'react-router-dom';

function IndexAuth() {
  // Gambar ilustrasi (mengganti gambar sesuai kebutuhan)
  const illustrationImage = './image/welcome.jpeg';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Section 1: Illustration */}
      <section className="flex flex-col items-center justify-center">
        <img 
          src={illustrationImage} 
          alt="Illustration" 
          className="w-full max-w-xs mb-6" 
        />
      </section>

      {/* Section 2: Welcome Text */}
      <section className="text-left mb-3 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-4">
         Sekarang kamu tidak perlu menuliskan rekap penjualanmu di buku catatan, cukup tulis disini saja, kami akan menyimpannya!
        </p>
      </section>

      {/* Section 3: Next Button */}
      <section className="flex flex-col items-center">
        <Link to="/login">
          <button className="bg-indigo-600 text-white px-28 py-3 rounded-full shadow-lg hover:bg-indigo-800 transition duration-300">
            Next
          </button>
        </Link>
      </section>
    </div>
  );
}

export default IndexAuth;
