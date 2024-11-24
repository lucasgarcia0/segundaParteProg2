// Import the functions you need from the SDKs you need

import app from 'firebase/app'
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU9yLrvA1O70891ruwMne-irVHrbGEkZM",
  authDomain: "segundaparteintegradorprog3.firebaseapp.com",
  projectId: "segundaparteintegradorprog3",
  storageBucket: "segundaparteintegradorprog3.firebasestorage.app",
  messagingSenderId: "1026449011256",
  appId: "1:1026449011256:web:123cb7781a0a18453f6ccd"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
