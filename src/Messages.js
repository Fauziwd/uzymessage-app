import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Bottom from './Side/Bottom';
import './Messages.css'; // Pastikan CSS ter-import

function Messages() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesByDate, setNotesByDate] = useState({});
  const [loginDate, setLoginDate] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

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
        return `bg-opacity-${Math.floor(intensity * 100)} bg-green-500`;
      }
    }
    return '';
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 relative">
      <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Aktivitas Resi</h1>
        </div>

        {/* Kalender dengan event warna */}
        <Calendar
          tileClassName={getTileClassName}
          onClickDay={handleDateClick}
          minDate={loginDate}
          value={selectedDate}
        />

        {/* Modal untuk menampilkan daftar nomor resi */}
        {modalActive && (
          <div className="modal-overlay active flex justify-center items-center">
            <div
              className="modal-content active bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-semibold">
                  Notes pada {selectedDate.toDateString()}
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
                  <table className="table-auto w-full">
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
                          className={`cursor-pointer ${activeNoteId === note.id ? 'bg-blue-100' : ''
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
                  <p className="text-gray-600">Tidak ada notes pada tanggal ini</p>
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

      <div className="mt-8">
        <Bottom />
      </div>
    </div>
  );
}

export default Messages;
