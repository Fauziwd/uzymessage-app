import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
  const [loginDate, setLoginDate] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]); // State untuk resi yang dipilih
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // Modal konfirmasi

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
            setLoginDate(new Date('2023-01-01')); // Contoh tanggal login pertama
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

  const toggleSelectNote = (noteId) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId]
    );
  };

  const handleDeleteNote = async (noteId) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteDoc(doc(firestore, 'users', user.uid, 'notes', noteId));
        setNotesData((prev) => prev.filter((note) => note.id !== noteId));
        const dateStr = selectedDate.toDateString();
        setNotesByDate((prev) => ({
          ...prev,
          [dateStr]: prev[dateStr].filter((note) => note.id !== noteId),
        }));
        setActiveNoteId(null);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleBatchDelete = async () => {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        for (const noteId of selectedNotes) {
          await deleteDoc(doc(firestore, 'users', user.uid, 'notes', noteId));
        }
        setNotesData((prev) => prev.filter((note) => !selectedNotes.includes(note.id)));
        const dateStr = selectedDate.toDateString();
        setNotesByDate((prev) => ({
          ...prev,
          [dateStr]: prev[dateStr].filter((note) => !selectedNotes.includes(note.id)),
        }));
        setSelectedNotes([]);
        closeConfirmDeleteModal();
      } catch (error) {
        console.error("Error deleting notes:", error);
      }
    }
  };

  const openConfirmDeleteModal = () => setConfirmDeleteModal(true);
  const closeConfirmDeleteModal = () => setConfirmDeleteModal(false);

  return (
    <div className="min-h-screen p-4 bg-gray-100 relative">
      <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Aktivitas Resi</h1>
        </div>

        <Calendar
          tileClassName={getTileClassName}
          onClickDay={handleDateClick}
          minDate={loginDate}
          value={selectedDate}
        />

        {modalActive && (
          <div className="modal-overlay active flex justify-center items-center">
            <div
              className="modal-content active bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-semibold">Notes pada {selectedDate.toDateString()}</h2>
                <span className="modal-close cursor-pointer text-2xl" onClick={closeModal}>
                  &times;
                </span>
              </div>
              <div className="modal-body overflow-y-auto max-h-80">
                {notesByDate[selectedDate.toDateString()]?.length > 0 ? (
                  <div>
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2">Nama</th>
                          <th className="px-4 py-2">Nomor Resi</th>
                          <th className="px-4 py-2">Pilih</th>
                          <th className="px-4 py-2">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notesByDate[selectedDate.toDateString()].map((note) => (
                          <tr key={note.id} className={`cursor-pointer ${activeNoteId === note.id ? 'bg-blue-100' : ''}`}>
                            <td className="border px-4 py-2">{note.nama}</td>
                            <td className="border px-4 py-2">{note.nomorResi}</td>
                            <td className="border px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={selectedNotes.includes(note.id)}
                                onChange={() => toggleSelectNote(note.id)}
                              />
                            </td>
                            <td className="border px-4 py-2 text-center">
                              <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => handleDeleteNote(note.id)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                      onClick={openConfirmDeleteModal}
                      disabled={selectedNotes.length === 0}
                    >
                      Hapus Resi Terpilih
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600">Tidak ada notes pada tanggal ini</p>
                )}
              </div>
            </div>
          </div>
        )}

        {confirmDeleteModal && (
          <div className="modal-overlay active flex justify-center items-center">
            <div className="modal-content active bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-semibold">Konfirmasi Penghapusan</h2>
                <span className="modal-close cursor-pointer text-2xl" onClick={closeConfirmDeleteModal}>
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <p>Apakah kamu yakin ingin menghapus resi yang dipilih?</p>
              </div>
              <div className="modal-footer flex justify-end space-x-4 mt-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={closeConfirmDeleteModal}
                >
                  Batal
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleBatchDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        <Bottom />
      </div>
    </div>
  );
}

export default Messages;
