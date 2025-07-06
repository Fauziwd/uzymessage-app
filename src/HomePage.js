import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bottom from './Side/Bottom';
import { 
  FaSearch, 
  FaPaintBrush, 
  FaFilePowerpoint, 
  FaGlobe, 
  FaYoutube, 
  FaMobileAlt, 
  FaEdit, 
  FaKeyboard, 
  FaVideo,
  FaArrowRight,
  FaRegStar,
  FaStar,
  FaBolt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';

// Retro color palette
const retroColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  dark: '#292F36',
  light: '#F7FFF7',
  vintage: '#6B5B95'
};

// --- DATA DENGAN PALET RETRO ---
const services = [
  { id: 1, name: 'Presentasi PowerPoint', icon: <FaFilePowerpoint />, link: '/powerpoint', color: retroColors.primary },
  { id: 2, name: 'Desain Banner/Spanduk', icon: <FaPaintBrush />, link: '/banner', color: retroColors.secondary },
  { id: 3, name: 'Website Profesional', icon: <FaGlobe />, link: '/website', color: retroColors.vintage },
  { id: 4, name: 'Portofolio Digital', icon: <FaMobileAlt />, link: '/portfolio', color: retroColors.accent },
  { id: 5, name: 'Konten Media Sosial', icon: <FaPaintBrush />, link: '/social-media', color: retroColors.primary },
  { id: 6, name: 'Thumbnail YouTube', icon: <FaYoutube />, link: '/thumbnail', color: retroColors.secondary },
  { id: 7, name: 'Editing Foto', icon: <FaEdit />, link: '/photo-editing', color: retroColors.vintage },
  { id: 8, name: 'Editing Video', icon: <FaVideo />, link: '/video-editing', color: retroColors.accent },
  { id: 9, name: 'Pengetikan Kilat', icon: <FaKeyboard />, link: '/typing', color: retroColors.primary }
];

const recommendedItems = [
  { 
    id: 1, 
    name: 'Sepatu Kanvas Klasik', 
    price: 'IDR 180K', 
    category: 'Gaya Hidup', 
    image: './image/sepatu.jpeg', 
    link: 'https://s.shopee.co.id/6V5DyGnICR',
    rating: 4,
    isTrending: true
  },
  { 
    id: 2, 
    name: 'Keyboard Typewriter', 
    price: 'IDR 200K', 
    category: 'Aksesoris', 
    image: './image/keyboard.jpeg', 
    link: 'https://s.shopee.co.id/g7R1dXjzI',
    rating: 5,
    isNew: true
  },
  { 
    id: 3, 
    name: 'Kemeja Flanel Vintage', 
    price: 'IDR 75K', 
    category: 'Pakaian', 
    image: './image/fashion.jpeg', 
    link: 'https://s.shopee.co.id/3q4SnUPPmL',
    rating: 4,
    isBestSeller: true
  },
  { 
    id: 4, 
    name: 'Tas Ransel Kulit Sintetis', 
    price: 'IDR 80K', 
    category: 'Aksesoris', 
    image: './image/tas.jpeg', 
    link: 'https://s.shopee.co.id/8f9iYQ5fJH',
    rating: 3
  },
];

// --- VARIAN ANIMASI ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
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
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
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
  },
  hover: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [filteredItems, setFilteredItems] = useState(recommendedItems);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    setFilteredServices(services.filter(item => item.name.toLowerCase().includes(lowercasedFilter)));
    setFilteredItems(recommendedItems.filter(item => item.name.toLowerCase().includes(lowercasedFilter)));
  }, [searchTerm]);

  // Generate star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? 
      <FaStar key={i} className="text-yellow-400" /> : 
      <FaRegStar key={i} className="text-gray-300" />
    ));
  };

  return (
    <div className="min-h-screen bg-[#F7FFF7] text-[#292F36] font-sans antialiased">
      {/* Grainy texture overlay */}
      <div className="fixed inset-0 pointer-events-none grain-pattern opacity-10 z-0"></div>
      
      {/* --- HEADER --- */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed top-0 w-full z-20 py-4"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg border-2 border-[#292F36] shadow-retro">
            <Link to="/" className="text-2xl font-extrabold text-[#FF6B6B]">
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                Jasa<span className="text-[#292F36]">Plus</span>
              </motion.span>
            </Link>
            <div className="relative w-full max-w-lg mx-4">
              <motion.div
                whileFocusWithin={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Cari jasa atau produk retro..."
                  className="w-full py-2 pl-10 pr-4 bg-white border-2 border-[#292F36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#292F36]" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="pt-32 pb-20 container mx-auto px-6 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 bg-[#FFE66D] rounded-lg border-3 border-dashed border-[#292F36] text-center relative overflow-hidden"
        >
          {/* Floating retro shapes */}
          <motion.div 
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 5, 0, -5],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-8 h-8 bg-[#FF6B6B] rounded-full opacity-20"
          />
          <motion.div 
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 10, -10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-5 right-10 w-12 h-12 bg-[#4ECDC4] opacity-20 rotate-45"
          />
          
        <h1 className="text-4xl md:text-5xl font-extrabold text-retro-text mb-3">
    Punya Usaha Tapi Belum <span className="text-retro-green">Maksimal?</span>
  </h1>
  <p className="text-lg text-retro-text/80 max-w-2xl mb-5 mx-auto">
    Sini kami bantu! Temukan berbagai jasa digital untuk melesatkan usaha Anda.
  </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#FF6B6B] text-white font-bold rounded-md border-2 border-[#292F36] shadow-retro hover:bg-[#292F36] transition-colors"
          >
            Jelajahi Sekarang
          </motion.button>
        </motion.section>

        {/* --- DIGITAL SERVICES SECTION --- */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-[#292F36]"
            >
              Layanan <span className="text-[#FF6B6B]">Digital</span> Kami
            </motion.h2>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              <Link to="/home" className="text-[#292F36] hover:text-[#FF6B6B] font-medium flex items-center">
                Lihat Semua <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
          
          <AnimatePresence>
            {filteredServices.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {filteredServices.map((service) => (
                  <motion.div 
                    key={service.id} 
                    variants={itemVariants}
                    whileHover="hover"
                    onHoverStart={() => setIsHovering(service.id)}
                    onHoverEnd={() => setIsHovering(null)}
                    className="group relative"
                  >
                    <Link to={service.link} className="block h-full">
                      <div 
                        className="h-full p-5 rounded-lg border-2 border-[#292F36] flex flex-col items-center justify-center text-center transition-all duration-300 shadow-retro"
                        style={{ backgroundColor: `${service.color}20`, borderColor: service.color }}
                      >
                        <motion.div
                          animate={isHovering === service.id ? { rotate: 15 } : { rotate: 0 }}
                          className="mb-3 text-3xl"
                          style={{ color: service.color }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className="font-bold text-[#292F36]">{service.name}</h3>
                        
                        {/* Animated underline */}
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isHovering === service.id ? '100%' : 0 }}
                          className="h-1 mt-2"
                          style={{ backgroundColor: service.color }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4 text-4xl"
                >
                  🕵️‍♂️
                </motion.div>
                <h3 className="text-xl font-medium text-[#292F36]">Layanan tidak ditemukan</h3>
                <p className="text-[#292F36]/70 mt-2">Coba kata kunci lain atau jelajahi layanan kami</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- RECOMMENDED PRODUCTS SECTION --- */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#292F36]"
            >
              Rekomendasi <span className="text-[#4ECDC4]">Produk</span> Pilihan
            </motion.h2>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              <Link to="/market" className="text-[#292F36] hover:text-[#4ECDC4] font-medium flex items-center">
                Lihat Semua <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
          
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredItems.map((product) => (
                  <motion.div 
                    key={product.id} 
                    variants={itemVariants}
                    whileHover="hover"
                    className="group relative"
                  >
                    {/* Product badges */}
                    {product.isTrending && (
                      <motion.div
                        variants={badgeVariants}
                        className="absolute -top-3 -right-3 bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-retro"
                      >
                        TRENDING
                      </motion.div>
                    )}
                    {product.isNew && (
                      <motion.div
                        variants={badgeVariants}
                        className="absolute -top-3 -right-3 bg-[#4ECDC4] text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-retro"
                      >
                        BARU!
                      </motion.div>
                    )}
                    {product.isBestSeller && (
                      <motion.div
                        variants={badgeVariants}
                        className="absolute -top-3 -right-3 bg-[#FFE66D] text-[#292F36] px-3 py-1 rounded-full text-xs font-bold z-10 shadow-retro"
                      >
                        BEST SELLER
                      </motion.div>
                    )}
                    
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border-2 border-[#292F36] transition-all duration-300 group-hover:shadow-xl group-hover:border-[#4ECDC4]">
                        <div className="overflow-hidden relative">
                          <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.1 }}
                          />
                          <div className="absolute bottom-2 left-2 flex">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-bold text-lg text-[#292F36] mb-1">{product.name}</h3>
                          <p className="text-[#292F36]/60 text-sm mb-3">{product.category}</p>
                          <div className="mt-auto">
                            <motion.p 
                              variants={pulseVariants}
                              animate="pulse"
                              className="text-xl font-extrabold text-[#FF6B6B]"
                            >
                              {product.price}
                            </motion.p>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="mt-3 w-full py-2 bg-[#4ECDC4] text-white font-bold rounded-md hover:bg-[#292F36] transition-colors duration-300 flex items-center justify-center"
                            >
                              Lihat Detail <FaArrowRight className="ml-2" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
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
                <p className="text-[#292F36]/70 mt-2">Coba kata kunci lain atau jelajahi produk kami</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- CTA SECTION --- */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 mb-16 p-8 bg-[#6B5B95] rounded-lg text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 grain-pattern"></div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Siap Memulai Proyek Anda?
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto mb-8"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tim profesional kami siap membantu mewujudkan ide kreatif Anda dengan sentuhan retro yang unik.
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FFE66D", color: "#292F36" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#FF6B6B] text-white font-bold rounded-md border-2 border-white shadow-retro transition-colors"
            >
              Hubungi Kami
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "white", color: "#292F36" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent text-white font-bold rounded-md border-2 border-white shadow-retro transition-colors"
            >
              Lihat Portofolio
            </motion.button>
          </motion.div>
        </motion.section>

      </main>
      
      <Bottom />
    </div>
  );
}

export default HomePage;