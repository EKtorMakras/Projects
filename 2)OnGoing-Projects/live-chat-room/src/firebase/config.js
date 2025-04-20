import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcQ9L1MXEM_kAeZg1RsLjP7vqaMMVpwHs",
  authDomain: "fir-testing-5515d.firebaseapp.com",
  projectId: "fir-testing-5515d",
  storageBucket: "fir-testing-5515d.appspot.com",
  messagingSenderId: "591448584733",
  appId: "1:591448584733:web:054f0799d14a92bffc8cf4",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };
