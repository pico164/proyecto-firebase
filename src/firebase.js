import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5n7Pqio59MYaeP0hOnpiXvuv7LTYYd4M",
  authDomain: "crud-d7134.firebaseapp.com",
  projectId: "crud-d7134",
  storageBucket: "crud-d7134.appspot.com",
  messagingSenderId: "382427458885",
  appId: "1:382427458885:web:ae8728c516eb069f71622c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}