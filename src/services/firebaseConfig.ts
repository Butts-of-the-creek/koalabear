import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD8JVEGF3uG6J8KUDcKAIxqbQp0i5BTMGI",
  authDomain: "koalabear-ca9ce.firebaseapp.com",
  projectId: "koalabear-ca9ce",
  storageBucket: "koalabear-ca9ce.firebasestorage.app",
  messagingSenderId: "511575098268",
  appId: "1:511575098268:web:e1beddbe75ed3f6e5bfe59",
  measurementId: "G-6G83ZC37YK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
