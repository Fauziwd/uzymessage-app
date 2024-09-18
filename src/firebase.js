import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIOLu-q920_bXB9d91hLBmbrVM4XipBBU",
  authDomain: "uzymessage.firebaseapp.com",
  databaseURL: "https://uzymessage-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uzymessage",
  storageBucket: "uzymessage.appspot.com",
  messagingSenderId: "465519723556",
  appId: "1:465519723556:web:f7869d632abb5ce9bf04b1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// Pastikan fungsi ini mengembalikan promise
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User signed in:', result.user);
      return result.user; // Mengembalikan user setelah berhasil login
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
      throw error; // Menangani error dengan baik
    });
};

export { auth, db, signInWithGoogle };
