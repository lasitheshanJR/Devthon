import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADKrIPstHVjIzniCKvTHx1rGeaeEhEkSE",
  authDomain: "mybus-357cb.firebaseapp.com",
  projectId: "mybus-357cb",
  databaseURL: "https://mybus-357cb-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
