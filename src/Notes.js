import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import Bottom from './Side/Bottom';

function Notes() {
  const [formData, setFormData] = useState({
    nomor: '',
    nomorResi: '',
    tanggal: '',
    nama: '',
    namaBarang: '',
    jumlahBarang: '',
    alamat: '',
    ekspedisi: ''
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          const notesCollection = collection(firestore, 'users', user.uid, 'notes');
          const notesSnapshot = await getDocs(notesCollection);
          const nextNomor = notesSnapshot.size + 1;
          setFormData((prevData) => ({ ...prevData, nomor: nextNomor.toString() }));
        } catch (error) {
          console.error("Error fetching notes collection:", error);
        }
      } else {
        window.location.href = '/login';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firestore = getFirestore();

    try {
      if (user) {
        const userDoc = doc(firestore, 'users', user.uid, 'notes', formData.nomor);

        // Tambahkan field submittedAt dengan serverTimestamp
        await setDoc(userDoc, {
          ...formData,
          submittedAt: serverTimestamp()  // Menyimpan waktu server saat submit
        });

        setShowModal(true);

        setFormData((prevData) => ({
          ...prevData,
          nomorResi: '',
          tanggal: '',
          nama: '',
          namaBarang: '',
          jumlahBarang: '',
          alamat: '',
          ekspedisi: ''
        }));
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 fixed top-4 z-10 w-[90%] p-4 mx-auto bg-white/10 backdrop-blur-lg rounded-lg shadow-lg flex justify-between items-center">
  Form Input Data
</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-9 mb-16 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
       

        <div className="space-y-2">
          <label className="block text-sm mt-16 font-medium">Nomor:</label>
          <input
            type="text"
            name="nomor"
            value={formData.nomor}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            disabled
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Tanggal:</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nomor Resi:</label>
          <input
            type="text"
            name="nomorResi"
            value={formData.nomorResi}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nama:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nama Barang:</label>
          <input
            type="text"
            name="namaBarang"
            value={formData.namaBarang}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Jumlah Barang:</label>
          <input
            type="number"
            name="jumlahBarang"
            value={formData.jumlahBarang}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Alamat:</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Ekspedisi:</label>
          <input
            type="text"
            name="ekspedisi"
            value={formData.ekspedisi}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>

      {showModal && (
        <div className="fixed p-5 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Resi Berhasil!</h2>
            <p className="text-gray-600 mb-6">Data resimu akan selalu ada selama kamu tidak menghapusnya.</p>

            <div className="flex justify-center space-x-2">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
              >
                Tutup
              </button>

              <button
                onClick={() => (window.location.href = '/messages')}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Lihat Resi
              </button>
            </div>
          </div>
        </div>
      )}
      <Bottom />
    </div>
  );
}

export default Notes;
