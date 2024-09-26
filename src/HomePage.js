import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Menggunakan Link dari react-router-dom
import Bottom from './Side/Bottom';
import './HomePage.css';

function HomePage() {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = ['Market', 'Notes', 'Messages', 'Toys'];
    const categoryImages = {
        Market: './image/market.jpeg',
        Notes: './image/notes.png',
        Messages: './image/messages.png',
        Donate: './image/donate.png',
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set category yang dipilih
    };

    // Daftar gambar untuk produk populer
    const popularProducts = [
        { id: 1, name: 'Sepatu Lokal', imgUrl: './image/sepatu.jpeg' },
        { id: 2, name: 'Keyboard Wireless', imgUrl: './image/keyboard.jpeg' },
        { id: 3, name: 'Monitor', imgUrl: './image/monitor.jpeg' },
        { id: 4, name: 'Dress Well', imgUrl: './image/fashion.jpeg' },
        { id: 5, name: 'Kosmetik', imgUrl: './image/kosmetik.jpeg' },
        { id: 6, name: 'Tas Ransel', imgUrl: './image/tas.jpeg' },
    ];

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 p-4 fixed top-0 shadow-xl w-full z-20">
                <div className="flex justify-between items-center">
                    {/* Ganti teks "Welcome" dengan gambar */}
                    <img
                        src="./image/logo.png"
                        alt="Logo or Welcome Image"
                        className="h-12 w-24 items-center"
                    />

                    <div className="relative w-2/3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-2 px-4 bg-gray-200 rounded-full focus:outline-none"
                        />
                        <FaSearch className="absolute top-3 right-4 text-gray-500" />
                    </div>
                </div>
            </header>


            <main className="flex-grow p-4 mt-20 mb-16">
  {/* Categories Section */}
  <section className="mb-4 mt-4 fixed top-16 left-0 right-0 bg-gray-200 p-4">
  <div className="max-w-screen-lg mx-auto">
    <h2 className="text-xl font-semibold mb-2">
      Categories
    </h2>
    {/* Auto-scroll horizontal */}
    <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-3 py-2 px-4">
      {['Market', 'Notes', 'Messages', 'Donate'].map((category, index) => (
        <Link to={`/${category.toLowerCase()}`} key={index}>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-4 h-28 min-w-[100px] w-full sm:w-auto">
            <img
              src={categoryImages[category]}
              alt={category}
              className="w-full h-24 object-contain rounded-lg"
            />
            <p className="text-sm mt-2">{category}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


  {/* Spacer untuk memberi ruang pada konten di bawah fixed Categories */}
  <div className="h-[140px]"></div>

  {/* Popular Products Section */}
  <section className="mt-16 mb-9 bg-gray-200">
    <h2 className="text-xl font-semibold mb-2">
      Popular Products
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {popularProducts.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg" // Mengatur tinggi gambar seragam
            />
            <p className="text-sm mt-2 text-center">{product.name}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
</main>



            {/* Bottom Navigation */}
            <Bottom />
        </div>
    );
}

export default HomePage;
