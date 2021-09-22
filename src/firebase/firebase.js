import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsvOdGm_WPYruNfo3wUSouT8dv7wqoq6s",
  authDomain: "slack-clone-e5264.firebaseapp.com",
  projectId: "slack-clone-e5264",
  storageBucket: "slack-clone-e5264.appspot.com",
  messagingSenderId: "492418704359",
  appId: "1:492418704359:web:ceffbb481264164001d342",
  measurementId: "G-381FR9MF5W"
};
  
  // Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);



