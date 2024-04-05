
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMV4OR9FpIrO3CCqO2UagNmFoW1q8vDJA",
  authDomain: "aureom-905df.firebaseapp.com",
  projectId: "aureom-905df",
  storageBucket: "aureom-905df.appspot.com",
  messagingSenderId: "483958931954",
  appId: "1:483958931954:web:9621b5e6b69fefb8082b6b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)