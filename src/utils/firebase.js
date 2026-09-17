import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  db,
  googleProvider
};
