import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set, onValue, remove } from "firebase/database"; // Correctly import the necessary functions

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAnZu08uSA2EXwkUyd_1hF2Lqxk4uxQ_9s",
  authDomain: "newhealth-b3603.firebaseapp.com",
  databaseURL: "https://newhealth-b3603-default-rtdb.firebaseio.com",
  projectId: "newhealth-b3603",
  storageBucket: "newhealth-b3603.firebasestorage.app",
  messagingSenderId: "978834053140",
  appId: "1:978834053140:web:c6f2fdf2c4f977a7cbaf01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth, db, ref, set, onValue, remove };
