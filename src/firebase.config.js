// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArs-SdV6eNy_q2CzNCGF9ld_Ud-eRfS8o",
  authDomain: "mysnippets-986d2.firebaseapp.com",
  projectId: "mysnippets-986d2",
  storageBucket: "mysnippets-986d2.firebasestorage.app",
  messagingSenderId: "460452006888",
  appId: "1:460452006888:web:2da17647e95e1572e4f25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);