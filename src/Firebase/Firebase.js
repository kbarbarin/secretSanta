// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsfZDvIxmovoNCOGo9jC-YygkXp2xdEBA',
  authDomain: 'test-cd8cd.firebaseapp.com',
  projectId: 'test-cd8cd',
  storageBucket: 'test-cd8cd.appspot.com',
  messagingSenderId: '193468267476',
  appId: '1:193468267476:web:be9ab0da41752a8e80b441',
  measurementId: 'G-34TB8P30YE',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
