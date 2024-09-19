import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { AiOutlineFileExclamation } from 'react-icons/ai';
import './Messages.css'; // Tambahkan CSS untuk animasi flip
import Bottom from './Side/Bottom';

function Messages() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null); // State untuk melacak kartu yang sedang dibalik
  const [selectedNote, setSelectedNote] = useState(null); // State untuk melacak note yang dipilih
  const [modalActive, setModalActive] = useState(false); // State untuk melacak modal

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
            setNotesData(notesList);
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

  const handleFlip = (note) => {
    setSelectedNote(note); // Set note yang diklik
    setModalActive(true); // Aktifkan modal
  };

  const closeModal = () => {
    setModalActive(false); // Tutup modal
  };

  const formatTime = (submittedAt) => {
    if (!submittedAt) return "-";
    const oneDay = 24 * 60 * 60 * 1000;
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const timeString = submittedAt.toLocaleTimeString([], timeOptions);

    // Cek jika sudah lebih dari satu hari, tampilkan juga tanggal
    if (now - submittedAt > oneDay) {
      const dateString = submittedAt.toLocaleDateString();
      return `${dateString} ${timeString}`;
    }

    // Jika masih hari yang sama, tampilkan hanya jam dan menit
    return timeString;
  };



  if (error || notesData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <AiOutlineFileExclamation size={50} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Data Not Found</h1>
        <p className="text-gray-500 mb-6">Kamu belum melakukan submit resi disini</p>
        <button
          onClick={() => window.location.href = '/notes'}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Catat resimu disini
        </button>
      </div>
    );
  }

  const todayNotes = notesData.filter(note => note.submittedAt?.toDateString() === new Date().toDateString());
  const otherNotes = notesData.filter(note => note.submittedAt?.toDateString() !== new Date().toDateString());

  return (
    <div className="min-h-screen p-4 bg-gray-100 relative">
      {/* Modal Overlay */}
      <div className={`modal-overlay ${modalActive ? 'active' : ''}`} onClick={closeModal}></div>

      {/* Modal Content */}
      {selectedNote && (
        <div className={`modal-content ${modalActive ? 'active' : ''}`}>
          <div className="modal-header">
            <h2>Detail Resi</h2>
            <span className="modal-close" onClick={closeModal}>&times;</span>
          </div>
          <div className="modal-body">
            <p><strong>Nama:</strong> {selectedNote.nama}</p>
            <p><strong>Nomor Resi:</strong> {selectedNote.nomorResi}</p>
            <p><strong>Nama Barang:</strong> {selectedNote.namaBarang}</p>
            <p><strong>Jumlah Barang:</strong> {selectedNote.jumlahBarang}</p>
            <p><strong>Alamat:</strong> {selectedNote.alamat}</p>
            <p><strong>Ekspedisi:</strong> {selectedNote.ekspedisi}</p>
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {formatTime(selectedNote.submittedAt)}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl p-3 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Daftar Resimu</h1>
          <button
            onClick={() => window.location.href = '/notes'}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Tambah Resi
          </button>
        </div>

        {/* Notes Section */}
        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-15 text-center">
          {notesData.map((note) => (
            <div
              key={note.id}
              className={`flip-card w-16 h-16`}
              onClick={() => handleFlip(note)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front p-2 bg-gray-200 border-2 border-gray-700 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold"> {note.nomor}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div>
        {/* Pindahkan Bottom di luar elemen grid */}
        <Bottom />
      </div>
    </div>
  );
}

export default Messages;
