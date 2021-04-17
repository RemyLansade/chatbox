import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
  apiKey: "AIzaSyDI4natY2c72GzCQeBBwqoTMynjskAXiPw",
  authDomain: "chatbox-fbef6.firebaseapp.com",
  databaseURL: "https://chatbox-fbef6-default-rtdb.europe-west1.firebasedatabase.app",
});

const database = firebase.database();

export default database
