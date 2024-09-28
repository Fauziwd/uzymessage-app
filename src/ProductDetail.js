import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0); // Untuk geser gambar produk

  // Array gambar produk (kamu bisa ganti ini dengan API atau Firestore)
  const productImages = [
    '/path-to-your-image1.jpg',
    '/path-to-your-image2.jpg',
    '/path-to-your-image3.jpg'
  ];

  // Fungsi untuk mengubah gambar aktif
  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setActiveImage((prev) => (prev + 1) % productImages.length);
    } else {
      setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-200">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10"
      >
        ←
      </button>

      {/* Gambar produk */}
      <div className="h-3/5 flex items-center justify-center relative">
        <img
          src={productImages[activeImage]} 
          alt="Product"
          className="h-full object-contain"
        />
        {/* Tombol geser kanan-kiri gambar */}
        <button
          className="absolute left-2 bg-black text-white p-2 rounded-full"
          onClick={() => handleImageChange('prev')}
        >
          ‹
        </button>
        <button
          className="absolute right-2 bg-black text-white p-2 rounded-full"
          onClick={() => handleImageChange('next')}
        >
          ›
        </button>
      </div>

      {/* Bagian bawah yang bisa discroll */}
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg p-6 h-2/5 overflow-y-auto transition-transform duration-300">
        <h1 className="text-xl font-semibold">$205.99</h1>
        <p className="text-gray-700 mt-2">Iconic Link</p>
        
        {/* <div className="mt-4">
          <h3 className="font-medium">Choose your size</h3>
          <div className="flex gap-2 mt-2">
            <button className="border rounded-lg px-4 py-2">28 mm</button>
            <button className="border rounded-lg px-4 py-2">32 mm</button>
            <button className="border rounded-lg px-4 py-2">36 mm</button>
            <button className="border rounded-lg px-4 py-2">40 mm</button>
          </div>
        </div> */}

        <button className="w-full bg-black text-white py-3 mt-6 rounded-lg">Beli</button>

        {/* Informasi tambahan */}
        <div className="mt-8">
          <h3 className="font-medium">Additional Information</h3>
          <ul className="list-disc ml-5 mt-2 text-gray-600">
            <li>Case thickness: 8mm</li>
            <li>Material: Stainless steel</li>
            <li>Link bracelet</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
