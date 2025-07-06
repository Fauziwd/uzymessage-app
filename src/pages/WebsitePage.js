import React from 'react';
import { FaWhatsapp, FaLaptopCode, FaShoppingCart, FaBuilding, FaSchool, FaHotel, FaHospital, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

function WebsitePage() {
    const serviceName = "Pembuatan Website Profesional";
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

    const webServices = [
        {
            icon: <FaLaptopCode className="text-2xl" />,
            title: "Landing Page",
            desc: "Website satu halaman untuk kampanye khusus"
        },
        {
            icon: <FaShoppingCart className="text-2xl" />,
            title: "Web Ecommerce",
            desc: "Toko online lengkap dengan sistem pembayaran"
        },
        {
            icon: <FaBuilding className="text-2xl" />,
            title: "Company Profile",
            desc: "Website profesional untuk perusahaan Anda"
        },
        {
            icon: <FaSchool className="text-2xl" />,
            title: "Manajemen Sekolah",
            desc: "Sistem terintegrasi untuk institusi pendidikan"
        },
        {
            icon: <FaHotel className="text-2xl" />,
            title: "Booking Hotel System",
            desc: "Pemesanan kamar online dengan manajemen admin"
        },
        {
            icon: <FaHospital className="text-2xl" />,
            title: "Administrasi Rumah Sakit",
            desc: "Sistem informasi rumah sakit terintegrasi"
        },
        {
            icon: <FaTools className="text-2xl" />,
            title: "Custom Website",
            desc: "Pengembangan sesuai kebutuhan khusus Anda"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white"
        >
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-green-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="md:w-1/2 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold"
                        >
                            <span className="text-white">Komplet<span className="text-green-200">In</span></span> Web Development
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-blue-100"
                        >
                            Create Your Own Site - Bangun website impian Anda dengan tim profesional kami
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <a
                                href={orderLink}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-green-700 font-bold rounded-lg shadow-md transition-all duration-300"
                            >
                                <FaWhatsapp className="text-xl" />
                                Order Here!
                            </a>
                            <div className="px-6 py-3 bg-blue-600/30 border border-blue-400/20 rounded-lg backdrop-blur-sm">
                                <p className="font-semibold">konsultasikan harga dengan admin kami</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="md:w-1/2 relative"
                    >
                        <img
                            src="/image/services/web-dev.jpg"
                            alt="Web Development"
                            className="w-full rounded-xl shadow-2xl border-4 border-blue-500"
                        />
                    </motion.div> */}
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={item} className="text-3xl font-bold text-gray-800 mb-3">
                            <span className="text-blue-600">WEB DEVELOPER</span> SERVICES
                        </motion.h2>
                        <motion.p variants={item} className="text-xl text-gray-600">
                            Bisa bikin web apa aja kak?
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {webServices.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -5 }}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 mx-auto text-blue-600">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-center">{service.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={item} className="text-3xl font-bold text-gray-800 mb-3">
                            Proses <span className="text-blue-600">Pembuatan Website</span>
                        </motion.h2>
                        <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
                            Alur kerja profesional untuk hasil terbaik
                        </motion.p>
                    </motion.div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-blue-600/30 transform -translate-x-1/2"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {[
                                { step: "1", title: "Konsultasi", desc: "Diskusikan kebutuhan website Anda" },
                                { step: "2", title: "Desain", desc: "Pembuatan mockup dan UI/UX" },
                                { step: "3", title: "Development", desc: "Proses coding dan implementasi" },
                                { step: "4", title: "Testing", desc: "Pengujian semua fitur" },
                                { step: "5", title: "Launch", desc: "Website siap digunakan" }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative ${index % 2 === 0 ? 'lg:mb-0' : 'lg:mt-10'}`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-lg mb-3 border border-blue-600/20">
                                            {step.step}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                                        <p className="text-gray-600 mt-1">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-green-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Siap Membangun Website Profesional?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Jadikan bisnis Anda lebih profesional dengan website berkualitas
                        </p>
                        <a
                            href={orderLink}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-blue-50 text-green-700 font-bold rounded-lg shadow-lg transition-all duration-300"
                        >
                            <FaWhatsapp className="text-xl" />
                            Order Here!
                        </a>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

export default WebsitePage;