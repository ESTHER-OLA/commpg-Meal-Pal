import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfsD8SsrOLSBiq9yVOTU0qDcdRBu9Btdk",
  authDomain: "comm-page.firebaseapp.com",
  projectId: "comm-page",
  storageBucket: "comm-page.appspot.com",
  messagingSenderId: "414972275369",
  appId: "1:414972275369:web:b31884bdd3a24bd060d7b8",
  measurementId: "G-509BDXRSGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db, onAuthStateChanged };
