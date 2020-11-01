import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpuKa9DVhbt5Eu-CUxvJQ0yj5ZArp_S7k",
  authDomain: "shopify-3ca02.firebaseapp.com",
  databaseURL: "https://shopify-3ca02.firebaseio.com",
  projectId: "shopify-3ca02",
  storageBucket: "shopify-3ca02.appspot.com",
  messagingSenderId: "1025348494429",
  appId: "1:1025348494429:web:f2fd21db6d2776496a99b4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();