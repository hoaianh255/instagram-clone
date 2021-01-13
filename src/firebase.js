import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC0Zf4CVwbZX6GVeI3hdZQIG13vT1MZkl0",
  authDomain: "instagram-clone-8c66d.firebaseapp.com",
  databaseURL: "https://instagram-clone-8c66d-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-8c66d",
  storageBucket: "instagram-clone-8c66d.appspot.com",
  messagingSenderId: "640805111022",
})

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};