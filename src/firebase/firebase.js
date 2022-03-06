// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const config = {
  projectId: "firebasics-e7d3a",
  appId: "1:983208135226:web:9e59873cfc45c32efcc303",
  databaseURL:
    "https://firebasics-e7d3a-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "firebasics-e7d3a.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyAB19FtEULOww4E88STQDNkoVnp67tEMIU",
  authDomain: "firebasics-e7d3a.firebaseapp.com",
  messagingSenderId: "983208135226",
  measurementId: "G-TS9JD6J9X9",
};

const firebaseApp = initializeApp(config);

export const storage = getStorage(firebaseApp);

export const firestore = getFirestore();

export default firebaseApp;
