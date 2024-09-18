import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth'; // Firebase Authentication
import { useNavigate } from 'react-router-dom'; // Untuk navigasi setelah logout

function ProfilePage() {
    const [user, setUser] = useState(null); // Menyimpan data pengguna
    const auth = getAuth();
    const navigate = useNavigate();

    // Mengambil informasi pengguna saat halaman dimuat
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user); // Menyimpan data pengguna
            } else {
                navigate('/login'); // Redirect ke halaman login jika tidak ada user
            }
        });

        return () => unsubscribe(); // Bersihkan listener
    }, [auth, navigate]);

    // Fungsi untuk logout
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login'); // Setelah logout, kembali ke halaman login
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
                <div className="flex flex-col items-center">
                    {/* Foto profil */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/150'} // Menampilkan foto pengguna jika ada
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Nama user */}
                    <h2 className="text-xl font-semibold mb-2">{user?.displayName || 'User Name'}</h2>
                    <p className="text-gray-500 mb-6">{user?.email || 'User Email'}</p>

                    {/* Informasi kartu (dummy data) */}
                    <div className="w-full bg-blue-500 text-white rounded-xl p-4 mb-4 shadow-md">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-bold">$2,349</p>
                                <p className="text-sm">Balance</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">18</p>
                                <p className="text-sm">Transactions</p>
                            </div>
                        </div>
                    </div>

                    {/* Pengaturan akun (dummy link) */}
                    <div className="w-full">
                        <button className="w-full bg-gray-200 text-gray-700 rounded-lg p-3 mb-2">
                            Profile Settings
                        </button>
                        <button className="w-full bg-gray-200 text-gray-700 rounded-lg p-3 mb-2">
                            Change Password
                        </button>
                        <button className="w-full bg-gray-200 text-gray-700 rounded-lg p-3 mb-2">
                            Transaction History
                        </button>
                    </div>

                    {/* Tombol logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-red-500 text-white rounded-lg p-3">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
