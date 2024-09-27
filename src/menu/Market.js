import React, { useState, useEffect } from 'react';
import { FiHeart, FiLink, FiSearch } from 'react-icons/fi'; // Mengganti ikon keranjang dengan ikon link
import Bottom from '../Side/Bottom';

// Dummy data untuk produk
const products = [
  { id: 1, name: 'Aerostreet', price: 'IDR 180K', category: 'Outfit', image: './image/sepatu.jpeg', isNew: true, link: 'https://s.shopee.co.id/6V5DyGnICR' },
  { id: 2, name: 'Keyboard', price: 'IDR 200K', category: 'Setup', image: './image/keyboard.jpeg', isNew: false, link: 'https://s.shopee.co.id/g7R1dXjzI' },
  { id: 3, name: 'Kemeja Laki', price: 'IDR 75K', category: 'Outfit', image: './image/fashion.jpeg', isNew: false, link: 'https://s.shopee.co.id/3q4SnUPPmL' },
  { id: 4, name: 'Tas Ransel', price: 'IDR 80K', category: 'Outfit', image: './image/tas.jpeg', isNew: true, link: 'https://s.shopee.co.id/8f9iYQ5fJH' },
];

// Fungsi utama untuk halaman Market
const Market = () => {
  // State untuk menyimpan indeks gambar saat ini dan daftar gambar
  const images = [
    './image/sepatu.jpeg',
    './image/keyboard.jpeg',
    './image/fashion.jpeg',
    './image/tas.jpeg'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State untuk filter kategori, pencarian, dan favorit
  const [category, setCategory] = useState('All'); 
  const [search, setSearch] = useState(''); 
  const [favorites, setFavorites] = useState([]); 

  // Mengganti gambar setiap beberapa detik (misalnya, 5 detik)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval); // Bersihkan interval ketika komponen unmount
  }, [images.length]);

  // Fungsi untuk menambahkan ke favorit
  const handleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  // Fungsi untuk membuka tautan produk
  const handleVisit = (link) => {
    window.open(link, '_blank'); // Buka tautan di tab baru
  };

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(product => 
    (category === 'All' || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search and Filter */}
      <div className="fixed -top-1 z-20 w-full p-4 bg-white/50 backdrop-blur-lg flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 border rounded-md bg-white/20 backdrop-blur-lg w-full mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch className="text-xl text-blue-500" />
      </div>

      {/* Promo Banner */}
      <div
        className="m-4 p-4 mt-20 rounded-lg text-center relative"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white">Get the special discount!</h2>
          <p className="text-sm text-white">UP to 50%</p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="p-4 flex space-x-4">
        <button 
          className={`px-4 py-2 rounded-full ${category === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCategory('All')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${category === 'Outfit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCategory('Outfit')}
        >
          Outfit
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${category === 'Setup' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCategory('Setup')}
        >
          Setup PC
        </button>
      </div>

      {/* Product Grid */}
      <div className="p-4 mb-9 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
            <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <div className="flex justify-between mt-2">
              <button 
                className={`p-2 rounded-full ${favorites.includes(product.id) ? 'bg-red-500' : 'bg-gray-200'}`}
                onClick={() => handleFavorite(product.id)}
              >
                <FiHeart className="text-white" />
              </button>
              <button 
                className="p-2 rounded-full bg-green-500 text-white"
                onClick={() => handleVisit(product.link)}
              >
                <FiLink />
              </button>
            </div>
          </div>
        ))}
      </div>

      
        <Bottom />
      </div>
   
  );
};

export default Market;
