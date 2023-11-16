// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpntfgmqnwJ5JN-fuRDdVYR0Shh6fsMcA",
  authDomain: "secretsanta-c60ad.firebaseapp.com",
  projectId: "secretsanta-c60ad",
  storageBucket: "secretsanta-c60ad.appspot.com",
  messagingSenderId: "132354840782",
  appId: "1:132354840782:web:ae828ed1f70ca1bbdbd89f",
  measurementId: "G-LLE4560RKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };