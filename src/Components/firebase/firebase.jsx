import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCABCQKTzpiMf062e9HNZkLGNG_dQ07WIg",
  authDomain: "commpg-meal-pal.firebaseapp.com",
  projectId: "commpg-meal-pal",
  storageBucket: "commpg-meal-pal.appspot.com",
  messagingSenderId: "840570684646",
  appId: "1:840570684646:web:af792873b453b118002727",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
