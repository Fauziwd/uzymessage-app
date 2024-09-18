import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import auth dari Firebase
import { signInWithGoogle } from '../firebase'; // Impor signInWithGoogle

function Login() {
  const navigate = useNavigate();
  const auth = getAuth(); // Inisialisasi Firebase Auth

  useEffect(() => {
    // Cek status login ketika komponen di-mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user);
        navigate('/notes'); // Redirect ke halaman /notes jika user sudah login
      }
    });

    return () => unsubscribe(); // Cleanup subscription saat komponen unmount
  }, [auth, navigate]);

  const handleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log('Login successful:', result.user);
        navigate('/notes'); // Redirect ke halaman /notes setelah login berhasil
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Login with Google</h1>
        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
