import React from 'react';
import { FaWhatsapp, FaLaptopCode, FaMobileAlt, FaPalette, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

function PortfolioPage() {
  const serviceName = "Pembuatan Portofolio Digital";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const portfolioTypes = [
    {
      title: "Portofolio Desainer",
      features: ["Tampilan visual menarik", "Galeri karya interaktif", "Optimasi untuk perangkat mobile"],
      image: "/image/portfolio-design.jpeg"
    },
    {
      title: "Portofolio Fotografer",
      features: ["Galeri foto fullscreen", "Kategori terorganisir", "Watermark otomatis"],
      image: "/image/portfolio-photo.jpeg"
    },
    {
      title: "Portofolio Developer",
      features: ["Tampilan proyek coding", "Embed demo langsung", "Integrasi GitHub"],
      image: "/image/portfolio-dev.jpeg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              <span className="text-blue-600">Jasa {serviceName}</span> Profesional
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Tampilkan karya terbaik Anda dengan portofolio digital yang elegan dan profesional. Cocok untuk desainer, fotografer, developer, dan profesional kreatif lainnya untuk memikat klien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                href={orderLink}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                Pesan Sekarang
              </a>
              <div className="px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-900">Mulai dari <span className="text-blue-600">IDR 300K</span></p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/image/portfolio.jpeg"
                alt="Contoh Portofolio Digital"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 mb-3">
              Jenis <span className="text-blue-600">Portofolio Digital</span>
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Kami buat khusus sesuai kebutuhan profesi Anda
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 mb-3">
              Keunggulan <span className="text-blue-600">Portofolio</span> Kami
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk menampilkan karya profesional Anda
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FaLaptopCode className="text-2xl text-blue-600" />,
                title: "Responsive Design",
                desc: "Tampilan optimal di semua perangkat"
              },
              {
                icon: <FaMobileAlt className="text-2xl text-purple-600" />,
                title: "Mobile Friendly",
                desc: "Navigasi mudah di smartphone"
              },
              {
                icon: <FaPalette className="text-2xl text-green-600" />,
                title: "Custom Design",
                desc: "Desain unik sesuai brand Anda"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-10 rounded-xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Siap Membangun Portofolio Profesional Anda?
            </h2>
            <p className="text-gray-600 mb-6">
              Tingkatkan kredibilitas dan dapatkan lebih banyak klien dengan portofolio digital berkualitas
            </p>
            <a
              href={orderLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <FaWhatsapp className="text-xl" />
              Order Now!
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default PortfolioPage;