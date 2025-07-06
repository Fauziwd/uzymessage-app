import React from 'react';
// Menambahkan FaImage untuk ikon placeholder
import { FaWhatsapp, FaCameraRetro, FaMagic, FaObjectGroup, FaSmile, FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- Komponen Baru untuk Gambar Tidak Tersedia ---
function ImageNotAvailable() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
      <div className="relative mb-4">
        {/* Efek 3D dibuat dengan shadow dan elemen bertumpuk */}
        <FaImage className="text-6xl text-gray-300" />
        <FaImage
          className="absolute top-0 left-0 text-6xl text-gray-400"
          style={{ transform: 'translate(2px, 2px)', filter: 'blur(2px)', zIndex: -1 }}
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-600">
        Oops! Gambar Belum Tersedia
      </h3>
      <p className="text-gray-500 text-center mt-1">
        Maaf, portofolio untuk layanan ini sedang kami persiapkan.
      </p>
    </div>
  );
}


function PhotoEditingPage() {
  const serviceName = "Editing Foto Profesional";
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

  // --- SIMULASI: Gambar tidak tersedia (array dikosongkan) ---
  const beforeAfterImages = [];
  // const beforeAfterImages = [
  //   { before: "/image/services/photo-before1.jpg", after: "/image/services/photo-after1.jpg" },
  //   { before: "/image/services/photo-before2.jpg", after: "/image/services/photo-after2.jpg" },
  //   { before: "/image/services/photo-before3.jpg", after: "/image/services/photo-after3.jpg" }
  // ];

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
              <span className="text-blue-600">Jasa {serviceName}</span> Berkualitas Tinggi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Dari perbaikan warna, retouching, hingga manipulasi foto, kami siap membuat foto Anda terlihat sempurna. Cocok untuk foto produk, potret, atau acara spesial.
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
                <p className="font-semibold text-gray-900">Mulai dari <span className="text-blue-600">IDR 40K</span></p>
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
                src="/image/photoedit.jpeg"
                alt="Contoh Editing Foto"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before-After Section */}
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
              Hasil <span className="text-blue-600">Sebelum & Sesudah</span>
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Lihat perbedaan yang bisa kami buat untuk foto Anda
            </motion.p>
          </motion.div>

          {/* --- LOGIKA KONDISIONAL DIMULAI DI SINI --- */}
          {beforeAfterImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beforeAfterImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 border-r border-white">
                        <img src={img.before} alt="Before" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-1/2 bg-black/70 text-white text-center py-1 text-sm">
                          Before
                        </div>
                      </div>
                      <div className="w-1/2">
                        <img src={img.after} alt="After" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 left-1/2 bg-blue-600/90 text-white text-center py-1 text-sm">
                          After
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // --- Jika tidak ada gambar, tampilkan komponen ini ---
            <ImageNotAvailable />
          )}
        </div>
      </section>

      {/* Services Section */}
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
              Layanan <span className="text-blue-600">Editing Foto</span> Kami
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Berbagai jenis editing profesional untuk kebutuhan berbeda
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
                icon: <FaMagic className="text-2xl text-purple-600" />,
                title: "Retouching Foto",
                desc: "Perbaikan kulit, penghilangan noda, dan penyempurnaan wajah"
              },
              {
                icon: <FaCameraRetro className="text-2xl text-blue-600" />,
                title: "Color Correction",
                desc: "Penyesuaian warna, kontras, dan keseimbangan white balance"
              },
              {
                icon: <FaObjectGroup className="text-2xl text-green-600" />,
                title: "Background Removal",
                desc: "Hapus background dan ganti dengan transparan atau background baru"
              },
              {
                icon: <FaSmile className="text-2xl text-yellow-500" />,
                title: "Manipulasi Foto",
                desc: "Kombinasi elemen kreatif untuk hasil yang unik dan menarik"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
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
              Siap Meningkatkan Kualitas Foto Anda?
            </h2>
            <p className="text-gray-600 mb-6">
              Kirim foto Anda sekarang dan dapatkan hasil editing profesional
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

export default PhotoEditingPage;