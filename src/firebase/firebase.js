import firebase from "firebase";
// const firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = require("./firebaseConfig.json");

const app = firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
});
console.log("app:", app);
app.firestore();

export default app;
