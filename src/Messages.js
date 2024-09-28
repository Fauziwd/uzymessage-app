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
      filteredNotes = notes.filter((note) => note.submittedAt > new Date(now.setDate(now.getDate() - 7)));
      break;
    case '1month':
      filteredNotes = notes.filter((note) => note.submittedAt > new Date(now.setMonth(now.getMonth() - 1)));
      break;
    case '1year':
      filteredNotes = notes.filter((note) => note.submittedAt > new Date(now.setFullYear(now.getFullYear() - 1)));
      break;
    case 'custom':
      // Tambahkan logika untuk filter kustom
      break;
    default:
      filteredNotes = notes;
  }

  return filteredNotes;
}

function getTopBuyers(notes) {
  const buyers = {};

  notes.forEach((note) => {
    if (buyers[note.nama]) {
      buyers[note.nama] += note.jumlahBarang;
    } else {
      buyers[note.nama] = note.jumlahBarang;
    }
  });

  const sortedBuyers = Object.entries(buyers).sort((a, b) => b[1] - a[1]);
  return sortedBuyers.slice(0, 3); // Ambil 3 pembeli terbanyak
}

function Filter({ onFilterChange }) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <label htmlFor="filter">Filter: </label>
      <select id="filter" className="p-2 border rounded" onChange={handleFilterChange}>
        <option value="1week">Seminggu Terakhir</option>
        <option value="1month">Sebulan Terakhir</option>
        <option value="1year">Setahun Terakhir</option>
        <option value="custom">Kustom</option>
      </select>
    </div>
  );
}

function Messages() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesByDate, setNotesByDate] = useState({});
  const [loginDate, setLoginDate] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [filter, setFilter] = useState('1week');
  const [topBuyers, setTopBuyers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const notesCollection = collection(firestore, 'users', user.uid, 'notes');
          const notesSnapshot = await getDocs(notesCollection);

          if (notesSnapshot.empty) {
            setError('Kamu belum memulai.');
          } else {
            const notesList = notesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              submittedAt: doc.data().submittedAt ? doc.data().submittedAt.toDate() : null,
            }));

            const notesByDateObj = notesList.reduce((acc, note) => {
              const dateStr = note.submittedAt.toDateString();
              if (!acc[dateStr]) {
                acc[dateStr] = [];
              }
              acc[dateStr].push(note);
              return acc;
            }, {});

            setNotesData(notesList);
            setNotesByDate(notesByDateObj);

            setLoginDate(new Date('2023-01-01')); // contoh hardcoded
          }
        } catch (error) {
          setError('Error fetching notes.');
          console.error("Error fetching notes:", error);
        } finally {
          setLoading(false);
        }
      } else {
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filteredNotes = getFilteredNotes(notesData, filter);
    const top = getTopBuyers(filteredNotes);
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
            className="react-calendar" // Tambahkan kelas ini untuk styling kalender
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
                            className={`cursor-pointer ${activeNoteId === note.id ? 'bg-blue-300' : ''
                              }`}
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
                        Detail untuk Resi: {notesByDate[selectedDate.toDateString()]
                          ?.find((note) => note.id === activeNoteId)?.nomorResi}
                      </h3>
                      <table className="min-w-full bg-white border">
                        <tbody>
                          {notesByDate[selectedDate.toDateString()]
                            .filter((note) => note.id === activeNoteId)
                            .map((note) => (
                              <>
                                <tr key={note.id}>
                                  <td className="border px-4 py-2 font-semibold">Nama</td>
                                  <td className="border px-4 py-2">{note.nama}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">
                                    Nomor Resi
                                  </td>
                                  <td className="border px-4 py-2">{note.nomorResi}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">
                                    Nama Barang
                                  </td>
                                  <td className="border px-4 py-2">{note.namaBarang}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">
                                    Jumlah Barang
                                  </td>
                                  <td className="border px-4 py-2">{note.jumlahBarang}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">Alamat</td>
                                  <td className="border px-4 py-2">{note.alamat}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">
                                    Ekspedisi
                                  </td>
                                  <td className="border px-4 py-2">{note.ekspedisi}</td>
                                </tr>
                                <tr>
                                  <td className="border px-4 py-2 font-semibold">
                                    Waktu Submit
                                  </td>
                                  <td className="border px-4 py-2 text-gray-500">
                                    {note.submittedAt?.toLocaleString()}
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-5">
          <select id="filter" className="p-1 mb-2 bg-white/10 backdrop-blur-lg text-gray-800 rounded" onChange={(e) => setFilter(e.target.value)}>
            <option value="1week">Pekan ini</option>
            <option value="1month">Bulan ini</option>
            <option value="1year">Tahun ini</option>
          </select>
        </div>


        <div className=" bg-white">
          <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Pembeli Terbanyak</h1>

            {/* <Filter onFilterChange={setFilter} /> */}

            <div className="mt-4">
              {topBuyers.length > 0 ? (
                <ul>
                  {topBuyers.map(([buyer, jumlah], index) => (
                    <li key={index} className="mb-2">
                      <strong>{index + 1}. {buyer}</strong> - {jumlah} barang
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
      <Bottom />
    </>
  );
}

export default Messages;
