// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "nexmov-ai-9cry5",
  "appId": "1:1067849903497:web:c64d6cd9195f568fcf4558",
  "storageBucket": "nexmov-ai-9cry5.firebasestorage.app",
  "apiKey": "AIzaSyCVdz2rz2OxIMAbGdEL_0czaKd9ITqQkVk",
  "authDomain": "nexmov-ai-9cry5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1067849903497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
