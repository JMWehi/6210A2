// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzZYcdL1wCCwMt4Pc3nR4ip-aSwxmuHmc",
  authDomain: "scp-project-20592.firebaseapp.com",
  projectId: "scp-project-20592",
  storageBucket: "scp-project-20592.appspot.com",
  messagingSenderId: "310497836984",
  appId: "1:310497836984:web:38c5a3d4c905a925a3594d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);