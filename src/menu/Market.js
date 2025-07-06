import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiLink, FiSearch } from 'react-icons/fi';
import Bottom from '../Side/Bottom';

// Retro color palette
const retroColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  dark: '#292F36',
  light: '#F7FFF7',
  vintage: '#6B5B95'
};

// Dummy data untuk produk
const products = [
  { 
    id: 1, 
    name: 'Aerostreet Vintage', 
    price: 'IDR 180K', 
    category: 'Outfit', 
    image: './image/sepatu.jpeg', 
    isNew: true, 
    link: 'https://s.shopee.co.id/6V5DyGnICR',
    rating: 4
  },
  { 
    id: 2, 
    name: 'Keyboard Typewriter', 
    price: 'IDR 200K', 
    category: 'Setup', 
    image: './image/keyboard.jpeg', 
    isNew: false, 
    link: 'https://s.shopee.co.id/g7R1dXjzI',
    rating: 5
  },
  { 
    id: 3, 
    name: 'Kemeja Flanel Retro', 
    price: 'IDR 75K', 
    category: 'Outfit', 
    image: './image/fashion.jpeg', 
    isNew: false, 
    link: 'https://s.shopee.co.id/3q4SnUPPmL',
    rating: 4
  },
  { 
    id: 4, 
    name: 'Tas Ransel Vintage', 
    price: 'IDR 80K', 
    category: 'Outfit', 
    image: './image/tas.jpeg', 
    isNew: true, 
    link: 'https://s.shopee.co.id/8f9iYQ5fJH',
    rating: 3
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }
};

const badgeVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

const Market = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [category, setCategory] = useState('All'); 
  const [search, setSearch] = useState(''); 
  const [favorites, setFavorites] = useState([]);
  const [isHovering, setIsHovering] = useState(null);

  const images = products.map(product => product.image);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const handleVisit = (link) => {
    window.open(link, '_blank');
  };

  const filteredProducts = products.filter(product => 
    (category === 'All' || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? 
      <span key={i} className="text-yellow-400">★</span> : 
      <span key={i} className="text-gray-300">★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#F7FFF7] text-[#292F36]">
      {/* Grainy texture overlay */}
      <div className="fixed inset-0 pointer-events-none grain-pattern opacity-10 z-0"></div>
      
      {/* Search and Filter */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed top-0 z-20 w-full p-4 bg-white/80 backdrop-blur-lg flex justify-between items-center border-b-2 border-[#292F36]"
      >
        <div className="relative w-full">
          <motion.div
            whileFocusWithin={{ scale: 1.02 }}
            className="relative flex items-center"
          >
            <input 
              type="text" 
              placeholder="Cari produk apa nich ..." 
              className="p-2 pl-10 w-full border-2 border-[#292F36] rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 text-[#292F36]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="m-4 p-4 mt-20 rounded-lg text-center relative overflow-hidden border-2 border-[#292F36] shadow-retro"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col justify-center">
          <motion.h2 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl font-bold text-[#FFE66D]"
          >
            DISKON SPESIAL!
          </motion.h2>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-white"
          >
            Hingga 50% untuk produk terpilih
          </motion.p>
        </div>
      </motion.div>

      {/* Categories Filter */}
      <motion.div 
        className="p-4 flex space-x-4 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {['All', 'Outfit', 'Setup'].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full whitespace-nowrap border-2 ${category === cat ? 'bg-[#FF6B6B] text-white border-[#FF6B6B]' : 'bg-white border-[#292F36]'}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'Setup' ? 'Setup PC' : cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Product Grid */}
      <motion.div 
        className="p-4 mb-9 grid grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              onHoverStart={() => setIsHovering(product.id)}
              onHoverEnd={() => setIsHovering(null)}
              className="bg-white p-4 rounded-lg border-2 border-[#292F36] shadow-retro relative"
            >
              {/* New badge */}
              {product.isNew && (
                <motion.div
                  variants={badgeVariants}
                  className="absolute -top-2 -right-2 bg-[#FFE66D] text-[#292F36] px-2 py-1 rounded-full text-xs font-bold z-10 border border-[#292F36]"
                >
                  BARU!
                </motion.div>
              )}

              <div className="overflow-hidden rounded-md mb-2">
                <motion.img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <h3 className="font-bold text-[#292F36]">{product.name}</h3>
              <div className="flex items-center mb-1">
                {renderStars(product.rating)}
              </div>
              <p className="text-[#FF6B6B] font-bold">{product.price}</p>

              <div className="flex justify-between mt-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${favorites.includes(product.id) ? 'bg-[#FF6B6B]' : 'bg-[#292F36]/10'} border border-[#292F36]/20`}
                  onClick={() => handleFavorite(product.id)}
                >
                  <FiHeart className={favorites.includes(product.id) ? 'text-white' : 'text-[#292F36]'} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-[#4ECDC4] text-white border border-[#292F36]"
                  onClick={() => handleVisit(product.link)}
                >
                  <FiLink />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
            className="inline-block mb-4 text-4xl"
          >
            🕵️‍♀️
          </motion.div>
          <h3 className="text-xl font-medium text-[#292F36]">Produk tidak ditemukan</h3>
          <p className="text-[#292F36]/70 mt-2">Coba kata kunci lain atau filter yang berbeda</p>
        </motion.div>
      )}

      {/* <Bottom /> */}
    </div>
  );
};

export default Market;