import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Pastikan React Router sudah terpasang

const Donasi = () => {
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentMethods = [
    { id: 1, name: 'Saweria', url: 'https://saweria.co/username' },
    { id: 2, name: 'Dana', url: 'https://linkdana.co/username' },
    { id: 3, name: 'Flip', url: 'https://flip.id/username' },
    { id: 4, name: 'ShopeePay', url: 'https://shopee.co/username' },
    // Tambahkan metode pembayaran lainnya di sini
  ];

  const handlePaymentClick = (url) => {
    // Pindahkan ke aplikasi pembayaran yang dipilih
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
      {/* Tombol Kembali ke Home */}
      <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mb-4">
        <Link to="/home" className="inline-flex items-center p-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Home
        </Link>
      </div>

      {/* Banner / Informasi Utama */}
      <div className="bg-white p-4 rounded-lg shadow-md text-center mb-4 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Dukung Developer</h2>
        <p className="text-gray-600 mt-2 sm:text-lg">
          Anda dapat membantu developer dengan melakukan donasi melalui salah satu metode pembayaran di bawah ini.
        </p>
      </div>

      {/* Metode Pembayaran */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:text-2xl">Pilih Metode Pembayaran</h3>
        <ul className="space-y-4">
          {paymentMethods.map((method) => (
            <li key={method.id}>
              <button
                onClick={() => handlePaymentClick(method.url)}
                className={`w-full p-3 rounded-md text-white sm:text-lg ${
                  selectedPayment === method.name ? 'bg-blue-600' : 'bg-blue-500'
                } hover:bg-blue-700 transition`}
              >
                {method.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Informasi Tambahan */}
      <div className="text-center mt-6 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-gray-600 sm:text-lg">Terima kasih atas dukungannya! 💙</p>
      </div>
    </div>
  );
};

export default Donasi;
