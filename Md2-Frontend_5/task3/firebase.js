import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "process.env.API_KEY",
  authDomain: "todo-list-c8fb2.firebaseapp.com",
  databaseURL:
    "https://todo-list-c8fb2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-c8fb2",
  storageBucket: "todo-list-c8fb2.firebasestorage.app",
  messagingSenderId: "644115665594",
  appId: "1:644115665594:web:253c4915ee7d3b2f67a883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
