import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBTVLOf-YzodXe_Ubykdkrx1Z_qCS-N6oI",
  authDomain: "chatty-98014.firebaseapp.com",
  projectId: "chatty-98014",
  storageBucket: "chatty-98014.appspot.com",
  messagingSenderId: "552851339866",
  appId: "1:552851339866:web:d0e1d08c604e2c3c817663",
  measurementId: "G-R3RYP01X15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()


// Create a root reference
export const storage = getStorage();

// creating firestore database
export const db = getFirestore()