import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Bottom from './Side/Bottom';
import './Messages.css'; // Import CSS untuk modal dan kalender

function Messages() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesByDate, setNotesByDate] = useState({});
  const [loginDate, setLoginDate] = useState(null); // Tanggal login pertama
  const [modalActive, setModalActive] = useState(false); // State untuk modal
  const [activeNoteId, setActiveNoteId] = useState(null); // State untuk menyimpan nomor resi yang diklik

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

            // Membuat object notes berdasarkan tanggal
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

            // Simpan tanggal login pertama (misal diambil dari user profile atau firestore)
            setLoginDate(new Date('2023-01-01')); // contoh hardcoded, ganti dengan data dari Firestore
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
    setModalActive(true); // Aktifkan modal ketika tanggal diklik
    setActiveNoteId(null); // Reset state saat tanggal baru dipilih
  };

  const closeModal = () => {
    setModalActive(false); // Tutup modal
  };

  const toggleNoteDetails = (noteId) => {
    // Jika note yang sedang dibuka sudah aktif, klik lagi untuk menutupnya
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    } else {
      setActiveNoteId(noteId); // Set note aktif untuk menampilkan detail
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      const notesCount = notesByDate[dateStr] ? notesByDate[dateStr].length : 0;

      if (notesCount > 0) {
        // Hitung intensitas warna hijau berdasarkan jumlah notes
        const intensity = Math.min(notesCount * 0.2, 1); // Semakin banyak notes, semakin hijau
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
  <div className="modal-overlay active" onClick={closeModal}>
    <div className="modal-content active" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Notes pada {selectedDate.toDateString()}</h2>
        <span className="modal-close" onClick={closeModal}>&times;</span>
      </div>
      <div className="modal-body">
        {notesByDate[selectedDate.toDateString()]?.length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {notesByDate[selectedDate.toDateString()].map((note) => (
              <li key={note.id} className="text-lg">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => toggleNoteDetails(note.id)}
                >
                  {note.namaBarang} - Resi: {note.nomorResi}
                </button>
                {/* Tampilkan detail note jika resi ini diklik */}
                {activeNoteId === note.id && (
                  <div className="mt-2 ml-4">
                    <table className="min-w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2"><strong>Nama:</strong></td>
                          <td className="border px-4 py-2">{note.nama}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Nomor Resi:</strong></td>
                          <td className="border px-4 py-2">{note.nomorResi}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Nama Barang:</strong></td>
                          <td className="border px-4 py-2">{note.namaBarang}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Jumlah Barang:</strong></td>
                          <td className="border px-4 py-2">{note.jumlahBarang}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Alamat:</strong></td>
                          <td className="border px-4 py-2">{note.alamat}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Ekspedisi:</strong></td>
                          <td className="border px-4 py-2">{note.ekspedisi}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2"><strong>Waktu Submit:</strong></td>
                          <td className="border px-4 py-2 text-gray-500">{note.submittedAt?.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada notes pada tanggal ini</p>
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
