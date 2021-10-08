import firebase from 'firebase';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAYuAYEeGVMW4ZboZu-1sMOZ2whC6br3nI",
    authDomain: "chatbox-37bf8.firebaseapp.com",
    projectId: "chatbox-37bf8",
    storageBucket: "chatbox-37bf8.appspot.com",
    messagingSenderId: "350713172616",
    appId: "1:350713172616:web:e76cd8cf3678affef8c53d",
    measurementId: "G-T1QE7D0B3E",
    databaseURL: "https://chatbox-37bf8-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = firebase.auth;
export const db = firebase.database();
export default firebase;

