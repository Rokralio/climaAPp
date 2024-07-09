import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC-AYt189nExXqTXuhfd5j_LHYWYGyokck",
  authDomain: "climaapp-691e2.firebaseapp.com",
  projectId: "climaapp-691e2",
  storageBucket: "climaapp-691e2.appspot.com",
  messagingSenderId: "69112231918",
  appId: "1:69112231918:web:b5ee31898c54e405f9c0ff"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
