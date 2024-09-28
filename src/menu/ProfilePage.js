import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom'; 
import Bottom from '../Side/Bottom';

function ProfilePage() {
    const [user, setUser] = useState(null); 
    const [totalResi, setTotalResi] = useState(0); 
    const [totalBarangTerjual, setTotalBarangTerjual] = useState(0); 
    const auth = getAuth();
    const firestore = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                // Ambil data resi dari Firestore
                try {
                    const notesCollection = collection(firestore, 'users', user.uid, 'notes');
                    const notesSnapshot = await getDocs(notesCollection);

                    if (!notesSnapshot.empty) {
                        const notesList = notesSnapshot.docs.map(doc => doc.data());
                        
                        // Hitung jumlah resi dan total barang yang terjual
                        setTotalResi(notesList.length); // Jumlah resi
                        const totalBarang = notesList.reduce((total, note) => total + parseInt(note.jumlahBarang, 10), 0);

                        setTotalBarangTerjual(totalBarang); // Total barang terjual
                    }
                } catch (error) {
                    console.error('Error fetching notes:', error);
                }
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, firestore, navigate]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-5">
            <div className="bg-gradient-to-b from-purple-100 to-white h-full max-h-md w-full max-w-md rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center">
                    {/* Foto profil */}
                    <div className="relative shadow-lg w-28 h-28 rounded-full overflow-hidden mb-4">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Nama user */}
                    <h2 className="text-2xl font-bold text-purple-700 mb-2">{user?.displayName || 'User Name'}</h2>
                    <p className="text-gray-500 mb-6">{user?.email || 'User Email'}</p>

                    {/* Informasi resi dan barang terjual */}
                    <div className="w-full bg-purple-200 text-purple-900 rounded-xl p-4 mb-6 shadow-md">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-2xl font-extrabold">{totalBarangTerjual}</p>
                                <p className="text-sm font-medium">Barang Terjual</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold">{totalResi}</p>
                                <p className="text-sm font-medium">Resi Dimasukkan</p>
                            </div>
                        </div>
                    </div>

                    {/* Pengaturan akun */}
                    <div className="w-full space-y-3">
                        <button className="w-full bg-purple-50 text-purple-600 rounded-lg p-3 shadow-sm transition-all">
                            Profile Settings
                        </button>
                        <button className="w-full bg-purple-50 text-purple-600 rounded-lg p-3 shadow-sm transition-all">
                            Change Password
                        </button>
                        <button className="w-full bg-purple-50 text-purple-600 rounded-lg p-3 shadow-sm transition-all">
                            Transaction History
                        </button>
                    </div>

                    {/* Tombol logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-8 w-full bg-red-500 text-white rounded-lg p-3 shadow-lg transition-transform transform hover:scale-105">
                        Logout
                    </button>
                </div>
            </div>
            <Bottom />
        </div>
    );
}

export default ProfilePage;


// TAMPILAN KALO PAKE CSS YAA ADICK-ADICK

// import React, { useEffect, useState } from 'react';
// import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'; 
// import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
// import { useNavigate } from 'react-router-dom'; 
// import Bottom from '../Side/Bottom';
// import './ProfilePage.css';  // Import file CSS

// function ProfilePage() {
//     const [user, setUser] = useState(null); 
//     const [totalResi, setTotalResi] = useState(0); 
//     const [totalBarangTerjual, setTotalBarangTerjual] = useState(0); 
//     const auth = getAuth();
//     const firestore = getFirestore();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 setUser(user);

//                 // Ambil data resi dari Firestore
//                 try {
//                     const notesCollection = collection(firestore, 'users', user.uid, 'notes');
//                     const notesSnapshot = await getDocs(notesCollection);

//                     if (!notesSnapshot.empty) {
//                         const notesList = notesSnapshot.docs.map(doc => doc.data());
                        
//                         // Hitung jumlah resi dan total barang yang terjual
//                         setTotalResi(notesList.length); // Jumlah resi
//                         const totalBarang = notesList.reduce((total, note) => total + parseInt(note.jumlahBarang, 10), 0);

//                         setTotalBarangTerjual(totalBarang); // Total barang terjual
//                     }
//                 } catch (error) {
//                     console.error('Error fetching notes:', error);
//                 }
//             } else {
//                 navigate('/login');
//             }
//         });

//         return () => unsubscribe();
//     }, [auth, firestore, navigate]);

//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 navigate('/login');
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <div className="flex flex-col items-center">
//                     {/* Foto profil */}
//                     <div className="profile-photo">
//                         <img
//                             src={user?.photoURL || 'https://via.placeholder.com/150'}
//                             alt="Profile"
//                         />
//                     </div>

//                     {/* Nama user */}
//                     <h2 className="profile-name">{user?.displayName || 'User Name'}</h2>
//                     <p className="profile-email">{user?.email || 'User Email'}</p>

//                     {/* Informasi resi dan barang terjual */}
//                     <div className="info-box">
//                         <div>
//                             <p>{totalBarangTerjual}</p>
//                             <p>Barang Terjual</p>
//                         </div>
//                         <div>
//                             <p>{totalResi}</p>
//                             <p>Resi Dimasukkan</p>
//                         </div>
//                     </div>

//                     {/* Pengaturan akun */}
//                     <button className="profile-button">Profile Settings</button>
//                     <button className="profile-button">Change Password</button>
//                     <button className="profile-button">Transaction History</button>

//                     {/* Tombol logout */}
//                     <button
//                         onClick={handleLogout}
//                         className="logout-button"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//             <Bottom />
//         </div>
//     );
// }

// export default ProfilePage;
