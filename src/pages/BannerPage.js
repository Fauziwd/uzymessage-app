import React from 'react';
import { FaWhatsapp, FaPalette, FaLightbulb, FaVectorSquare, FaRegSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';

function BannerPage() {
  const serviceName = "Desain Banner dan Spanduk";
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Jasa <span className="text-blue-600">{serviceName}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Butuh banner untuk promosi atau acara? Kami siap mendesain banner dan spanduk yang eye-catching untuk menarik perhatian audiens Anda, baik untuk keperluan cetak maupun digital.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={orderLink}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                Pesan Sekarang
              </a>
              <div className="px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-900">Mulai dari <span className="text-blue-600">IDR 75K</span></p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:w-1/2"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/image/services/banner-design.jpg" 
                alt="Contoh Desain Banner" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 mb-4">
              Keunggulan Layanan Kami
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Desain banner profesional yang membuat brand Anda lebih menonjol
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <FaPalette className="text-3xl text-blue-600" />,
                title: "Desain Kreatif",
                desc: "Konsep unik dan menarik sesuai kebutuhan Anda"
              },
              {
                icon: <FaLightbulb className="text-3xl text-yellow-500" />,
                title: "Ide Menarik",
                desc: "Solusi visual efektif untuk sampaikan pesan Anda"
              },
              {
                icon: <FaVectorSquare className="text-3xl text-purple-600" />,
                title: "Kualitas HD",
                desc: "File siap cetak dengan resolusi tinggi"
              },
              {
                icon: <FaRegSmile className="text-3xl text-green-600" />,
                title: "Kepuasan Klien",
                desc: "Revisi hingga Anda puas dengan hasilnya"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Siap Meningkatkan Bisnis Anda?
            </h2>
            <p className="text-gray-600 mb-6">
              Pesan sekarang dan dapatkan desain banner profesional untuk kebutuhan promosi Anda
            </p>
            <a
              href={orderLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <FaWhatsapp className="text-xl" />
              Hubungi via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default BannerPage;