import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "",
  authDomain: "test-39fd6.firebaseapp.com",
  projectId: "test-39fd6",
  storageBucket: "test-39fd6.appspot.com",
  messagingSenderId: "1003138316321",
  appId: "",
};
firebase.initializeApp(config);

export default firebase.firestore();
