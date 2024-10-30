import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAQTSoCa_P9nofIHOuGkS5_HvW5p5zbR9Q",
  authDomain: "chordle-44664.firebaseapp.com",
  projectId: "chordle-44664",
  storageBucket: "chordle-44664.appspot.com",
  messagingSenderId: "88668067971",
  appId: "1:88668067971:web:7a12f57f845ad3323b23b6",
  measurementId: "G-WJGFYVFY5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);

// Export the app if needed elsewhere
export default app;
