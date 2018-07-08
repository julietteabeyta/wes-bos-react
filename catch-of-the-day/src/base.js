 import Rebase from 're-base';
 import firebase from 'firebase';

 const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyCs8f0IZ2-knY28tHGUn8plM2qRGogkvxQ",
     authDomain: "catch-of-the-day-juliette.firebaseapp.com",
     databaseURL: "https://catch-of-the-day-juliette.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//this is a named export 
export { firebaseApp };

export default base;