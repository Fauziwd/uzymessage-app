import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Bottom from './Side/Bottom';
import './Messages.css'; // Pastikan CSS ter-import



function getFilteredNotes(notes, filter) {
  const now = new Date();
  let filteredNotes = [];

  switch (filter) {
    case '1week':
      filteredNotes = notes.filter((note) => note.submittedAt.toDate() >= new Date(now.setDate(now.getDate() - 7)));
      break;
    case '1month':
      filteredNotes = notes.filter((note) => note.submittedAt.toDate() >= new Date(now.setMonth(now.getMonth() - 1)));
      break;
    case '1year':
      filteredNotes = notes.filter((note) => note.submittedAt.toDate() >= new Date(now.setFullYear(now.getFullYear() - 1)));
      break;
    default:
      filteredNotes = notes;
  }

  return filteredNotes;
}

function getTopBuyers(notes) {
  const buyers = {};

  notes.forEach((note) => {
    const jumlahBarang = Number(note.jumlahBarang); // Konversi jumlahBarang ke tipe number
    if (buyers[note.nama]) {
      buyers[note.nama] += jumlahBarang; // Pastikan penjumlahan dilakukan sebagai number
    } else {
      buyers[note.nama] = jumlahBarang;
    }
  });

  const sortedBuyers = Object.entries(buyers).sort((a, b) => b[1] - a[1]);
  return sortedBuyers.slice(0, 3); // Ambil 3 pembeli terbanyak
}


function Filter({ onFilterChange, notesByDate }) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString(); // Ubah date menjadi string
      const notesOnDate = notesByDate[dateStr]; // Ambil data notes berdasarkan tanggal
      
      if (notesOnDate && notesOnDate.length > 0) {
        // Jika ada catatan pada tanggal tersebut, beri warna sesuai jumlah catatan
        const intensity = Math.min(notesOnDate.length * 0.2, 1); // Sesuaikan intensitas warna
        return `highlighted bg-opacity-${Math.floor(intensity * 100)} bg-green-300`; // Ubah warna menjadi hijau
      }
    }
    return ''; // Tanggal tanpa catatan tetap tampil tanpa warna
  };  

  return (
    <div className="flex justify-between items-center mb-4">

      <select id="filter" className="p-2 w-72 rounded-t-xl" onChange={handleFilterChange}>
        <option value="1week">Pekan ini</option>
        <option value="1month">Bulan ini</option>
        <option value="1year">Tahun ini</option>
      </select>
    </div>
  );
}


function Messages() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesByDate, setNotesByDate] = useState({}); // Tambahkan ini
  const [loginDate, setLoginDate] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [filter, setFilter] = useState('1week');
  const [topBuyers, setTopBuyers] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [activeBuyer, setActiveBuyer] = useState(null); // Menyimpan buyer yang aktif untuk modal
  const notesByBuyer = notesData.filter(note => note.nama === activeBuyer);
  const [showBuyerModal, setShowBuyerModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Ambil data notes
          const notesCollection = collection(firestore, 'users', user.uid, 'notes');
          const notesSnapshot = await getDocs(notesCollection);
          
          const itemsCollection = collection(firestore, 'users', user.uid, 'items');
          const itemsSnapshot = await getDocs(itemsCollection);
          
          // Map items ke dalam objek berdasarkan itemId
          const itemsMap = {};
          itemsSnapshot.forEach((doc) => {
            itemsMap[doc.id] = doc.data().hargaBarang; // Asumsi field harga ada di sini
          });
  
          if (!notesSnapshot.empty) {
            const notesList = notesSnapshot.docs.map((doc) => {
              const note = doc.data();
              const hargaBarang = itemsMap[note.itemId]; // Ambil harga satuan dari items berdasarkan itemId
              const totalHarga = hargaBarang * note.jumlahBarang; // Hitung total harga
  
              return {
                id: doc.id,
                ...note,
                hargaBarang,
                totalHarga, // Simpan total harga ke dalam note
              };
            });
  
            setNotesData(notesList); // Simpan data notes yang telah diperbarui ke state
          }
        } catch (error) {
          console.error('Error fetching notes and items:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const filteredNotes = getFilteredNotes(notesData, filter); // Terapkan filter
    const top = getTopBuyers(filteredNotes); // Dapatkan pembeli terbanyak berdasarkan filter
    setTopBuyers(top);
  }, [notesData, filter]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalActive(true);
    setActiveNoteId(null);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const toggleNoteDetails = (noteId) => {
    setActiveNoteId(activeNoteId === noteId ? null : noteId);
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      const notesCount = notesByDate[dateStr] ? notesByDate[dateStr].length : 0;

      if (notesCount > 0) {
        const intensity = Math.min(notesCount * 0.2, 1);
        return `bg-opacity-${Math.floor(intensity * 100)} bg-pink-300`;
      }
    }
    return '';
  };

  const toggleBuyerDetails = (buyer) => {
    setActiveBuyer(activeBuyer === buyer ? null : buyer); // Toggling aktif/inaktif
  };

  useEffect(() => {
    if (notesData.length > 0) {
      const notesByDateMap = {};

      notesData.forEach((note) => {
        // Pastikan konversi tanggal ke string yang konsisten
        const dateStr = note.submittedAt.toDate().toDateString(); // Ubah ke string tanggal yang konsisten
        if (!notesByDateMap[dateStr]) {
          notesByDateMap[dateStr] = [];
        }
        notesByDateMap[dateStr].push(note);
      });

      setNotesByDate(notesByDateMap);
    }
  }, [notesData]);

  // Fungsi untuk menampilkan modal buyer details
  const openBuyerModal = (buyer) => {
    setActiveBuyer(buyer);
    setShowBuyerModal(true); // Aktifkan modal
  };

  const closeBuyerModal = () => {
    setShowBuyerModal(false); // Nonaktifkan modal
    setActiveBuyer(null); // Reset buyer
  };

  return (
    <>
      <div className="min-h-screen p-4 bg-white relative">
        <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Arsip Resi</h1>
          </div>

          <Calendar
            tileClassName={getTileClassName}
            onClickDay={handleDateClick}
            minDate={loginDate}
            value={selectedDate}
            className="react-calendar"
          />

          {modalActive && (
            <div className="modal-overlay active flex justify-center items-center">
              <div
                className="modal-content active bg-white p-6 rounded-lg w-11/12 max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
                  <h2 className="text-xl font-semibold">
                    <mark>{selectedDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</mark>
                  </h2>
                  <span
                    className="modal-close cursor-pointer text-2xl"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                </div>

                <div className="modal-body overflow-y-auto max-h-80">
                  {notesByDate[selectedDate.toDateString()]?.length > 0 ? (
                    <table className="table-auto w-full h-32">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2">Nama</th>
                          <th className="px-4 py-2">Nomor Resi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notesByDate[selectedDate.toDateString()].map((note) => (
                          <tr
                            key={note.id}
                            className={`cursor-pointer ${activeNoteId === note.id ? 'bg-purple-200' : ''}`}
                            onClick={() => toggleNoteDetails(note.id)}
                          >
                            <td className="border px-4 py-2">{note.nama}</td>
                            <td className="border px-4 py-2">{note.nomorResi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600">Tidak ada aktivitas pada hari ini.</p>
                  )}

                  {activeNoteId && (
                    <div className="mt-4 detail-container">
                      <h3 className="text-lg font-semibold mb-2">
                        Detail untuk Resi: {notesByDate[selectedDate.toDateString()]?.find((note) => note.id === activeNoteId)?.nomorResi}
                      </h3>
                      <table className="min-w-full bg-white border">
                        <tbody>
                          {notesByDate[selectedDate.toDateString()]
                            .filter((note) => note.id === activeNoteId)
                            .map((note) => {
                              const matchedItem = itemsData.find((item) => item.namaBarang === note.namaBarang);

                              return (
                                <React.Fragment key={note.id}>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Nama</td>
                                    <td className="border px-4 py-2">{note.nama}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Nomor Resi</td>
                                    <td className="border px-4 py-2">{note.nomorResi}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Nama Barang</td>
                                    <td className="border px-4 py-2">{note.namaBarang}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Jumlah Barang</td>
                                    <td className="border px-4 py-2">{note.jumlahBarang}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Harga Satuan</td>
                                    <td className="border px-4 py-2">{matchedItem ? matchedItem.hargaBarang : 'Harga tidak ditemukan'}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Alamat</td>
                                    <td className="border px-4 py-2">{note.alamat}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Ekspedisi</td>
                                    <td className="border px-4 py-2">{note.ekspedisi}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-4 py-2 font-semibold">Total Brutto</td>
                                    <td className="border px-4 py-2 bg-pink-300">
                                      {matchedItem ? parseInt(matchedItem.hargaBarang, 10) * parseInt(note.jumlahBarang, 10) : 'N/A'}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Top Buyer */}
        <div className="bg-white">
          <div className="max-w-6xl p-2 mx-auto bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Top Buyer</h1>

            <Filter onFilterChange={setFilter} notesByDate={notesByDate} />

            <div className="mt-4 mb-12">
              {topBuyers.length > 0 ? (
                <ul>
                  {topBuyers.map(([buyer, jumlah], index) => (
                    <li key={index} className="mb-2">
                      <div
                        className="cursor-pointer font-semibold"
                        onClick={() => openBuyerModal(buyer)}
                      >
                        {index + 1}. {buyer} - {jumlah} barang
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada pembelian pada periode ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk Detail Pembelian */}
      {showBuyerModal && (
  <div className="modal-overlay active flex justify-center items-center">
    <div
      className="modal-content active bg-white p-6 rounded-lg w-11/12 max-w-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-semibold">Detail Pembelian {activeBuyer}</h2>
        <span className="modal-close cursor-pointer text-2xl" onClick={closeBuyerModal}>
          &times;
        </span>
      </div>

      <div className="modal-body overflow-y-auto max-h-80">
        <table className="table-auto w-full shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Barang</th>
              <th className="px-4 py-2">Jumlah Barang</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Ekspedisi</th>
            </tr>
          </thead>
          <tbody>
            {notesByBuyer.map((note) => (
              <tr key={note.id}>
                <td className="border px-4 py-2">{note.tanggal}</td>
                <td className="border px-4 py-2">{note.namaBarang}</td>
                <td className="border px-4 py-2">{note.jumlahBarang}</td>
                <td className="border px-4 py-2">{note.alamat}</td>
                <td className="border px-4 py-2">{note.ekspedisi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default Messages;
