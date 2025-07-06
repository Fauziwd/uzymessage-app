// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
// import { signInWithGoogle } from '../firebase'; 
// import background from '../svg/login.svg'; // Import background SVG
// import './login.css';

// function Login() {
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log('User is logged in:', user);
//         navigate('/home');
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, navigate]);

//   const handleLogin = async () => {
//     try {
//       const result = await signInWithGoogle();
//       console.log('Login successful:', result.user);

//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           console.log('User logged in after Google sign-in:', user);
//           navigate('/home');
//         }
//       });
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${background})`, // Set SVG as background
//         backgroundSize: 'cover', // Ensure background covers the entire screen
//         backgroundPosition: 'center', // Center the background image
//         backgroundAttachment: 'fixed', // Make the background fixed when scrolling
//       }}
//     >
//       <div className="p-8 max-w-md mx-auto bg-yellow rounded-lg">
//         {/* <h1 className="text-2xl font-bold mb-4 text-center text-yellow-300">Click Here!</h1> */}
//         <button
//           onClick={handleLogin}
//           className="w-full py-5 px-16 bg-white text-yellow-300 font-semibold rounded-lg hover:bg-white focus:outline-none"
//         >
//           Login
//         </button> 
//       </div>
//     </div>
//   );
// }

// export default Login;
