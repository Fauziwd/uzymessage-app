import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Menggunakan Link dari react-router-dom
import Bottom from './Side/Bottom';

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
            <header className="bg-white dark:bg-gray-800 p-4 fixed top-0 shadow-xl w-full">
                <div className="flex justify-between items-center">
                    <div className="text-gray-800 text-xl font-semibold">Welcome</div>
                    <div className="relative w-2/3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-2 px-4 bg-gray-200 rounded-full focus:outline-none"
                        />
                        <FaSearch className="absolute top-2 right-4 text-gray-500" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-4 mt-20 mb-16">
                {/* Categories Section */}
                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Categories</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {['Market', 'Notes', 'Messages', 'Donate'].map((category, index) => (
                            <Link to={`/${category.toLowerCase()}`} key={index}>
                                <div
                                    className={`flex flex-col items-center bg-white rounded-lg shadow p-4 ${category.toLowerCase()}-category`} // ClassName unik
                                >
                                    <img
                                        src={categoryImages[category]} // Gambar berbeda untuk setiap kategori
                                        alt={category}
                                        className={`w-full h-full ${category.toLowerCase()}-image`} // ClassName unik untuk setiap gambar
                                    />
                                    <p className="text-sm mt-2">{category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Popular Products Section */}
                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Popular Products</h2>
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
