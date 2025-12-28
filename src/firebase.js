import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBazDS5Tnewy0v8-DAnmYsjPXZ9IkMUtzw", 
  authDomain: "csam-281.firebaseapp.com",
  projectId: "csam-281",
  storageBucket: "csam-281.firebasestorage.app",
  messagingSenderId: "329320677006",
  appId: "1:329320677006:web:06a6eb4af8b1b8be1c13df",
  measurementId: "G-6F157RVB1H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();