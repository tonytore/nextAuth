
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyALYP_ABhkBpzeXwFSFiqxYPGrcF9Dehp4",
  authDomain: "fir-frontend-ff2ef.firebaseapp.com",
  projectId: "fir-frontend-ff2ef",
  storageBucket: "fir-frontend-ff2ef.appspot.com",
  messagingSenderId: "19922429626",
  appId: "1:19922429626:web:cd18129b56aef6536ac483"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)