// src/components/ServicePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Bottom from '../Side/Bottom'; // Assuming Bottom is in src/Side/
import { FaArrowLeft } from 'react-icons/fa';

function ServicePage({ title, description, image, price, orderLink }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center">
            <FaArrowLeft className="mr-2" />
            <span>Kembali ke Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{description}</p>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Harga Mulai Dari</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{price}</p>
              </div>
              <a 
                href={orderLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </main>
      <Bottom />
    </div>
  );
}

export default ServicePage;