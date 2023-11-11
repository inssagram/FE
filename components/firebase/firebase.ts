// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithCustomToken } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC-b-qg4zxIxvX-pOGIbgubojBcLjNqSzQ",
  authDomain: "inssagram-79518.firebaseapp.com",
  projectId: "inssagram-79518",
  storageBucket: "inssagram-79518.appspot.com",
  messagingSenderId: "903531383478",
  appId: "1:903531383478:web:72eeccfd6899f428cb7417",
  measurementId: "G-BV7JHREQKR"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)