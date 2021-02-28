
import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

const config = {
  apiKey: "AIzaSyDshtVAuVxMEb1CKhBAaHfQCVdLyCWjQAM",
  authDomain: "solvert.firebaseapp.com",
  projectId: "solvert",
  storageBucket: "solvert.appspot.com",
  messagingSenderId: "291677259136",
  appId: "1:291677259136:web:3bf2d67874def8f219ad65",
  measurementId: "G-QBEHX2PZ1C"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
