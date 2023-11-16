// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-b-qg4zxIxvX-pOGIbgubojBcLjNqSzQ",
  authDomain: "inssagram-79518.firebaseapp.com",
  projectId: "inssagram-79518",
  storageBucket: "inssagram-79518.appspot.com",
  messagingSenderId: "903531383478",
  appId: "1:903531383478:web:72eeccfd6899f428cb7417",
  measurementId: "G-BV7JHREQKR"
};


const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);