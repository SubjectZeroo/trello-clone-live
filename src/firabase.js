import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "trello-clone-live.firebaseapp.com",
  projectId: "trello-clone-live",
  storageBucket: "trello-clone-live.appspot.com",
  messagingSenderId: "320903083709",
  appId: "1:320903083709:web:a2830cde3d07b8698129d4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export{ auth, firebase, db }