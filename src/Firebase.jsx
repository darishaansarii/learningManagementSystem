import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs9OMRvGZ_2qY_FYyjKuNtLdSX4vrIRG8",
  authDomain: "latestpractice-3c4be.firebaseapp.com",
  databaseURL: "https://latestpractice-3c4be-default-rtdb.firebaseio.com",
  projectId: "latestpractice-3c4be",
  storageBucket: "latestpractice-3c4be.firebasestorage.app",
  messagingSenderId: "631062491847",
  appId: "1:631062491847:web:7446b317a22630c6ee44e2",
  measurementId: "G-35RWM5Q95L",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);