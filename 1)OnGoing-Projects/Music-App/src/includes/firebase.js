import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKixPHjBl0dRet5LP3YWbKJLQPt_UFvGs",
  authDomain: "music-app-88aaf.firebaseapp.com",
  projectId: "music-app-88aaf",
  storageBucket: "music-app-88aaf.appspot.com",
  // messagingSenderId: "759236057471",
  appId: "1:759236057471:web:c3ad7770313606188a224a",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");

export { auth, db, usersCollection, songsCollection, storage };
