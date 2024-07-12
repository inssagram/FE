// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from "firebase/storage";




const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
