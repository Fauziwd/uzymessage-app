import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ user, children }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowPopup(true);

      // Tunda redirect selama 3 detik untuk memberi waktu pop-up muncul
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/login'); // Arahkan ke halaman login setelah pop-up
      }, 5000);

      return () => clearTimeout(timer); // Bersihkan timeout jika komponen unmount
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <>
        {showPopup && (
          <div className="fixed inset-0 p-5 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <img src="../image/auth.png" alt="Gambar autentikasi" className="mb-4" />
      <h2 className="text-lg font-semibold mb-2">Autentikasi Diperlukan!</h2>
      <p className="text-sm text-gray-700">Anda harus login terlebih dahulu untuk mengakses halaman ini.</p>
    </div>
          </div>
        )}
      </>
    );
  }

  // Tampilkan konten jika pengguna sudah login
  return children;
}

export default PrivateRoute;
