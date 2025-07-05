import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

function Add() {
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaBarang, setHargaBarang] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      window.location.href = '/login'; // Redirect ke halaman login jika belum login
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!namaBarang || !hargaBarang) {
      setError('Nama barang dan harga harus diisi.');
      return;
    }

    if (isNaN(hargaBarang)) {
      setError('Harga barang harus berupa angka.');
      return;
    }

    try {
      const firestore = getFirestore();
      const userItemsCollection = collection(firestore, 'users', userId, 'items');
      await addDoc(userItemsCollection, {
        namaBarang,
        hargaBarang: Number(hargaBarang),
        createdAt: new Date(),
      });

      setNamaBarang('');
      setHargaBarang('');
      setSuccessMessage('Barang berhasil ditambahkan.');
    } catch (error) {
      setError('Terjadi kesalahan saat menambahkan barang.');
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Barang</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Nama Barang</label>
          <input
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Masukkan nama barang"
          />
        </div>

        <div>
          <label className="block mb-2">Harga Barang</label>
          <input
            type="text"
            value={hargaBarang}
            onChange={(e) => setHargaBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Masukkan harga barang"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tambah Barang
        </button>
      </form>
    </div>
  );
}

export default Add;
