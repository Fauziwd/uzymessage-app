import React, { useState } from 'react';
import { FaHome, FaHeart, FaUser, FaBell, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom'; // Import Link dan useLocation

function Bottom() {
  const location = useLocation(); // Dapatkan URL saat ini
  const [active, setActive] = useState(location.pathname); // Gunakan path sebagai state aktif

  // Function untuk handle perubahan item aktif
  const handleSetActive = (name) => {
    setActive(name);
  };

  return (
    <div className="fixed bottom-0 w-full bg-black p-7 rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center relative">
        {[
          { name: 'home', icon: <FaHome />, link: '/home' },
          { name: 'favorites', icon: <FaShoppingCart />, link:'/market'  },
          { name: 'plus', icon: <FaPlus />, link: '/notes' },
          { name: 'notifications', icon: <MdOutlineStickyNote2 />},
          { name: 'profile', icon: <FaRegUser />, link: '/profile' },
        ].map((item, index) => (
          <Link
            to={item.link} // Link untuk mengarahkan ke rute yang sesuai
            key={index}
            className="relative flex flex-col items-center cursor-pointer"
            onClick={() => handleSetActive(item.link)} // Mengatur active state berdasarkan link
          >
            {/* Highlight Background untuk yang aktif */}
            {active === item.link && (
              <div className="absolute -top-2 transform -translate-y-6">
                <div className="w-11 h-16 bg-red-500 rounded-full blur-md opacity-40 transition-transform duration-300 ease-in-out"></div>
              </div>
            )}

            {/* Icon */}
            <div
              className={`text-2xl ${
                active === item.link ? 'text-red-500' : 'text-gray-500'
              } transition-all duration-300 ease-in-out`}
            >
              {item.icon}
            </div>

            {/* Garis Merah di bawah icon aktif */}
            {active === item.link && (
              <div className="absolute bottom-12 w-16 h-1 bg-red-500 rounded-full mt-2 transition-transform duration-300 ease-in-out"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bottom;
