import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuhNTE-oAYZuGUFP_69gqqR7n9VC4Weqo",
  authDomain: "re-events-5a5c7.firebaseapp.com",
  projectId: "re-events-5a5c7",
  storageBucket: "re-events-5a5c7.appspot.com",
  messagingSenderId: "126882871553",
  appId: "1:126882871553:web:b8130c64d48c2904c34300",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
