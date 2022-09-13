import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD4Q1rhyeDqnpTyvS5lPEbvK3NZwVaFKHs",
    authDomain: "my-movie-548bd.firebaseapp.com",
    projectId: "my-movie-548bd",
    storageBucket: "my-movie-548bd.appspot.com",
    messagingSenderId: "467716267633",
    appId: "1:467716267633:web:057ea0c25b2ede620785d0",
    measurementId: "G-GC7B69EV1L"
  };


  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();

  export {storage, firebase as default}