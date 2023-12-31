import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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