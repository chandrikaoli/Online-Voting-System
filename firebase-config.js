import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDdXloyw9kW35xZeyZhNLvJCGy8qCyntoU",
  authDomain: "online-voting-system-9278c.firebaseapp.com",
  projectId: "online-voting-system-9278c",
  storageBucket: "online-voting-system-9278c.firebasestorage.app",
  messagingSenderId: "398423795736",
  appId: "1:398423795736:web:b5603072e8df181df4bb6d",
  measurementId: "G-MK7PLSLLZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app); 