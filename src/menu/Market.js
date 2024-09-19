import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiSearch } from 'react-icons/fi'; // Menggunakan react-icons untuk icon
import Bottom from '../Side/Bottom';

// Dummy data untuk produk
const products = [
  { id: 1, name: 'Nike Shoes', price: '$12.00', category: 'Footwear', image: 'url', isNew: true },
  { id: 2, name: 'Chair', price: '$10.00', category: 'Furniture', image: 'url', isNew: false },
  { id: 3, name: 'Sports Shoes', price: '$100.00', category: 'Footwear', image: 'url', isNew: false },
  { id: 4, name: 'Watch', price: '$50.00', category: 'Accessories', image: 'url', isNew: false },
  // Tambahkan data produk lainnya
];

// Fungsi utama untuk halaman Market
const Market = () => {
  const [category, setCategory] = useState('All'); // State untuk filter kategori
  const [search, setSearch] = useState(''); // State untuk pencarian
  const [favorites, setFavorites] = useState([]); // State untuk daftar favorit
  const [cart, setCart] = useState([]); // State untuk keranjang belanja

  // Fungsi untuk menambahkan ke favorit
  const handleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  // Fungsi untuk menambahkan ke keranjang
  const handleAddToCart = (id) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(product => 
    (category === 'All' || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search and Filter */}
      <div className="p-4 bg-white flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 border rounded-md w-full mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch className="text-xl text-gray-500" />
      </div>

      {/* Promo Banner */}
      <div className="m-4 p-4 bg-blue-300 rounded-lg text-center">
        <h2 className="text-xl font-bold">Get the special discount!</h2>
        <p className="text-sm">50% OFF</p>
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
          className={`px-4 py-2 rounded-full ${category === 'Footwear' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCategory('Footwear')}
        >
          Footwear
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${category === 'Furniture' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCategory('Furniture')}
        >
          Furniture
        </button>
        {/* Tambahkan kategori lainnya */}
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
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
                className="p-2 rounded-full bg-blue-500 text-white"
                onClick={() => handleAddToCart(product.id)}
              >
                <FiShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation (Optional, jika ada fitur navigasi bawah) */}
      <div className="fixed bottom-0 w-full flex justify-around bg-white py-4 shadow-md">
        <Bottom />
      </div>
    </div>
  );
};

export default Market;
