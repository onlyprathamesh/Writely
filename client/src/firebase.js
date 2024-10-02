import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "writely-blog-app.firebaseapp.com",
  projectId: "writely-blog-app",
  storageBucket: "writely-blog-app.appspot.com",
  messagingSenderId: "1020587345597",
  appId: "1:1020587345597:web:860257c34f253aa29a59d4"
};

export const app = initializeApp(firebaseConfig);