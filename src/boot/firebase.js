import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


var firebaseConfig = {
    apiKey: "AIzaSyDJNnoq_6qQS0wYJhD3mKCmkf1nT6N73wU",
    authDomain: "jeromotosfb.firebaseapp.com",
    databaseURL: "https://jeromotosfb.firebaseio.com",
    projectId: "jeromotosfb",
    storageBucket: "jeromotosfb.appspot.com",
    messagingSenderId: "384231850729",
    appId: "1:384231850729:web:326bd37da3b9b17299e678"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()

export { firebaseAuth, firebaseDB }