import React, { useState } from 'react';
import { FaSearch, FaHome, FaBell, FaUser } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Menggunakan Link dari react-router-dom


function HomePage() {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = ['Spill', 'Notes', 'Messages', 'Toys'];
    const categoryImages = {
        Spill: 'https://via.placeholder.com/50?text=Market',
        Notes: 'https://via.placeholder.com/50?text=Notes',
        Messages: 'https://via.placeholder.com/50?text=Messages',
        Toys: 'https://via.placeholder.com/50?text=Donate',
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set category yang dipilih
    };


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
                                   className={`w-12 h-12 ${category.toLowerCase()}-image`} // ClassName unik untuk setiap gambar
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
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Link to={`/product/${index}`} key={index}> {/* Menggunakan Link */}
                                <div
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                                >
                                    <img
                                        src="https://via.placeholder.com/100"
                                        alt="Product"
                                        className="w-full rounded-lg"
                                    />
                                    <p className="text-sm mt-2 text-center">Product Name</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="bg-white dark:bg-gray-800 p-4 shadow-lg fixed bottom-0 w-full">
                <div className="flex justify-between">
                    <Link to="/home"> {/* Link untuk Home */}
                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                            <FaHome className="text-xl" />
                            <span className="text-xs">Home</span>
                        </button>
                    </Link>
                    <Link to="/favorites"> {/* Link untuk Favorites */}
                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                            <FiHeart className="text-xl" />
                            <span className="text-xs">Favorites</span>
                        </button>
                    </Link>
                    <Link to="/notifications"> {/* Link untuk Notifications */}
                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                            <FaBell className="text-xl" />
                            <span className="text-xs">Notifications</span>
                        </button>
                    </Link>
                    <Link to="/profile"> {/* Link untuk Profile */}
                        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
                            <FaUser className="text-xl" />
                            <span className="text-xs">Profile</span>
                        </button>
                    </Link>
                </div>
            </nav>

        </div>
    );
}

export default HomePage;
